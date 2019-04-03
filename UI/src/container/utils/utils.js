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

export function validateForm(rule, data, unit) {
	let isValidate = true;
	let errorMsg = 'Please provide a valid data';
		
	if (rule) {
		if (!rule.required) {
			if (!data || data.value === '') {
				return { success: true, msg: ''};
			}
		}

		switch(rule.type) {
			case 'integer':
				if (!isNaN(data.value)) {
					rule.range.forEach((range) => {
						if (
							// range.unit === data.unit &&
							range.unit === unit &&
							(
								range.min > parseFloat(data.value, 10)
								|| range.max < parseFloat(data.value, 10)
							)
						) {
							isValidate = false;
							errorMsg = `Valid in (${range.min}, ${range.max})`;
						}
					});
				} else {
					isValidate = false;
				}

				break;
			
			case 'email':
				if (!validateEmail(data.value)) {
					isValidate = false;
				}

				break;
			
			case 'phone':
				if (!validatePhoneNumber(data.value)) {
					isValidate = false;
				}

				break;

			case 'text':
				if (typeof data.value !== "string" || data.value === ""){
					isValidate = false;
				}
				break;
			
			case 'boolean':
				if (typeof data.value !== "boolean" || data.value === ""){
					isValidate = false;
				}
				break;
			
			default: break;
		}
	}

	return { success: isValidate, msg: errorMsg };
}

export const validateAccount = (rule, data) => {
	let isValidate = true;

	switch(rule.type) {
		case 'email':
			if (!validateEmail(data)) {
				isValidate = false;
			}

			break;
		
		case 'phone':
			if (!validatePhoneNumber(data)) {
				isValidate = false;
			}

			break;

		case 'text':
			if (typeof data !== "string" || data === ""){
				isValidate = false;
			}
			break;

		default: break;
	}

	return isValidate;
}

export const lbToKgConvert = (lbs) => {
	return lbs / 2.2046;
}

export const inchToCmConvert = (lbs) => {
	return lbs * 2.54;
}