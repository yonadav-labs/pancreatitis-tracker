
# ariel-pancreatitis-severity-calc

The Ariel Acute Pancreatitis Severity Calculator has the following functions:

* tests for risk of patient organ failure or shock
* suggests lab tests to improve predictions
* recommends fluid based on patient height, weight, etc.
* tracks patient severity over time 

## Frontend UI

### Requirements
* node > 8.10.0
* yarn

### Installation
* install node
* install yarn
* clone the repo
    ```
    git clone https://github.com/Ariel-Precision-Medicine/ariel-severity-calculator-software.git
    ```
* install yarn packages
    ```
    cd UI
    yarn install
    ```
    
### Usage
```
yarn start
```

## Backend API

### Requirements

Before installing the Severity Calculator, the following software and libraries must be installed locally: Python 3.x.


### Installation and Usage

To install the Acute Pancreatitis Severity Calculator on an UNIX-based system (OSX, Ubuntu, etc.), follow these instructions.

1. Clone the repo
2. Install requirements
   ```
   pip install -r requirements.txt
   ```
3. Setup database schema
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```   
4. Create a super user
   ```
   python manage.py createsuperuser
   ```
5. Run the project
   ```
   python manage.py runserver
   ```
   *Note: It will run the project in development mode. If you want to deploy it more productively, you can deploy it on http server (like apache, nginx).*
6. Call API endpoints
7. Run tests
   ```
   python manage.py test
   ```

#### API Endpoints
```GET /algorithms```

* It returns all available algorithms.

```
curl http://localhost:8000/algorithms|json_pp
```

```POST /algorithms```

* It requires 0+ name/value pairs (as json).

* It returns which algorithms can run based upon the data passed in, as array

```
curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{ "bp_systolic": 3, "bp_diastolic": 2, "arterial_pressure": 2 }' http://localhost:8000/algorithms|json_pp
```

```POST /run_algorithms```

* It requires 0+ name/value pairs (as json).

* It returns output of all applicable algorithms in an array (for those that could not be run, return a standard message each)

```
curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{ "bp_systolic": 3, "bp_diastolic": 2, "arterial_pressure": 2 }' http://localhost:8000/run_algorithms|json_pp
```

```POST /run_algorithm/<algorithm>```

* It requires 0+ name/values pairs (as json).

* It returns output of the specific algorithm

```
curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{ "bp_systolic": 3, "bp_diastolic": 2, "arterial_pressure": 2 }' http://localhost:8000/run_algorithm/algorithmmap|json_pp
```

***Note: parameter names are same as original functions.***

##### Available Algorithms
* AlgorithmMap
* AlgorithmMarshall
* AlgorithmEarlyWarning
* AlgorithmApache
* AlgorithmBisap
* AlgorithmGlasgow
* AlgorithmHaps
* AlgorithmJss
* AlgorithmPanc3
* AlgorithmPop
* AlgorithmRanson
* AlgorithmSirs
