/* eslint-disable */

export function dynamicSort(property) {
	let sortOrder = 1;
	if (property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1);
	}
	return function (a,b) {
		let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * sortOrder;
	};
}

export function generateRandom() {
	return Math.random().toString().substring(2, 10);
}

export function compare(a,b) {
	if (a.order < b.order)
		return -1;
	if (a.order > b.order)
		return 1;
	return 0;
}

export const validatePhoneNumber = (str) => {
	var re = /^\+?([0-9]{1,2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

	if (str && str.length > 0) {
		return re.test(str);
	} else {
		return false;
	}
}

export const validateEmail = (email) => {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email && email.length > 0) {
		return re.test(String(email).toLowerCase());
	} else {
		return false;
	}
}

export const isFloat = n => {
    return n === +n && n !== (n|0);
}

export const isInteger = n => {
    return n === +n && n === (n|0);
}

export const count = (s1, letter) => {
	if (typeof (s1) === "string") {
		return ( s1.match( RegExp(letter,'g') ) || [] ).length;
	}

	let convertedString = s1.toString();
	return ( convertedString.match( RegExp(letter,'g') ) || [] ).length;
}

export const allLetter = (inputtxt) => {
	if(/^[a-z ]+$/i.test(inputtxt)) {
		return true;
	}

	return false;
}

export const hasOnlyOneSpace = (text) => {
	if (count(text, '\\ ') < 2) {
		if ((text.indexOf(' ') > 0) && (text.indexOf(' ') < (text.length - 1))) {
			return true;
		}
	}

	return false;
}

export function checkValidity(rule, data, unit) {
	let isValid = true;
	let errorMsg = 'Please enter valid data.';
	let value = data;

	if (rule) {
		if (!rule.required) {
			if (!data || data === '') {
				return { isValid: true, msg: '', val: value };
			}
		}

		switch(rule.type) {
			case 'float':
				if (count(data, '\\.') < 2) {
					if (!isNaN(parseFloat(data))) {
						value = parseFloat(data);
						rule.range.forEach((range) => {
							if (range.unit === unit && ( range.min > value || range.max < value ) ) {
								isValid = false;
								errorMsg = `Valid in (${range.min}, ${range.max})`;
							}
						});
					} else {
						isValid = false;
					}
				} else {
					isValid = false;
				}

				break;
			case 'integer':
				if (count(data, '\\.') == 0) {
					if (!isNaN(parseInt(data))) {
						value = parseInt(data);
						rule.range.forEach((range) => {
							if (range.unit === unit && ( range.min > value || range.max < value ) ) {
								isValid = false;
								errorMsg = `Valid in (${range.min}, ${range.max})`;
							}
						});
					} else {
						isValid = false;
					}
				} else {
					isValid = false;
				}

				break;
			case 'email':
				if (!validateEmail(data)) {
					isValid = false;
				}

				break;
			case 'phone':
				if (!validatePhoneNumber(data)) {
					isValid = false;
				}

				break;
			case 'text':
				if (typeof data !== "string" || data === ""){
					isValid = false;
				}
				break;
			case 'boolean':
				if (typeof data !== "boolean" || data === ""){
					isValid = false;
				}
				break;
		}
	}

	return { isValid: isValid, msg: errorMsg, val: value };
}

export const validateStep = (data, units, rules) => {
	let _data = {...data};
	let errors = {};

	Object.keys(_data).forEach((attr) => {
		if (rules[attr]) {
			const res = checkValidity(rules[attr], _data[attr], units[attr]);
			if (res.isValid) {
				_data[attr] = res.val;
			} else {
				errors[attr] = { msg: res.msg };
			}
		}
	});

	return { data: _data, errors: errors };
}

export const validateAccount = (rule, data) => {
	let isValid = true;

	switch(rule.type) {
		case 'email':
			if (!validateEmail(data)) {
				isValid = false;
			}

			break;
		
		case 'phone':
			if (!validatePhoneNumber(data)) {
				isValid = false;
			}

			break;

		case 'text':
			if (typeof data !== "string" || data === ""){
				isValid = false;
			}
			break;

		case 'name':
			if (data === "" || !allLetter(data) || !hasOnlyOneSpace(data)){
				isValid = false;
			}
			break;

		default: break;
	}

	return isValid;
}

export const lbToKgConvert = (lbs) => {
	return lbs / 2.2046;
}

export const inchTomConvert = (inch) => {
	return inch * 2.54 / 100;
}

export const fToC = (fahrenheit) => {
	var fTemp = fahrenheit;
	var fToCel = (fTemp - 32) * 5 / 9;
	return fToCel;
}

export const mgDlToMmolL = (value) => {
	var calculated = value * 18.018018;
	return calculated.toFixed(6);
}

export const sodiumConvert = (val) => {
	return val;
}

export const glucoseConvert = (val) => {
	return val * 0.0554994394556615;
}

export const calciumConvert = (val) => {
	return val * 0.25;
}

export const albuminConvert = (val) => {
	return val * 0.1;
}