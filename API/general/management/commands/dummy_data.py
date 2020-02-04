from django.core.management import BaseCommand, call_command, CommandError
from datetime import datetime
from django.contrib.auth.models import User
from general.models import RunAlgorithm

import json


class Command(BaseCommand):
    def handle(self, *args, **options):
        try:
            user1= User.objects.create_user(username='Dummy Tester',
                                            email='dummy@tester.com',
                                            password='Test1234',
                                            is_active=True)
            user1.save()
            user2= User.objects.create_user(username='Dummy Tester2',
                                            email='dummy2@tester.com',
                                            password='Test1234',
                                            is_active=True)
            user2.save()
        except Exception as e:
            print(str(e))
            raise CommandError('User creatioin failed!')

        # create algorithms
        algo_input1 = {
            "sex": "m",
            "age": 45,
            "height": 200.66000000000003,
            "weight": 43.09171731833439,
            "bmi": 10.7,
            "chronic_health": "",
            "ph": 220,
            "paO2": 130,
            "paCO2": 45,
            "hco3_artieral": 60,
            "spO2": 100,
            "fiO2": 42,
            "base_excess": 2,
            "sodium": 110,
            "potassium": 1,
            "chloride": 45,
            "hco3_serum": 45,
            "bun": 45,
            "creatinine": 9,
            "glucose": 45,
            "calcium": 18,
            "albumin": 5,
            "ast": 45,
            "alt": 45,
            "ldh": 45,
            "wbc": 45,
            "platelet_count": 45,
            "hematocrit": 45,
            "crp": 45,
            "guarding": False,
            "tenderness": False,
            "eye_score": 1,
            "verbal_score": 1,
            "motor_score": 1,
            "pleural_eff": False,
            "temperature": 37,
            "bp_systolic": 80,
            "bp_diastolic": 45,
            "heart_rate": 44,
            "resp_rate": 45,
            "onset_date": "2020-02-04T05:00:00.000Z",
            "admission_date": "2020-02-04T05:00:00.000Z",
            "fluid_responsive": False,
            "time_stamp": "2020-02-04T17:02:03.764Z",
            "time": 12.063511666666667,
            "glasgow_coma": 3,
            "bicarbonate": 45,
            "peritonitis": False,
            "maintenance_fluid": 1508,
            "arterial_pressure": 56.666666666666664,
            "sirs_score": 2
        }

        algo_output1 = {
          "SIRS": 2,
          "HAPS": 2,
          "Panc 3": 1,
          "BISAP": 2,
          "POP": 15,
          "Ranson": 1,
          "Glasgow": 3,
          "JSS": 3,
          "Marshall": 7
        }

        algo_input2 = {
            "sex": "f",
            "age": 28,
            "height": 116.84,
            "weight": 24.947836342193593,
            "bmi": 18.27,
            "chronic_health": "",
            "ph": 23,
            "paO2": 230,
            "paCO2": 34,
            "hco3_artieral": 50,
            "spO2": 80,
            "fiO2": 70,
            "base_excess": 3,
            "sodium": 123,
            "potassium": 7,
            "chloride": 90,
            "hco3_serum": 50,
            "bun": 45,
            "creatinine": 2,
            "glucose": 45,
            "calcium": 10,
            "albumin": 6,
            "ast": 23,
            "alt": 240,
            "ldh": 340,
            "wbc": 50,
            "platelet_count": 23,
            "hematocrit": 23,
            "crp": 12,
            "guarding": True,
            "tenderness": True,
            "eye_score": 3,
            "verbal_score": 3,
            "motor_score": 1,
            "pleural_eff": None,
            "temperature": 36.5,
            "bp_systolic": 180,
            "bp_diastolic": 34,
            "heart_rate": 150,
            "resp_rate": 44,
            "onset_date": "2020-02-04T05:00:00.000Z",
            "admission_date": "2020-02-04T05:00:00.000Z",
            "fluid_responsive": False,
            "time_stamp": "2020-02-04T16:59:24.183Z",
            "time": 12.028713611111112,
            "glasgow_coma": 7,
            "bicarbonate": 50,
            "peritonitis": True,
            "maintenance_fluid": 873,
            "arterial_pressure": 82.66666666666666,
            "sirs_score": 3
        }

        algo_output2 = {
            "SIRS": 3,
            "HAPS": 2,
            "POP": 7,
            "Ranson": 1,
            "Glasgow": 3,
            "JSS": 3,
            "Marshall": 4
        }

        algo_input3 = {
            "sex": "m",
            "age": 30,
            "height": 178,
            "weight": 80,
            "bmi": 25.25,
            "chronic_health": "",
            "ph": 11,
            "paO2": 240,
            "paCO2": 23,
            "hco3_artieral": 23,
            "spO2": 76,
            "fiO2": 23,
            "base_excess": 1,
            "sodium": 111,
            "potassium": 2,
            "chloride": 147,
            "hco3_serum": 23,
            "bun": 23,
            "creatinine": 9,
            "glucose": 232,
            "calcium": 12,
            "albumin": 4,
            "ast": 23,
            "alt": 23,
            "ldh": 500,
            "wbc": 23,
            "platelet_count": 34,
            "hematocrit": 34,
            "crp": 34,
            "guarding": True,
            "tenderness": True,
            "eye_score": 2,
            "verbal_score": 2,
            "motor_score": 2,
            "pleural_eff": False,
            "temperature": 36.5,
            "bp_systolic": 147,
            "bp_diastolic": 120,
            "heart_rate": 178,
            "resp_rate": 12,
            "onset_date": "2020-02-04T05:00:00.000Z",
            "admission_date": "2020-02-04T05:00:00.000Z",
            "fluid_responsive": False,
            "time_stamp": "2020-02-04T16:55:22.935Z",
            "time": 11.985595555555555,
            "glasgow_coma": 6,
            "bicarbonate": 23,
            "peritonitis": True,
            "maintenance_fluid": 2800,
            "arterial_pressure": 129.0,
            "sirs_score": 2
        }

        algo_output3 = {
            "SIRS": 2,
            "HAPS": 2,
            "Panc 3": 0,
            "BISAP": 1,
            "POP": 8,
            "Ranson": 2,
            "Glasgow": 3,
            "JSS": 3,
            "Marshall": 5
        }

        run_at1 = datetime.strptime('2020-02-04T02:15:45.000Z', '%Y-%m-%dT%H:%M:%S.%fZ')
        algorithm1 = RunAlgorithm(user=user1,
                                input=json.dumps(algo_input1, indent=2),
                                output=json.dumps(algo_output1, indent=2),
                                run_at=run_at1)
        algorithm1.save()

        run_at2 = datetime.strptime('2020-02-04T10:15:45.000Z', '%Y-%m-%dT%H:%M:%S.%fZ')
        algorithm2 = RunAlgorithm(user=user1,
                                input=json.dumps(algo_input2, indent=2),
                                output=json.dumps(algo_output2, indent=2),
                                run_at=run_at2)
        algorithm2.save()

        run_at3 = datetime.strptime('2020-02-04T22:15:45.000Z', '%Y-%m-%dT%H:%M:%S.%fZ')
        algorithm3 = RunAlgorithm(user=user1,
                                input=json.dumps(algo_input3, indent=2),
                                output=json.dumps(algo_output3, indent=2),
                                run_at=run_at3)
        algorithm3.save()

        self.stdout.write(self.style.SUCCESS('Dummy data is successfully created!'))