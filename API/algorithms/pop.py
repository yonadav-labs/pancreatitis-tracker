from math import exp

from .interface import AlgorithmInterface


class AlgorithmPop(AlgorithmInterface):
    """
    Computes Pancreatitis Outcome Prediction (POP) score.

    Range(POP) = [0,40]. Severity at >=9

    Args:
      age: int
      arterial_pressure: mean arterial pressure in mmHg
      ph: arterial pH
      bun: blood urea nitrogen, mg/dL -> urea in mmol/L
      calcium: in mmol/L
      paO2: Arterial oxygen partial pressure 
      fiO2: Fraction of inspired oxygen 

    Returns:
      pop_score: POP score if conditions met, else None
    """
    name = 'POP'
    required_fields = ['age', 'arterial_pressure', 'ph', 'bun', 'calcium', 'paO2', 'fiO2']
    score_range = { 'min': 0, 'max': 40, 'threshold': 9 }
    
    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        # Keys are lower bounds for each tier, value is assigned variable points
        age_tiers = {70: 8, 60: 7, 50: 5, 40: 3, 30: 1, -1: 0} # score if < 16?
        map_tiers = {90: 0, 80: 1, 60: 3, 50: 4, 40: 6, -1: 8}
        pa_fi_tiers = {225: 0, 75: 3, -1: 4}
        ph_tiers = {7.35: 0, 7.3: 1, 7.25: 2, 7.2: 4, 7.1: 5, 7.0: 6, -1: 10}
        urea_tiers = {17: 6, 11: 4, 8: 3, 5: 1, -1: 0}
        calcium_tiers = {2.5: 4, 2.3: 2, 2: 0, 1.8: 1, 1.6: 2, -1: 4} 

        # Convert BUN from mg/dL to serum urea in mmol/L
        urea = _["bun"] * 0.357

        age_pts = self.calculate_subscore(_["age"], age_tiers)
        map_pts = self.calculate_subscore(_["arterial_pressure"], map_tiers)
        pa_fi_pts = self.calculate_subscore((_["paO2"] / _["fiO2"]), pa_fi_tiers)
        ph_pts = self.calculate_subscore(_["ph"], ph_tiers)
        urea_pts = self.calculate_subscore(urea, urea_tiers)
        calcium_pts = self.calculate_subscore(_["calcium"], calcium_tiers)
        pop_score = sum([age_pts, map_pts, pa_fi_pts, ph_pts, urea_pts, calcium_pts])
       
        # POP predicted probability of mortality
        pop_percent = None
        if pop_score:
            R = -4.908 + 0.248 * pop_score
            prob = exp(R) / (1 + exp(R))
            pop_percent = 100 * prob
        
        return pop_score
