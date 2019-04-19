from .interface import AlgorithmInterface


class AlgorithmHaps(AlgorithmInterface):
    """
    Computes Harmless Acute Pacreatitis Score (HAPS).

    Range(HAPS) = [0,3]. HAPS >= 1 increases risk of AP

    Args:
      sex: M/F
      hematocrit: hematocrit, vol. % of rbc in blood
      creatinine: in mg/dL
      peritonitis: rebound tenderness or guarding from abdominal inflammation

    Returns:
      haps_score: HAPS score if conditions met, else None
    """
    name = 'HAPS'
    required_fields = ['sex', 'hematocrit', 'creatinine', 'peritonitis']
    score_range = { 'min': 0, 'max': 3, 'threshold': 1 }

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        haps_score = 0
        crit_limit_m = 43
        crit_limit_f = 39.6
        creatinine_limit = 2
        if _["creatinine"] >= creatinine_limit: haps_score += 1
        if _["sex"].lower()[0] == "m" and _["hematocrit"] > crit_limit_m: haps_score += 1
        if _["sex"].lower()[0] == "f" and _["hematocrit"] > crit_limit_f: haps_score += 1
        if _["peritonitis"]: haps_score += 1

        return haps_score
