from .interface import AlgorithmInterface


class AlgorithmJss(AlgorithmInterface):
    """
    Computes Japanese Severity Score (JSS) of Acute Pancreatitis.

    Range(JSS) = [0,9]. Severe disease if >= 3.

    Args:
      age: int
      calcium: serum calcium in mmol/L (converted to mg/dL) **
      bun: blood urea nitrogen, mg/dL
      creatinine: serum creatinine, mg/dL
      base_excess: excess of amount of base in blood, mEq/L
      bp_systolic: systolic blood pressure, in mmHg
      crp: C-Reactive protein, blood test for inflammation, mg/dL
      paO2: Arterial oxygen partial pressure in mmHg
      ldh: lactate dehydrogenase, blood test for tissue damage
      platelet_count: in 10^3 units per mm^3
      sirs_score: scoring metric from SIRS test
      oliguria: production of abnormally small amounts of urine, T/F
      resp_failure: respiratory failure, e.g. on respirator, T/F
      
    Returns:
      jss_score: JSS score if conditions met, else None
    """
    name = 'JSS'
    required_fields = ['age', 'calcium', 'crp', 'ldh', 'platelet_count', 'sirs_score', 'paO2']
    semi_req_fields = [['base_excess', 'bun'], ['base_excess', 'creatinine'], 
                       ['bp_systolic', 'creatinine'], ['bp_systolic', 'bun']]
    optional_fields = ['oliguria', 'resp_failure']
    score_range = { 'min': 0, 'max': 9, 'threshold': 2 }

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        age_limit = 70
        calcium_limit = 7.5
        crp_limit = 15
        ldh_limit = 380 # 2 times upper limit of normal 190 U/L
        platelet_limit = 100
        sirs_limit = 3
        bun_limit = 40
        creatinine_limit = 2
        excess_limit = -3
        bp_limit = 80
        paO2_limit = 60

        # 40.078 mg/mmol of Ca. divided by 10 to convert L to dL
        calcium_mgdl = _['calcium'] * 4.0078

        jss_score = 0
        # Compute stand alone risk factors
        if _["age"] >= age_limit: jss_score += 1
        if calcium_mgdl <= calcium_limit: jss_score += 1
        if _["crp"] >= crp_limit: jss_score += 1
        if _["ldh"] >= ldh_limit: jss_score += 1
        if _["platelet_count"] <= platelet_limit: jss_score += 1
        if _["sirs_score"] >= sirs_limit: jss_score += 1

        # Compute BUN / Creatinine / Oliguria risk factor
        bun = _.get('bun')
        creatinine = _.get('creatinine')
        oliguria = _.get('oliguria')
        if all([bun, creatinine, oliguria]): 
            if (bun >= bun_limit or creatinine >= creatinine_limit or oliguria): 
                jss_score += 1
        elif bun:
            if bun >= bun_limit: jss_score += 1
        elif creatinine:
            if creatinine >= creatinine_limit: jss_score += 1
        elif oliguria:
            if oliguria: jss_score += 1
        else:
            return None

        # Compute Base Excess or Shock risk factor
        base_excess = _.get('base_excess')
        bp_systolic = _.get('bp_systolic')
        if base_excess and bp_systolic:
            if base_excess <= excess_limit or bp_systolic < bp_limit: 
                jss_score += 1
        elif base_excess:
            if base_excess <= excess_limit: jss_score += 1
        elif bp_systolic:
            if bp_systolic < bp_limit: jss_score += 1
        else:
            return None

        # Compute PaO2 ABG or respiratory failure risk factor
        paO2 = _.get('paO2')
        resp_failure = _.get('resp_failure')
        if paO2 and resp_failure:
            if paO2 <= paO2_limit or resp_failure: jss_score += 1
        elif paO2:
            if paO2 <= paO2_limit: jss_score += 1
        elif resp_failure:
            if resp_failure: jss_score += 1
        else:
            jss_score = None

        return jss_score
