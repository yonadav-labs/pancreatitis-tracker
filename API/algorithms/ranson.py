from .interface import AlgorithmInterface


class AlgorithmRanson(AlgorithmInterface):
    """
    Computes Ranson score for severity of acute pancreatitis. 

    Range(Ranson) = ? AP Severity at Ranson >=3.

    Args:
      age: int
      wbc: white blood cell count in 10^3/mm^3
      glucose: in mg/dL
      ldh: lacate dehydrogenase, blood test for tissue damage, U/L
      ast: aspartate aminotransferase, blood test for liver damage, U/L

    Returns:
      ranson_score: Ranson score if conditions met, else None
    """
    name = 'Ranson'
    required_fields = ['age', 'wbc', 'glucose', 'ldh', 'ast']
    score_range = { 'min': 0, 'max': 5, 'threshold': 2 }

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        ranson_score = 0
        age_limit = 55
        wbc_limit = 16
        glucose_limit = 200 * 18.02
        ldh_limit = 350
        ast_limit = 250
        if _["age"] > age_limit: ranson_score += 1
        if _["wbc"] > wbc_limit: ranson_score += 1
        if _["glucose"] > glucose_limit: ranson_score += 1
        if _["ldh"] > ldh_limit: ranson_score += 1
        if _["ast"] > ast_limit: ranson_score += 1
         
        return ranson_score
