from .interface import AlgorithmInterface


class AlgorithmPanc3(AlgorithmInterface):
    """
    Computes Panc 3 score given necessary parameters.

    Range(Panc 3) = [0,3]. Severe disease if >= 1

    Args:
      bmi: body mass index, kg/m^2
      hematocrit: hematocrit, vol. % of rbc in blood
      pleural_eff: xray status, e.g. y/n pleural effusion

    Returns:
      panc3_score: Panc 3 score if conditions met, else 
    """
    name = 'Panc 3'
    required_fields = ['bmi', 'hematocrit', 'pleural_eff']
    score_range = { 'min': 0, 'max': 3, 'threshold': 1 }

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        panc3_score = 0
        hematocrit_limit = 44 
        bmi_limit = 30
        if _["bmi"] > bmi_limit: panc3_score += 1
        if _["hematocrit"] > hematocrit_limit: panc3_score += 1
        if _["pleural_eff"]: panc3_score += 1
            
        return panc3_score
