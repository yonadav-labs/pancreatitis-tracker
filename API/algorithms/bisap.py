from .interface import AlgorithmInterface


class AlgorithmBisap(AlgorithmInterface):
    """
    Computes Bedside Index of Severity in Acute Pancreatitis (BISAP).

    Range(BISAP) = [0,5]. BISAP >= 2 increases risk of SAP

    Args:
      age: int
      bun: blood urea nitrogen, mg/dL
      pleural_eff: True/False for pleural effusion status
      sirs_score: scoring metric from SIRS test
      impaired_state: impaired mental status (disorientation, lethargy,
                        somnolence, coma, stupor) T/F
      glasgow_coma: Glasgow coma scale

    Returns:
      bisap_score: BISAP score if conditions met, else None
    """
    name = 'BISAP'
    required_fields = ['age', 'bun', 'pleural_eff', 'sirs_score', 'glasgow_coma']
    score_range = { 'min': 0, 'max': 5, 'threshold': 2 }

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        bisap_score = 0
        bun_limit = 25
        gcs_limit = 15
        sirs_limit = 2
        age_limit = 60

        if _["age"] > age_limit: bisap_score += 1
        if _["bun"] > bun_limit: bisap_score += 1
        if _["pleural_eff"] is True: bisap_score += 1
        if _["sirs_score"] > sirs_limit: bisap_score += 1

        impaired_state = _.get("impaired_state")
        glasgow_coma = _.get("glasgow_coma")
        if impaired_state and glasgow_coma:
            if glasgow_coma < gcs_limit or impaired_state: 
                bisap_score += 1
        elif impaired_state:
            bisap_score += 1
        elif glasgow_coma:
            if glasgow_coma < gcs_limit: bisap_score += 1
        else:
            bisap_score = False

        return bisap_score
