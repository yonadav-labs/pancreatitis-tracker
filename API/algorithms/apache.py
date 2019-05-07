from .interface import AlgorithmInterface


class AlgorithmApache(AlgorithmInterface):
    """
    Computes Acute Physiology and Chronic Heath Evaluation (APACHE) II.

    Range(APACHE-II) = [0,71]. Severe acute pancreatitis at APACHE II
    score of 8 or more.
    
    Args:
      age: age
      temperature: temperature, Celsius
      arterial_pressure: mean arterial blood pressure in mmHg
      heart_rate: heart rate in bpm
      resp_rate: respiratory rate in bpm
      ph: arterial pH
      bicarbonate: serum HCO3(-) in mmol/L
      sodium: serum sodium in mmol/L
      potassium: serum potassium in mmol/L
      creatinine: serum creatinine in mg/dL 
      hematocrit: hematocrit, vol. % of rbc in blood
      wbc: white blood cell count (10^3 / mm^3)
      glasgow_coma: Glasgow Coma Scale
      chronic_health: chronic health history
      paO2: Arterial oxygen partial pressure in mmHg
      paCO2: Arterial carbon dioxide partial pressure in mmHg
      fiO2: Fraction of inspired oxygen [0,1]

    Returns:
      apache_score: APACHE II score if conditions met, else None
    """
    name = 'APACHE II'
    required_fields = ['age', 'temperature', 'arterial_pressure', 'heart_rate', 
                       'resp_rate', 'sodium', 'potassium', 'creatinine', 'hematocrit', 
                       'wbc', 'glasgow_coma', 'chronic_health']
    semi_req_fields = [['ph', 'paO2', 'paCO2', 'fiO2'], ['bicarbonate']]
    score_range = { 'min': 0, 'max': 35, 'threshold': 7 }

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        # Keys are lower bounds for each tier, value is assigned variable points
        age_tiers = {75: 6, 65: 5, 55: 3, 45: 2, -1: 0}
        temp_tiers = {41: 4, 39: 3, 38.5: 1, 36: 0, 34: 1, 32: 2, 30: 3, -1: 4}
        map_tiers = {160: 4, 130: 3, 110: 2, 70: 0, 50: 2, -1: 4}
        hr_tiers = {180: 4, 140: 3, 110: 2, 70: 0, 55: 2, 40: 3, -1: 4}
        rr_tiers = {50: 4, 35: 3, 25: 1, 12: 0, 10: 1, 6: 2, -1: 4}
        paO2_tiers = {70.01: 0, 61: 1, 55: 3, -1: 4}
        aaO2_tiers = {500: 4, 350: 3, 200: 2, -1: 0}
        ph_tiers = {7.7: 4, 7.6: 3, 7.5: 1, 7.33: 0, 7.25: 2, 7.15: 3, -1: 4}
        sodium_tiers = {180: 4, 160: 3, 155: 2, 150: 1, 130: 0, 120: 2, 111: 3,-1: 4}
        potassium_tiers = {7: 4, 6: 3, 5.5: 1, 3.5: 0, 3: 1, 2.5: 2, -1: 4}
        creatinine_tiers = {3.5: 4, 2: 3, 1.5: 2, 0.6: 0, -1: 2}
        hematocrit_tiers = {60: 4, 50: 2, 46: 1, 30: 0, 20: 2, -1: 4}
        wbc_tiers = {40: 4, 20: 2, 15: 1, 3: 0, 1: 2, -1: 4}
        bicarbonate_tiers = {52: 4, 41: 3, 32: 1, 22: 0, 18: 2, 15: 3, -1: 4}
        
        age_pts = self.calculate_subscore(_["age"], age_tiers)
        temp_pts = self.calculate_subscore(_["temperature"], temp_tiers)
        map_pts = self.calculate_subscore(_["arterial_pressure"], map_tiers)
        hr_pts = self.calculate_subscore(_["heart_rate"], hr_tiers)
        rr_pts = self.calculate_subscore(_["resp_rate"], rr_tiers)
        sodium_pts = self.calculate_subscore(_["sodium"], sodium_tiers)
        potassium_pts = self.calculate_subscore(_["potassium"], potassium_tiers)
        creatinine_pts = self.calculate_subscore(_["creatinine"], creatinine_tiers)
        hematocrit_pts = self.calculate_subscore(_["hematocrit"], hematocrit_tiers)
        wbc_pts = self.calculate_subscore(_["wbc"], wbc_tiers)
        apache_score = 15 - _["glasgow_coma"]

        if _["chronic_health"] == "nonoperative":
            apache_score += 5 
        elif _["chronic_health"] == "emergency":
            apache_score += 5 
        elif _["chronic_health"] == "elective":
            apache_score += 2 

        if all(_.get(ii) for ii in ['ph', 'paO2', 'paCO2', 'fiO2']):
            pressure_atm = 760  # mmHG
            pressure_h2O = 47   # mmHg, in alveoli
            aaO2 = _["fiO2"] * (pressure_atm-pressure_h2O) - _["paCO2"]/0.8 - _["paO2"]

            aaO2_pts = self.calculate_subscore(aaO2, aaO2_tiers)
            paO2_pts = self.calculate_subscore(_["paO2"], paO2_tiers)
            ph_pts = self.calculate_subscore(_["ph"], ph_tiers)

            abg_pts = aaO2_pts if _["fiO2"] >= 0.5 else paO2_pts
            apache_score = sum([age_pts, temp_pts, map_pts, hr_pts, rr_pts, sodium_pts,
                                potassium_pts, creatinine_pts, hematocrit_pts, wbc_pts,
                                abg_pts, ph_pts])
        elif _.get("bicarbonate"):
            bicarb_pts = self.calculate_subscore(_["bicarbonate"], bicarbonate_tiers)
            apache_score = sum([age_pts, temp_pts, map_pts, hr_pts, rr_pts, sodium_pts,
                                potassium_pts, creatinine_pts, hematocrit_pts, wbc_pts,
                                bicarb_pts])
        else:
            apache_score = None

        return apache_score
