from abc import ABCMeta, abstractmethod


class MounzerRuleInterface:
    '''
    Predictive rules for combining scores for organ failure in AP patients.

    This module includes the Severity Calculator Logic

    Developed by Ariel Precision Medicine. 
    '''

    __metaclass__ = ABCMeta

    name = ''
    required_fields = []

    @classmethod
    def __init__(self, request):
        self.request = request

    @classmethod
    def can_process(self):
        if not all([self.request.get(ii) is not None for ii in self.required_fields]):
            return False
        if 'time' in self.required_fields and self.request['time'] < 48:
            return False
        return True

    @classmethod
    def __repr__(self):
        return 'Required parameters: ({})'.format(', '.join(self.required_fields))

    @classmethod
    def params(self):
        return { 
            "required": self.required_fields,
            "required_fields_verbose": ', '.join(self.required_fields_verbose)
        }

    @abstractmethod
    def evaluate(self):
        pass


class Rule1(MounzerRuleInterface):
    '''
    Computes Mounzer admission rule 1 given necessary parameters.

    Args:
      sirs_score: output from SIRS
      haps_score: output from HAPS
      panc3_score: output from Panc3

    Returns:
      rule1: True=likely organ failure, False=likely no organ failure,
        None=rule not satisfied
    '''
    name = 'Rule 1'
    required_fields = ['sirs_score', 'haps_score', 'panc3_score']
    required_fields_verbose = ['SIRS', 'HAPS', 'Panc 3']

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        result = None
        if _['sirs_score'] == 0 and _['haps_score'] <= 1 and _['panc3_score'] == 0:
            result = True

        return result


class Rule2(MounzerRuleInterface):
    '''
    Computes Mounzer admission rule 2 given necessary parameters.

    Args:
      sirs_score: output from SIRS
      haps_score: output from HAPS
      panc3_score: output form Panc3

    Returns:
      rule2: True=likely organ failure, False=likely no organ failure,
        None=rule not satisfied
      rule2_log = tuple of test Pass/Fail (T/F) and list of missing labs
    '''
    name = 'Rule 2'
    required_fields = ['sirs_score', 'haps_score', 'panc3_score']
    required_fields_verbose = ['SIRS', 'HAPS', 'Panc 3']

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        result = None
        if _['sirs_score'] >= 2 and _['haps_score'] >= 2 and _['panc3_score'] >= 1:
            result = True

        return result


class Rule3(MounzerRuleInterface):
    '''
    Computes Mounzer admission rule 3 given necessary parameters.

    Args:
      bisap_score: output from BISAP
      pop_score: output from POP
      ranson_score: output from Ranson

    Returns:
      rule3: True=likely organ failure, False=likely no organ failure,
        None=rule not satisfied
      rule3_log = tuple of test Pass/Fail (T/F) and list of missing labs
    '''
    name = 'Rule 3'
    required_fields = ['bisap_score', 'pop_score', 'ranson_score']
    required_fields_verbose = ['BISAP', 'POP', 'Ranson']

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        result = None
        if _['bisap_score'] <= 1 and _['pop_score'] <= 1 and _['ranson_score'] <= 1:
            result = True

        return result


class Rule4(MounzerRuleInterface):
    '''
    Computes Mounzer admission rule 4 given necessary parameters.

    Args:
      bisap_score: output from BISAP
      pop_score: output from POP
      ranson_score: output from Ranson

    Returns:
      rule4: True=likely organ failure, False=likely no organ failure,
        None=rule not satisfied
      rule4_log = tuple of test Pass/Fail (T/F) and list of missing labs
    '''
    name = 'Rule 4'
    required_fields = ['bisap_score', 'pop_score', 'ranson_score']
    required_fields_verbose = ['BISAP', 'POP', 'Ranson']

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        result = None
        if _['bisap_score'] >= 3 and _['pop_score'] >= 2 and _['ranson_score'] >= 2:
            result = True

        return result


class Rule5(MounzerRuleInterface):
    '''
    Computes Mounzer admission rule 5 given necessary parameters.

    Args:
      glasgow_score: output from Glasgow-Imrie
      apache_score: output from APACHE II
      jss_score: output from JSS

    Returns:
      rule5: True=likely organ failure, False=likely no organ failure,
        None=rule not satisfied
      rule5_log = tuple of test Pass/Fail (T/F) and list of missing labs
    '''
    name = 'Rule 5'
    required_fields = ['glasgow_score', 'apache_score', 'jss_score']
    required_fields_verbose = ['Glasgow', 'APACHE II', 'JSS']

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        result = None
        if _['glasgow_score'] == 0 and _['apache_score'] <= 5 and _['jss_score'] <= 1:
            result = True

        return result


class Rule6(MounzerRuleInterface):
    '''
    Computes Mounzer admission rule 6 given necessary parameters.

    Args:
      glasgow_score: output from Glasgow-Imrie
      apache_score: output from APACHE II
      jss_score: output from JSS

    Returns:
      rule6: True=likely organ failure, False=likely no organ failure,
        None=rule not satisfied
      rule6_log = tuple of test Pass/Fail (T/F) and list of missing labs
    '''
    name = 'Rule 6'
    required_fields = ['glasgow_score', 'apache_score', 'jss_score']
    required_fields_verbose = ['Glasgow', 'APACHE II', 'JSS']

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        result = None
        if _['glasgow_score'] >= 1 and _['apache_score'] >= 11 and _['jss_score'] >= 2:
            result = True

        return result


class Rule7(MounzerRuleInterface):
    '''
    Computes Mounzer 48hr rule 7 given necessary parameters.

    Args:
      sirs_score: output from SIRS
      haps_score: output from HAPS
      panc3_score: output from Panc3
      time: in hrs

    Returns:
      rule7: True=likely organ failure, False=likely no organ failure,
        None=rule not satisfied
      rule7_log = tuple of test Pass/Fail (T/F) and list of missing labs
    '''
    name = 'Rule 7'
    required_fields = ['sirs_score', 'haps_score', 'panc3_score', 'time']
    required_fields_verbose = ['SIRS', 'HAPS', 'Panc 3']

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        result = None
        if _['sirs_score'] <= 1 and _['haps_score'] == 0 and _['panc3_score'] == 0:
            result = True

        return result


class Rule8(MounzerRuleInterface):
    '''
    Computes Mounzer 48hr rule 8 given necessary parameters.

    Args:
      sirs_score: output from SIRS
      haps_score: output from HAPS
      panc3_score: output from Panc3
      time: in hrs

    Returns:
      rule8: True=likely organ failure, False=likely no organ failure,
        None=rule not satisfied
      rule8_log = tuple of test Pass/Fail (T/F) and list of missing labs
    '''
    name = 'Rule 8'
    required_fields = ['sirs_score', 'haps_score', 'panc3_score', 'time']
    required_fields_verbose = ['SIRS', 'HAPS', 'Panc 3']

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        result = None
        if _['sirs_score'] >= 2 and _['haps_score'] >= 1 and _['panc3_score'] >= 1:
            result = True

        return result


class Rule9(MounzerRuleInterface):
    '''
    Computes Mounzer 48hr rule 9 given necessary parameters.

    Args:
      bisap_score: output from BISAP
      pop_score: output from POP
      ranson_score: output from Ranson
      time: in hrs

    Returns:
      rule9: True=likely organ failure, False=likely no organ failure,
        None=rule not satisfied
      rule9_log = tuple of test Pass/Fail (T/F) and list of missing labs
    '''
    name = 'Rule 9'
    required_fields = ['bisap_score', 'pop_score', 'ranson_score', 'time']
    required_fields_verbose = ['BISAP', 'POP', 'Ranson']

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        result = None
        if _['bisap_score'] <= 1 and _['pop_score'] <= 9 and _['ranson_score'] <= 3:
            result = True

        return result


class Rule10(MounzerRuleInterface):
    '''
    Computes Mounzer 48hr rule 10 given necessary parameters.

    Args:
      bisap_score: output from BISAP
      pop_score: output from POP
      ranson_score: output from Ranson
      time: in hrs

    Returns:
      rule10: True=likely organ failure, False=likely no organ failure,
        None=rule not satisfied
      rule10_log = tuple of test Pass/Fail (T/F) and list of missing labs
    '''
    name = 'Rule 10'
    required_fields = ['bisap_score', 'pop_score', 'ranson_score', 'time']
    required_fields_verbose = ['BISAP', 'POP', 'Ranson']

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        result = None
        if _['bisap_score'] >= 2 and _['pop_score'] >= 11 and _['ranson_score'] >= 4:
            result = True

        return result


class Rule11(MounzerRuleInterface):
    '''
    Computes Mounzer 48hr rule 11 given necessary parameters.

    Args:
      glasgow_score: output from Glasgow-Imrie
      apache_score: output from APACHE II
      jss_score: output from JSS
      time: in hrs

    Returns:
      rule11: True=likely organ failure, False=likely no organ failure,
        None=rule not satisfied
      rule11_log = tuple of test Pass/Fail (T/F) and list of missing labs
    '''
    name = 'Rule 11'
    required_fields = ['glasgow_score', 'apache_score', 'jss_score', 'time']
    required_fields_verbose = ['Glasgow', 'APACHE II', 'JSS']

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        result = None
        if _['glasgow_score'] == 0 and _['apache_score'] <= 8 and _['jss_score'] <= 2:
            result = True

        return result


class Rule12(MounzerRuleInterface):
    '''
    Computes Mounzer 48hr rule 7 given necessary parameters.

    Args:
      sirs_score: output from SIRS
      haps_score: output from HAPS
      panc3_score: output from Panc3
      time: in hrs

    Returns:
      rule7: True=likely organ failure, False=likely no organ failure,
        None=rule not satisfied
      rule7_log = tuple of test Pass/Fail (T/F) and list of missing labs
    '''
    name = 'Rule 12'
    required_fields = ['glasgow_score', 'apache_score', 'jss_score', 'time']
    required_fields_verbose = ['Glasgow', 'APACHE II', 'JSS']

    def evaluate(self):
        _ = self.request
        if not self.can_process():
            return None

        result = None
        if _['glasgow_score'] >= 1 and _['apache_score'] >= 9 and _['jss_score'] >= 3:
            result = True

        return result
