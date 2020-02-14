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
	}
	return false;
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

export function checkValidity(rule, data, unit) {
	let isValid = true;
	let errorMsg = 'Please enter valid data.';
	let value = data;

	if (rule) {
		if (!rule.required && (!data || data === '')) {
			return { isValid: true, msg: '', val: value };
		}

		switch(rule.type) {
			case 'float':
				if (count(data, '\\.') < 2) {
					if (!isNaN(parseFloat(data))) {
						if (rule.range) {
							value = parseFloat(data);
							rule.range.forEach((range) => {
								if (range.unit === unit && ( range.min > value || range.max < value ) ) {
									isValid = false;
									errorMsg = `Valid in (${range.min}, ${range.max})`;
								}
							});							
						}
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
						if (rule.range) {
							value = parseInt(data);
							rule.range.forEach((range) => {
								if (range.unit === unit && ( range.min > value || range.max < value ) ) {
									isValid = false;
									errorMsg = `Valid in (${range.min}, ${range.max})`;
								}
							});							
						}
					} else {
						isValid = false;
					}
				} else {
					isValid = false;
				}

				break;
			case 'email':
				isValid = validateEmail(data);
				errorMsg = 'Please provide a valid email.';
				break;
			case 'phone':
				isValid = validatePhoneNumber(data);
				break;
			case 'name':
				if (data === "" || !allLetter(data) || count(data.trim(), '\\ ') < 1) {
					isValid = false;
					errorMsg = 'Please provide a valid name.'
				}
				break;
			case 'password':
				if (data === "") {
					isValid = false;
					errorMsg = "Please provide the password.";
				} else if (rule.isDefault) {
					if (data !== rule.default) {
						isValid = false;
						errorMsg = "Password is wrong. Use default password.";
					}
				} else {
					var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
					if(!data.match(passw)) {
						isValid = false;
						errorMsg = `Password should be 8 to 20 characters which contain at least 
												one numeric digit, one uppercase and one lowercase letter.`;
					}
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


export const convertDateToUTC = (date) => {
	return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
}