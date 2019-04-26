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

export const mgDlToMmolL = (value) => {
	var calculated = value * 18.018018;
	return calculated.toFixed(6);
}

export const glucoseConvert = (val) => {
	return val * 0.0554994394556615;
}

export const calciumConvert = (val) => {
	return val * 0.5;
}

export const albuminConvert = (val) => {
	return val * 0.1;
}
