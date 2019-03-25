from .interface import AlgorithmInterface


class AlgorithmEarlyWarning(AlgorithmInterface):
    """
    Computes the Modified Early Warning Score. 

    Rance(MEWS) = [0,17]. MEWS >=4, alert surgical team, assess ABCDE, therapy.

    Args:
      temperature: temperature, Celsius
      heart_rate: heart rate in bpm
      resp_rate: respiratory rate in bpm
      bp_systolic: systolic blood pressure in mmHg
      eye_score: int, 1= open spontaneously, 2=open to verbal command
        3=open in response to pain, 4=no response
      urine_out: urine output in ml/kg/hr

    Returns:
      mews_score: early warning score if conditions met, else None
      mews_log: tuple of test Pass/Fail (T/F) and list of missing labs
    """
    required_fields = ['temperature', 'heart_rate', 'resp_rate', 'bp_systolic', 
                       'eye_score', 'urine_out']

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        # Keys are lower bounds for each tier, value is assigned variable points
        temp_tiers = {38.6: 2, 38.1: 1, 36.1: 0, 35.1: 1, -1: 2}
        hr_tiers = {129.1: 3, 111: 2, 101: 1, 51: 0, 41: 1, -1: 2}
        rr_tiers = {29.1: 3, 21: 2, 15: 1, 9: 0, -1: 2}
        bp_tiers = {200: 2, 101: 0, 81: 1, 71: 2, -1: 3}
        neuro_tiers = {4: 3, 3: 2, 2: 1, 1: 0}
        urine_tiers = {0.5:0, 0.01:2, -1:3}

        temp_pts = self.calculate_subscore(_["temperature"], temp_tiers)
        hr_pts = self.calculate_subscore(_["heart_rate"], hr_tiers)
        rr_pts = self.calculate_subscore(_["resp_rate"], rr_tiers)
        bp_pts = self.calculate_subscore(_["bp_systolic"], bp_tiers)
        neuro_pts = self.calculate_subscore(_["eye_score"], neuro_tiers)
        urine_pts = self.calculate_subscore(_["urine_out"], urine_tiers)
        mews_score = sum([temp_pts, hr_pts, rr_pts, bp_pts, neuro_pts, urine_pts])

        return mews_score
