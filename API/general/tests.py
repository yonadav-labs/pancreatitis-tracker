from django.test import TestCase

from algorithms import *
from algorithms.interface import AlgorithmInterface

"""
This script tests the acute pancreatitis severity calculator.

Test functions are written for the clinical scoring module, the severity
calculator rules module, and the fluid volume calculator module.

Developed by Ariel Precision Medicine. 
"""

class TestClinicalScoringSystems(TestCase):

    def setUp(self):
        self.request = {
            "age": 55,
            "sex": "Male",
            "height": 1.8,                    # m
            "weight": 90,                     # kg
            "bmi": 27.78,                     # m/kg^2
            "temperature": 37,                # C
            "heart_rate": 65,                 # bpm
            "resp_rate": 20,                  # bpm
            "bp_systolic": 120,               # mmHg
            "bp_diastolic": 80,               # mmHg
            "wbc": 17,                        # 10^3/mm^3
            "bun": 15,                        # mg/dL,
            "albumin": 31,                    # g/L,
            "ldh": 650,                       # units/L ,
            "ast": 150,                       # units/L,
            "crp": 13,                        # mg/dL,
            "base_excess": 3,                 # mEq/L,
            "platelet_count": 90,             # 10^3 units/mm^3,
            "hematocrit": 48,                 # percent,
            "arterial_pressure": 110,         # mmHG,
            "paO2": 75,                       # mmHg,
            "paCO2": 40,                      # mmHg,
            "spO2": None,
            "fiO2": 0.21,                     # fraction, [0,1],
            "ph": 7.4,                        # unitless,
            "sodium": 140,                    # mmol/L,
            "potassium": 4,                   # mmol/L,
            "calcium": 1.5,                   # mmol/L,
            "bicarbonate": 32,                # mmol/L,
            "creatinine": 1,                  # mg/dL,
            "glucose": 9 / 0.05549943,        # mg/dL,
            "pleural_eff": True,              # T/F,
            "peritonitis": True,
            "eye_score": 2,                   # unitless,
            "verbal_score": 1,                # unitless,
            "motor_score": 2,                 # unitless,
            "glasgow_coma": 13,               # unitless,
            "impaired_state": True,
            "chronic_health": "elective",     # 3 categories,
            "sirs_score": 1,
            "oliguria": False,
            "resp_failure": False,
            "urine_out": 1                    # ml/kg/hr
        }

    def test_calculate_subscore(self):
        age_tiers = {75:6, 65:5, 55:3, 45:2, -1:0}
        temp_tiers = {41:4, 39:3, 38.5:1, 36:0, 34:1, 32:2, 30:3, -1:4}
        map_tiers = {160:4, 130:3, 110:2, 70:0, 50:2, -1:4}
        hr_tiers = {180:4, 140:3, 110:2, 70:0, 55:2, 40:3, -1:4}
        rr_tiers = {50:4, 35:3, 25:1, 12:0, 10:1, 6:2, -1:4}
        paO2_tiers = {70.01:0, 61:1, 55:3, -1:4}
        ph_tiers = {7.7:4, 7.6:3, 7.5:1, 7.33:0, 7.25:2, 7.15:3, -1:4}
        sodium_tiers = {180:4, 160:3, 155:2, 150:1, 130:0, 120:2, 111:3,-1:4}
        potassium_tiers = {7:4, 6:3, 5.5:1, 3.5:0, 3:1, 2.5:2, -1:4}
        creatinine_tiers = {3.5:4, 2:3, 1.5:2, 0.6:0, -1:2}
        hematocrit_tiers = {60:4, 50:2, 46:1, 30:0, 20:2, -1:4}
        wbc_tiers = {40:4, 20:2, 15:1, 3:0, 1:2, -1:4}
        bicarbonate_tiers = {52:4, 41:3, 32:1, 22:0, 18:2, 15:3, -1:4}

        si = AlgorithmInterface(self.request)
        self.assertEqual(si.calculate_subscore(44, age_tiers), 0)
        self.assertEqual(si.calculate_subscore(45, age_tiers), 2)
        self.assertEqual(si.calculate_subscore(55, age_tiers), 3)
        self.assertEqual(si.calculate_subscore(64.9, age_tiers), 3)
        self.assertEqual(si.calculate_subscore(65, age_tiers), 5)
        self.assertEqual(si.calculate_subscore(75, age_tiers), 6)

        self.assertEqual(si.calculate_subscore(29, temp_tiers), 4)
        self.assertEqual(si.calculate_subscore(31, temp_tiers), 3)
        self.assertEqual(si.calculate_subscore(32, temp_tiers), 2)
        self.assertEqual(si.calculate_subscore(34, temp_tiers), 1)
        self.assertEqual(si.calculate_subscore(36, temp_tiers), 0)
        self.assertEqual(si.calculate_subscore(38.7, temp_tiers), 1)
        self.assertEqual(si.calculate_subscore(39, temp_tiers), 3)
        self.assertEqual(si.calculate_subscore(41, temp_tiers), 4)

        self.assertEqual(si.calculate_subscore(49, map_tiers), 4)
        self.assertEqual(si.calculate_subscore(50, map_tiers), 2)
        self.assertEqual(si.calculate_subscore(70, map_tiers), 0)
        self.assertEqual(si.calculate_subscore(110, map_tiers), 2)
        self.assertEqual(si.calculate_subscore(130, map_tiers), 3)
        self.assertEqual(si.calculate_subscore(160, map_tiers), 4)

        self.assertEqual(si.calculate_subscore(39, hr_tiers), 4)
        self.assertEqual(si.calculate_subscore(40, hr_tiers), 3)
        self.assertEqual(si.calculate_subscore(55, hr_tiers), 2)
        self.assertEqual(si.calculate_subscore(70, hr_tiers), 0)
        self.assertEqual(si.calculate_subscore(110, hr_tiers), 2)
        self.assertEqual(si.calculate_subscore(140, hr_tiers), 3)
        self.assertEqual(si.calculate_subscore(180, hr_tiers), 4)

        self.assertEqual(si.calculate_subscore(5, rr_tiers), 4)
        self.assertEqual(si.calculate_subscore(6, rr_tiers), 2)
        self.assertEqual(si.calculate_subscore(10, rr_tiers), 1)
        self.assertEqual(si.calculate_subscore(12, rr_tiers), 0)
        self.assertEqual(si.calculate_subscore(25, rr_tiers), 1)
        self.assertEqual(si.calculate_subscore(35, rr_tiers), 3)
        self.assertEqual(si.calculate_subscore(50, rr_tiers), 4)
        self.assertEqual(si.calculate_subscore(54, paO2_tiers), 4)
        self.assertEqual(si.calculate_subscore(55, paO2_tiers), 3)
        self.assertEqual(si.calculate_subscore(61, paO2_tiers), 1)
        self.assertEqual(si.calculate_subscore(71, paO2_tiers), 0)

        self.assertEqual(si.calculate_subscore(7.1, ph_tiers), 4)
        self.assertEqual(si.calculate_subscore(7.15, ph_tiers), 3)
        self.assertEqual(si.calculate_subscore(7.25, ph_tiers), 2)
        self.assertEqual(si.calculate_subscore(7.33, ph_tiers), 0)
        self.assertEqual(si.calculate_subscore(7.5, ph_tiers), 1)
        self.assertEqual(si.calculate_subscore(7.6, ph_tiers), 3)
        self.assertEqual(si.calculate_subscore(7.7, ph_tiers), 4)

        self.assertEqual(si.calculate_subscore(110, sodium_tiers), 4)
        self.assertEqual(si.calculate_subscore(111, sodium_tiers), 3)
        self.assertEqual(si.calculate_subscore(120, sodium_tiers), 2)
        self.assertEqual(si.calculate_subscore(130, sodium_tiers), 0)
        self.assertEqual(si.calculate_subscore(150, sodium_tiers), 1)
        self.assertEqual(si.calculate_subscore(155, sodium_tiers), 2)
        self.assertEqual(si.calculate_subscore(160, sodium_tiers), 3)
        self.assertEqual(si.calculate_subscore(180, sodium_tiers), 4)

        self.assertEqual(si.calculate_subscore(2.4, potassium_tiers), 4)
        self.assertEqual(si.calculate_subscore(2.5, potassium_tiers), 2)
        self.assertEqual(si.calculate_subscore(3, potassium_tiers), 1)
        self.assertEqual(si.calculate_subscore(3.5, potassium_tiers), 0)
        self.assertEqual(si.calculate_subscore(5.5, potassium_tiers), 1)
        self.assertEqual(si.calculate_subscore(6, potassium_tiers), 3)
        self.assertEqual(si.calculate_subscore(7, potassium_tiers), 4)

        self.assertEqual(si.calculate_subscore(0.5, creatinine_tiers), 2)
        self.assertEqual(si.calculate_subscore(0.6, creatinine_tiers), 0)
        self.assertEqual(si.calculate_subscore(1.5, creatinine_tiers), 2)
        self.assertEqual(si.calculate_subscore(2, creatinine_tiers), 3)
        self.assertEqual(si.calculate_subscore(3.5, creatinine_tiers), 4)

        self.assertEqual(si.calculate_subscore(19, hematocrit_tiers), 4)
        self.assertEqual(si.calculate_subscore(20, hematocrit_tiers), 2)
        self.assertEqual(si.calculate_subscore(30, hematocrit_tiers), 0)
        self.assertEqual(si.calculate_subscore(46, hematocrit_tiers), 1)
        self.assertEqual(si.calculate_subscore(50, hematocrit_tiers), 2)
        self.assertEqual(si.calculate_subscore(60, hematocrit_tiers), 4)

        self.assertEqual(si.calculate_subscore(0.9, wbc_tiers), 4)
        self.assertEqual(si.calculate_subscore(1, wbc_tiers), 2)
        self.assertEqual(si.calculate_subscore(3, wbc_tiers), 0)
        self.assertEqual(si.calculate_subscore(15, wbc_tiers), 1)
        self.assertEqual(si.calculate_subscore(20, wbc_tiers), 2)
        self.assertEqual(si.calculate_subscore(40, wbc_tiers), 4)

        self.assertEqual(si.calculate_subscore(14, bicarbonate_tiers), 4)
        self.assertEqual(si.calculate_subscore(15, bicarbonate_tiers), 3)
        self.assertEqual(si.calculate_subscore(18, bicarbonate_tiers), 2)
        self.assertEqual(si.calculate_subscore(22, bicarbonate_tiers), 0)
        self.assertEqual(si.calculate_subscore(32, bicarbonate_tiers), 1)
        self.assertEqual(si.calculate_subscore(41, bicarbonate_tiers), 3)
        self.assertEqual(si.calculate_subscore(52, bicarbonate_tiers), 4)

    def test_lower_bound(self):
        si = AlgorithmInterface(self.request)
        var = si.enforce_lower_bound(5, 3)
        self.assertEqual(var,5)
        var = si.enforce_lower_bound(5, 10)
        self.assertIsNone(var)
        var = si.enforce_lower_bound(6, 6)
        self.assertEqual(var,6)
        var = si.enforce_lower_bound(7, 7.0)
        self.assertEqual(var,7)
        var = si.enforce_lower_bound(8.0, 8)
        self.assertEqual(var,8)
        var = si.enforce_lower_bound(None, 1)
        self.assertIsNone(var)

    def test_imperial_to_metric(self):
        """
        Grabbed imperial to metric conversions from google as a check.

        Tested on ints, and with None values.
        """
        si = AlgorithmInterface(self.request)
        height_in = 70.0
        weight_lb = 200.0
        height_m, weight_kg = si.imperial_to_metric(height_in, weight_lb)
        self.assertAlmostEqual(height_m, 1.778, places=2)
        self.assertAlmostEqual(weight_kg, 90.7185, places=2)
        height_in = int(70)
        weight_lb = None
        height_m, weight_kg = si.imperial_to_metric(height_in, weight_lb)
        self.assertAlmostEqual(height_m, 1.778, places=2)
        self.assertIsNone(weight_kg)
        height_in = None
        weight_lb = int(200)
        height_m, weight_kg = si.imperial_to_metric(height_in, weight_lb)
        self.assertIsNone(height_m)
        self.assertAlmostEqual(weight_kg, 90.7185, places=2)

    def test_bmi(self):
        self.request.update({ 'height': 1.8, 'weight': 90 })
        si = AlgorithmInterface(self.request)
        bmi = si.calculate_bmi()
        self.assertAlmostEqual(bmi, 27.78, places=2)
        
        bmi_reported = 25
        self.request.update({ 'bmi': bmi_reported })
        si = AlgorithmInterface(self.request)
        bmi = si.calculate_bmi()
        self.assertAlmostEqual(bmi, bmi_reported, places=2)

        self.request.update({ 'height': 1.8, 'weight': None, 'bmi': None })
        si = AlgorithmInterface(self.request)
        bmi = si.calculate_bmi()
        self.assertIsNone(bmi)

        self.request.update({ 'height': None, 'weight': 90, 'bmi': None })
        si = AlgorithmInterface(self.request)
        bmi = si.calculate_bmi()
        self.assertIsNone(bmi)

    def test_arterialbg_est(self):
        self.request.update({ 'spO2': 0.2, 'paO2': None })
        si = AlgorithmInterface(self.request)
        paO2_est = si.arterialbg_from_pulseox()
        self.assertIsNotNone(paO2_est)
        self.assertAlmostEqual(paO2_est, 19.4, places=1)

        self.request.update({ 'spO2': 0.4, 'paO2': None })
        si = AlgorithmInterface(self.request)
        paO2_est = si.arterialbg_from_pulseox()
        self.assertIsNotNone(paO2_est)
        self.assertAlmostEqual(paO2_est, 26, places=1)

        self.request.update({ 'spO2': 0.6, 'paO2': None })
        si = AlgorithmInterface(self.request)
        paO2_est = si.arterialbg_from_pulseox()
        self.assertIsNotNone(paO2_est)
        self.assertAlmostEqual(paO2_est, 33.5, places=1)

        self.request.update({ 'spO2': 0.8, 'paO2': None })
        si = AlgorithmInterface(self.request)
        paO2_est = si.arterialbg_from_pulseox()
        self.assertIsNotNone(paO2_est)
        self.assertAlmostEqual(paO2_est, 46, places=1)

        self.request.update({ 'spO2': 0.99, 'paO2': None })
        si = AlgorithmInterface(self.request)
        paO2_est = si.arterialbg_from_pulseox()
        self.assertIsNotNone(paO2_est)
        self.assertAlmostEqual(paO2_est, 132.5, places=1)

        paO2 = 130
        self.request.update({ 'spO2': 0.99, 'paO2': paO2 })
        si = AlgorithmInterface(self.request)
        paO2_est = si.arterialbg_from_pulseox()
        self.assertIsNotNone(paO2_est)
        self.assertEqual(paO2_est, paO2)

        self.request.update({ 'spO2': None, 'paO2': None })
        si = AlgorithmInterface(self.request)
        paO2_est = si.arterialbg_from_pulseox()
        self.assertIsNone(paO2_est)

    def test_fahrenheit_to_celsius(self):
        si = AlgorithmInterface(self.request)
        temp_f = 212
        temp = si.fahrenheit_to_celsius(temp_f)
        self.assertAlmostEqual(temp, 100, places=2)
        temp = si.fahrenheit_to_celsius(None)
        self.assertIsNone(temp)

    def test_calculate_map(self):
        request = dict(self.request)
        request['arterial_pressure'] = None
        si = map.AlgorithmMap(request)
        arterial_pressure = si.evaluate()
        self.assertAlmostEqual(arterial_pressure, 93.33, places=1)  

        si = map.AlgorithmMap(self.request)
        arterial_pressure = si.evaluate()
        self.assertEqual(arterial_pressure, self.request['arterial_pressure'])
        self.assertEqual(arterial_pressure, 110)

        request = dict(self.request)
        request['bp_systolic'] = None
        request['arterial_pressure'] = None
        si = map.AlgorithmMap(request)
        arterial_pressure = si.evaluate()
        self.assertIsNone(arterial_pressure)

        request = dict(self.request)
        request['bp_diastolic'] = None
        request['arterial_pressure'] = None
        si = map.AlgorithmMap(request)
        arterial_pressure = si.evaluate()
        self.assertIsNone(arterial_pressure)

    def test_calculate_early_warning(self):
        si = early_warning.AlgorithmEarlyWarning(self.request)
        temp_tiers = {38.6:2, 38.1:1, 36.1:0, 35.1:1, -1:2}
        hr_tiers = {129.1:3, 111:2, 101:1, 51:0, 41:1, -1:2}
        rr_tiers = {29.1:3, 21:2, 15:1, 9:0, -1:2}
        bp_tiers = {200:2, 101:0, 81:1, 71:2, -1:3}
        neuro_tiers = {4:3, 3:2, 2:1, 1:0} #alert=0,voice=1,pain=2,unresponsive=3
        urine_tiers = {0.5:0, 0.01:2, -1:3}
        self.assertEqual(si.calculate_subscore(38.6, temp_tiers), 2)
        self.assertEqual(si.calculate_subscore(38.1, temp_tiers), 1)
        self.assertEqual(si.calculate_subscore(36.1, temp_tiers), 0)
        self.assertEqual(si.calculate_subscore(35.1, temp_tiers), 1)
        self.assertEqual(si.calculate_subscore(20, temp_tiers), 2)
        self.assertEqual(si.calculate_subscore(130, hr_tiers), 3)
        self.assertEqual(si.calculate_subscore(111, hr_tiers), 2)
        self.assertEqual(si.calculate_subscore(101, hr_tiers), 1)
        self.assertEqual(si.calculate_subscore(51, hr_tiers), 0)
        self.assertEqual(si.calculate_subscore(41, hr_tiers), 1)
        self.assertEqual(si.calculate_subscore(40, hr_tiers), 2)
        self.assertEqual(si.calculate_subscore(30, rr_tiers), 3)
        self.assertEqual(si.calculate_subscore(21, rr_tiers), 2)
        self.assertEqual(si.calculate_subscore(15, rr_tiers), 1)
        self.assertEqual(si.calculate_subscore(9, rr_tiers), 0)
        self.assertEqual(si.calculate_subscore(7, rr_tiers), 2)
        self.assertEqual(si.calculate_subscore(200, bp_tiers), 2)
        self.assertEqual(si.calculate_subscore(101, bp_tiers), 0)
        self.assertEqual(si.calculate_subscore(81, bp_tiers), 1)
        self.assertEqual(si.calculate_subscore(71, bp_tiers), 2)
        self.assertEqual(si.calculate_subscore(70, bp_tiers), 3)
        self.assertEqual(si.calculate_subscore(4, neuro_tiers), 3) # unresponsi ve
        self.assertEqual(si.calculate_subscore(3, neuro_tiers), 2) # react to  pa in
        self.assertEqual(si.calculate_subscore(2, neuro_tiers), 1) # react to  voi ce
        self.assertEqual(si.calculate_subscore(1, neuro_tiers), 0) #  ale rt
        self.assertEqual(si.calculate_subscore(0.5, urine_tiers), 0)
        self.assertEqual(si.calculate_subscore(0.4, urine_tiers), 2)
        self.assertEqual(si.calculate_subscore(0, urine_tiers), 3)

        request = {'temperature': 38.3, 'heart_rate': 102, 'resp_rate': 10, 
                   'bp_systolic': 72, 'eye_score': 2, 'urine_out': 0.6}
        si = early_warning.AlgorithmEarlyWarning(request)
        mews_score = si.evaluate()
        self.assertIsNotNone(mews_score)
        self.assertTrue(si.can_process())
        self.assertEqual(mews_score, 5)

        request = {}
        si = early_warning.AlgorithmEarlyWarning(request)
        mews_score = si.evaluate()
        self.assertIsNone(mews_score)
        self.assertFalse(si.can_process())
        
    def test_calculate_marshall(self):
        si = marshall.AlgorithmMarshall(self.request)
        # bp = 120, creat = 1, paO2 = 75, fiO2 = .21, pa/fi = 357, ph = 7.4
        resp_tiers = {401:0, 301:1, 201:2, 101:3, -1:4}
        creatinine_tiers = {4.91:4, 3.6:3, 1.9:2, 1.4:1, -1:0}
        self.assertEqual(si.calculate_subscore(500, resp_tiers), 0)
        self.assertEqual(si.calculate_subscore(350, resp_tiers), 1)
        self.assertEqual(si.calculate_subscore(250, resp_tiers), 2)
        self.assertEqual(si.calculate_subscore(150, resp_tiers), 3)
        self.assertEqual(si.calculate_subscore(50, resp_tiers), 4)
        self.assertEqual(si.calculate_subscore(5, creatinine_tiers), 4)
        self.assertEqual(si.calculate_subscore(4, creatinine_tiers), 3)
        self.assertEqual(si.calculate_subscore(2, creatinine_tiers), 2)
        self.assertEqual(si.calculate_subscore(1.5, creatinine_tiers), 1)
        self.assertEqual(si.calculate_subscore(0.5, creatinine_tiers), 0)

        request = dict(self.request)
        request['fluid_responsive'] = None
        si = marshall.AlgorithmMarshall(request)
        marshall_score = si.evaluate()
        self.assertIsNotNone(marshall_score)
        self.assertTrue(si.can_process())
        self.assertEqual(marshall_score, 1)

        request = {'bp_systolic': 80, 'creatinine': 5, 'paO2': 60, 'fiO2': 0.7, 
                   'ph': 7.15, 'fluid_responsive': False}
        si = marshall.AlgorithmMarshall(request)
        marshall_score = si.evaluate()
        self.assertIsNotNone(marshall_score)
        self.assertTrue(si.can_process())
        self.assertEqual(marshall_score, 12)

        si = marshall.AlgorithmMarshall({})
        marshall_score = si.evaluate()

        self.assertIsNone(marshall_score)
        self.assertFalse(si.can_process())

    def test_calculate_apache(self):
        request = dict(self.request)
        request['age'] = None
        request['potassium'] = None
        request['wbc'] = None
        si = apache.AlgorithmApache(request)
        apache_score = si.evaluate()
        self.assertIsNone(apache_score)
        self.assertFalse(si.can_process())

        request = dict(self.request)
        request['bicarbonate'] = None
        si = apache.AlgorithmApache(request)
        apache_score = si.evaluate()
        self.assertIsNotNone(apache_score)
        self.assertEqual(apache_score, 9)
        self.assertTrue(si.can_process())

        request = dict(self.request)
        request['paO2'] = None
        si = apache.AlgorithmApache(request)
        apache_score = si.evaluate()

        self.assertIsNotNone(apache_score)
        self.assertEqual(apache_score, 10)
        self.assertTrue(si.can_process())

        request = dict(self.request)
        request['ph'] = None
        si = apache.AlgorithmApache(request)
        apache_score = si.evaluate()

        self.assertIsNotNone(apache_score)
        self.assertEqual(apache_score, 10)

        request = {}
        si = apache.AlgorithmApache(request)
        apache_score = si.evaluate()
        
        self.assertIsNone(apache_score)
        self.assertFalse(si.can_process())

    def test_calculate_bisap(self):
        request = dict(self.request)
        si = bisap.AlgorithmBisap(request)
        bisap_score = si.evaluate()

        self.assertIsNotNone(bisap_score)
        self.assertEqual(bisap_score, 2)

        request = { 'age': 61, 'bun': self.request['bun'], 'pleural_eff': False, 
                    'sirs_score': self.request['sirs_score'], 
                    'impaired_state': False, 'glasgow_coma': 15}
        si = bisap.AlgorithmBisap(request)
        bisap_score = si.evaluate()

        self.assertIsNotNone(bisap_score)
        self.assertEqual(bisap_score, 1)

        request = dict(self.request)
        request['pleural_eff'] = None
        si = bisap.AlgorithmBisap(request)
        bisap_score = si.evaluate()

        self.assertIsNone(bisap_score)
        self.assertFalse(si.can_process())

        si = bisap.AlgorithmBisap({})
        bisap_score = si.evaluate()

        self.assertIsNone(bisap_score)
        self.assertFalse(si.can_process())

    def test_calculate_glasgow(self):
        request = dict(self.request)
        request['albumin'] = None
        si = glasgow.AlgorithmGlasgow(request)
        glasgow_score = si.evaluate()

        self.assertIsNone(glasgow_score)
        self.assertFalse(si.can_process())

        request = dict(self.request)
        si = glasgow.AlgorithmGlasgow(request)
        glasgow_score = si.evaluate()

        self.assertIsNotNone(glasgow_score)
        self.assertEqual(glasgow_score, 4)

        si = glasgow.AlgorithmGlasgow({})
        glasgow_score = si.evaluate()

        self.assertIsNone(glasgow_score)
        self.assertFalse(si.can_process())

    def test_calculate_haps(self):
        request = dict(self.request)
        request['peritonitis'] = None
        si = haps.AlgorithmHaps(request)
        haps_score = si.evaluate()

        self.assertIsNone(haps_score)
        self.assertFalse(si.can_process())

        request = dict(self.request)
        si = haps.AlgorithmHaps(request)
        haps_score = si.evaluate()

        self.assertIsNotNone(haps_score)
        self.assertEqual(haps_score, 2)
        
        si = haps.AlgorithmHaps({})
        glasgow_score = si.evaluate()

        self.assertIsNone(glasgow_score)
        self.assertFalse(si.can_process())

    def test_calculate_jss(self):
        request = dict(self.request)
        request['peritonitis'] = None
        si = jss.AlgorithmJss(request)
        jss_score = si.evaluate()

        self.assertIsNotNone(jss_score)
        
        si = jss.AlgorithmJss({})
        jss_score = si.evaluate()

        self.assertIsNone(jss_score)
        self.assertFalse(si.can_process())

    def test_calculate_panc3(self):
        si = panc3.AlgorithmPanc3(self.request)
        panc3_score = si.evaluate()
        self.assertIsNotNone(panc3_score)
        
        si = panc3.AlgorithmPanc3({})
        panc3_score = si.evaluate()

        self.assertIsNone(panc3_score)
        self.assertFalse(si.can_process())

    def test_calculate_pop(self):
        si = pop.AlgorithmPop(self.request)
        pop_score = si.evaluate()
        
        self.assertIsNotNone(pop_score)
        
        si = pop.AlgorithmPop({})
        pop_score = si.evaluate()

        self.assertIsNone(pop_score)
        self.assertFalse(si.can_process())

    def test_calculate_ranson(self):
        si = ranson.AlgorithmRanson(self.request)
        ranson_score = si.evaluate()

        self.assertIsNotNone(ranson_score)

        si = ranson.AlgorithmRanson({})
        ranson_score = si.evaluate()

        self.assertIsNone(ranson_score)
        self.assertFalse(si.can_process())
        
    def test_calculate_sirs(self):
        request = dict(self.request)
        request['paCO2'] = None
        si = sirs.AlgorithmSirs(request)
        sirs_score = si.evaluate()

        self.assertIsNotNone(sirs_score)

        si = sirs.AlgorithmSirs({})
        sirs_score = si.evaluate()
        self.assertIsNone(sirs_score)
        self.assertFalse(si.can_process())
