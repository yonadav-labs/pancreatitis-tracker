/* eslint-disable */

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

export const mgDlToMmolL = (val) => {
	var calculated = val * 18.018018;
	return calculated.toFixed(6);
}

export const glucoseConvert = (val) => {
	return val * 18.02;
}

export const calciumConvert = (val, unit) => {
	if (unit === 'mEq/L') {
		return val * 2.0078;
	} else {
		return val * 4.0078;
	}
}

export const albuminConvert = (val) => {
	return val * 0.1;
}
