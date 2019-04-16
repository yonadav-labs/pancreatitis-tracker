from .interface import AlgorithmInterface


class AlgorithmMap(AlgorithmInterface):
    """
    Calculate mean arterial pressure from blood pressure.

    Args:
      bp_systolic: systolic blood pressure, in mmHg
      bp_diastolic: diastolic blood pressure, in mmHg
      arterial_pressure: mean arterial pressure, in mmHg

    Returns:
    arterial_pressure: in mmHg
    """
    required_fields = ['bp_systolic', 'bp_diastolic']
    optional_fields = ['arterial_pressure']

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        arterial_pressure = _.get('arterial_pressure')
        if not arterial_pressure:
            pulse_pressure = _['bp_systolic'] - _['bp_diastolic']
            arterial_pressure = _['bp_diastolic'] + pulse_pressure / 3
        return arterial_pressure
