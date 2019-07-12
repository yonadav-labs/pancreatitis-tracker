from .interface import AlgorithmInterface


class AlgorithmMarshall(AlgorithmInterface):
    """
    Computes the Modified Marshall Scoring System for Organ Dysfunction.

    Range(Marshall Score) = [0, 12]. Organ Failure at 2.

    Args:
      bp_systolic: systolic blood pressure in mmHg
      creatinine: serum creatinine in mg/dL
      paO2: Arterial oxygen partial pressure in mmHg
      fiO2: Fraction of inspired oxygen [0,1]
      ph: arterial pH

    Returns:
      marshall_score: Modified Marshall Score if conditions met, else None
    """
    # Bhandari, Vimal, et al. Gut and liver 7.6 (2013): 731.

    name = 'Marshall'
    required_fields = ['bp_systolic', 'creatinine', 'paO2', 'fiO2', 'ph']
    optional_fields = ['fluid_responsive']
    score_range = { 'min': 0, 'max': 12, 'threshold': 2 }

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        # Keys are lower bounds for each tier, value is assigned variable points
        resp_tiers = {401: 0, 301: 1, 201: 2, 101: 3, -1: 4}
        creatinine_tiers = {4.91: 4, 3.6: 3, 1.9: 2, 1.4: 1, -1: 0}
        bp_limit = 90
        ph_lim1 = 7.3
        ph_lim2 = 7.2

        marshall_score = 0
        paO2_fiO2 = _["paO2"] / _["fiO2"]
        resp_pts = self.calculate_subscore(paO2_fiO2, resp_tiers)
        creatinine_pts = self.calculate_subscore(_["creatinine"], creatinine_tiers)
        marshall_score += resp_pts
        marshall_score += creatinine_pts
        if _["bp_systolic"] < bp_limit: marshall_score += 1
        if _["ph"] < ph_lim1: marshall_score += 1
        if _["ph"] < ph_lim2: marshall_score += 1

        if _.get("fluid_responsive") == False:
            marshall_score += 1

        return marshall_score
