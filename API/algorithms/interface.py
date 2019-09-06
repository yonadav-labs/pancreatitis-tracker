import collections
from abc import ABCMeta, abstractmethod


class AlgorithmInterface:
    """
    Clinical scoring systems to predict organ failure in AP patients. 

    This module includes scoring metric equations as well as helper 
    functions for estimating lab tests, converting units, etc. 
    """
    __metaclass__ = ABCMeta

    name = ''
    required_fields = []
    optional_fields = []
    semi_req_fields = []
    score_range = {}

    @classmethod
    def __init__(self, request):
        self.request = request

    @classmethod
    def can_process(self):
        if not all([self.request.get(ii) not in [None, ''] for ii in self.required_fields]):
            return False
        semi_req = [all(self.request.get(jj) not in [None, ''] for jj in ii) for ii in self.semi_req_fields]
        return not self.semi_req_fields or any(semi_req)

    @classmethod
    def __repr__(self):
        return 'Required parameters: ({})\nEither/Or parameters: ({})\nOptional parameters: ({})'.format(
            ', '.join(self.required_fields),
            ', '.join(self.semi_req_fields),
            ', '.join(self.optional_fields))

    @classmethod
    def params(self):
        return { "required": self.required_fields,
                 "either/or": self.semi_req_fields,
                 "optional": self.optional_fields}

    @abstractmethod
    def evaluate(self):
        pass

    @classmethod
    def calculate_subscore(self, variable, score_range):
        sr = collections.OrderedDict(sorted(score_range.items()))
        res = None
        for k, v in sr.items():
            if variable >= k:
                res = v
        return res

    @classmethod
    def enforce_lower_bound(self, variable, lower_bound):
        """
        If variable below lower bound, set to None

        Args:
          variable: variable in question, int or float
          lower_bound: int or float

        Returns:
          variable: returns same if above lower bound, else None.
        """
        if variable is not None:
            if variable < lower_bound: 
                variable = None
        return variable

    @classmethod
    def kg_to_lb(self, weight):
        LB_TO_KG = 0.453592
        if weight:
            val = weight / LB_TO_KG            
            return float("{0:.2f}".format(val))

    @classmethod
    def cm_to_inch(self, height):
        INCH_TO_METER = 2.54
        if height:
            val = height / INCH_TO_METER
            return float("{0:.2f}".format(val))

    @classmethod
    def imperial_to_metric(self, height, weight):
        """
        Convert imperial units to metric units for height and weight.

        Returns None if input is None. 

        Args:
          height: height in inches
          weight: weight in pounds

        Returns:
          height: height in meters, or None
          weight: weight in kg, or None
        """
        INCH_TO_METER = 0.0254
        LB_TO_KG = 0.453592
        if height is not None and weight is not None:
            return (height * INCH_TO_METER, weight * LB_TO_KG)
        elif height is not None:
            return (height * INCH_TO_METER, weight)
        elif weight is not None:
            return (height, weight * LB_TO_KG)
        else:
            return (height, weight)

    @classmethod
    def calculate_bmi(self):
        """
        Estimate body mass index from height and weight in metric.

        Args:
          height: height in meters, float
          weight: weight in kg, float
          bmi: body mass index, kg/m^2

        Returns:
          bmi: body mass index, kg/m^2
        """
        _ = self.request
        bmi = _.get('bmi')
        weight = _.get('weight')
        height = _.get('height')

        if not bmi:
            if height and weight:
                bmi = weight / height**2
        return bmi

    @classmethod
    def get_bicarbonate(self):
        _ = self.request
        bicarbonate = _.get('bicarbonate')
        hco3_arterial = _.get('hco3_arterial')
        hco3_serum = _.get('hco3_serum')

        if not bicarbonate:
            bicarbonate = hco3_arterial if hco3_arterial else hco3_serum
        return bicarbonate

    @classmethod
    def get_peritonitis(self):
        _ = self.request
        peritonitis = _.get('peritonitis')
        guarding = _.get('guarding')
        tenderness = _.get('tenderness')

        if not peritonitis:
            peritonitis = guarding or tenderness
        return peritonitis

    @classmethod
    def arterialbg_from_pulseox(self):
        """
        Imputes PaO2 (from ABG) from SpO2 (from pulse oximeter reading).

        Brown, Samuel M., et al. Critical care medicine 
        45.8 (2017): 1317-1324.

        Args:
          paO2: arterial oxygen partial pressure 
          spO2: SpO2 pulse oximetry measurement

        Returns:
          paO2: real part of nonlinear imputation of PaO2 from SpO2.

        NOTE: May choose not to approximate if PaO2 > 0.96 because
        approximation worsens at edges of sigmoid.
        """
        _ = self.request
        paO2 = _.get('paO2')
        spO2 = _.get('spO2')

        if not paO2:
            if spO2:
                c1, c2, denominator = 11700, 50, (1/float(spO2) - 1)
                term1 = (
                          (c1 / denominator) + 
                          (c2**3 + (c1 / denominator)**2)**0.5
                        )**(1/3)
                term2 = (
                          (c1 / denominator) - 
                          (c2**3 + (c1 / denominator)**2)**0.5
                        )**(1/3)
                paO2 = (term1 + term2).real
        return paO2

    @classmethod
    def fahrenheit_to_celsius(self, temperature):
        """
        Converts patient temperature from fahrenheit to celsius.

        Args:
          temperature: Temperature in Fahrenheit

        Returns:
          temperature: Temperature in Celsius
        """
        if temperature: 
            temperature = (temperature - 32) / 1.8
        return temperature

    @classmethod
    def glasgow_coma_scale(self):
        """
        Compute Glasgow Coma Scale based on eye, verbal, and motor response.

        Args:
          eye_score: int, 4= open spontaneously, 3=open to verbal command
            2=open in response to pain, 1=no response
          verbal_score: 5=talk-oriented, 4=confused speech oriented,
            3=inappropriate words, 2=incomprehensible sounds,
            1=no response
          motor_score: 6=obeys commands, 5=localizes pain,
            4=flexion-withdrawal, 3=abnormal flexion,
            2=extension, 1=no response

        Returns:
          glasgow_coma: int, used to assess comma status
        """
        _ = self.request
        eye_score = _.get('eye_score')
        verbal_score = _.get('verbal_score')
        motor_score = _.get('motor_score')
        
        glasgow_coma = None
        if all(v is not None for v in [eye_score, verbal_score, motor_score]):
            glasgow_coma = eye_score + verbal_score + motor_score
        return glasgow_coma

    @classmethod
    def maintenance_fluid(self):
        '''
        Computes daily maintenance fluid for patients

        Args:
          height: patient height in m
          weight: patient weight in kg
          sex: male or female
        Returns:
          adjusted_weight: adjusted body weight in kg
          maintenance_fluid: average daily maintenance fluid volume in mL
        '''
        height = self.request.get('height')
        weight = self.request.get('weight')
        sex = self.request.get('sex')

        HEIGHT_THRES = 1.524 #in meters, equiv to 5ft
        M_TO_IN = 39.3701 # 1 meter = 39.37 in

        maintenance_fluid = None
        adjusted_weight = None
        if all(v not in [None, ''] for v in [height, weight, sex]):

            # Constants different depending on sex
            if sex.lower()[0] == "m": 
                ideal_weight = 50
            else: #female
                ideal_weight = 45.5

            # Devine formula for ideal body weight
            if height > HEIGHT_THRES:
                ideal_weight = ideal_weight + (2.3 * ((height * M_TO_IN) - 60))

            # Adjust body weight for obese patients
            # Traynor AM. Antimicrob Agents and Chemother. 1995.
            # Hicks C. Ann Hematol. 2012. 
            adjusted_weight = weight
            if weight > 1.25 * ideal_weight: 
                adjusted_weight = ideal_weight + 0.4 * (weight - ideal_weight)

            maintenance_fluid = int(35 * adjusted_weight)
            
        return maintenance_fluid
