from .interface import AlgorithmInterface


class AlgorithmGlasgow(AlgorithmInterface):
    """
    Computes Glasgow-Imrie Criteria for severity of acute pancreatitis.

    This is the modified 1984 8-factor criteria, as opposed to the
    9 factor criteria.

    Range(Glasgow-Imrie) = [0,8]. Severe disease if >= 3.

    Args:
      age: int
      wbc: white blood cell count (10^3/mm^3 or 10^9/L)
      glucose: blood glucose in mg/dL
      bun: blood urea nitrogen, mg/dL -> urea in mmol/L
      paO2: Arterial oxygen partial pressure in mmHg
      calcium: serum calcium in mmol/L
      albumin: serum albumin in g/L
      ldh: lactate dehydrogenase for tissue damage in units/L

    Returns:
      glasgow_score: Glasgow score if conditions met, else None
    """
    name = 'Glasgow'
    required_fields = ['age', 'wbc', 'glucose', 'bun', 'paO2', 'calcium', 'albumin', 'ldh']
    score_range = { 'min': 0, 'max': 9, 'threshold': 2 }

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        glasgow_score = 0
        age_limit = 55
        wbc_limit = 15
        glucose_limit = 10 * 18.02
        urea_limit = 16
        paO2_limit =  60
        calcium_limit = 2
        albumin_limit = 32
        ldh_limit = 600
        ast_alt_lim = 100

        # Convert BUN from mg/dL to serum urea in mmol/L
        urea = _["bun"] * 0.357

        if _["age"] > age_limit: glasgow_score += 1
        if _["wbc"] > wbc_limit: glasgow_score += 1
        if _["glucose"] > glucose_limit: glasgow_score += 1
        if urea > urea_limit: glasgow_score += 1
        if _["paO2"] < paO2_limit: glasgow_score += 1
        if _["calcium"] < calcium_limit: glasgow_score += 1
        if _["albumin"] < albumin_limit: glasgow_score += 1
        if _["ldh"] > ldh_limit: glasgow_score += 1

        return glasgow_score
