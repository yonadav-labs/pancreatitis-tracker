from .interface import AlgorithmInterface


class AlgorithmSirs(AlgorithmInterface):
    """
    Computes Systemic Inflammatory Response Syndrome (SIRS) score.

    Range(SIRS) = [0, 4]. >= 2 = SIRS. 2=Mild, 3=Moderate, 4= Severe.

    Args:
      temperature: temperature in Celsius
      heart_rate: heart rate in bpm
      resp_rate: respiratory rate in bpm
      wbc: white blood cell count, 10^3/mm^3
      paCO2: arterial carbon dioxide partial pressure in mmHg

    Returns:
      sirs_score: SIRS score if conditions met, else None
    """
    name = 'SIRS'
    required_fields = ['temperature', 'heart_rate', 'wbc']
    semi_req_fields = [['resp_rate'], ['paCO2']]
    score_range = { 'min': 0, 'max': 4, 'threshold': 2 }

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        temp_upper = 38
        temp_lower = 36
        hr_limit =  90
        rr_limit = 20
        wbc_upper = 12
        wbc_lower = 4
        paCO2_limit = 32

        sirs_score = 0
        if _["temperature"] >= temp_upper or _["temperature"] <= temp_lower: 
            sirs_score += 1
        if _["heart_rate"] >= hr_limit: 
            sirs_score += 1
        if _["wbc"] >= wbc_upper or _["wbc"] <= wbc_lower: 
            sirs_score += 1 

        resp_rate = _.get("resp_rate")
        paCO2 = _.get("paCO2")
        if resp_rate:
            if resp_rate >= rr_limit: sirs_score += 1
        elif paCO2:
            if paCO2 >= paCO2_limit: sirs_score += 1

        return sirs_score
