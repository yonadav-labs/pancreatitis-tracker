export { uploadFormData } from './apiWrapper';

export const loadPatientDataApi = (files) => {
	// uploadFormData(url, files);
	const data = {
		sex: {value: 'f', label: 'Female'},
		height: {value: 24, unit: 'cm'}
	};

	return new Promise((resolve) => {
		resolve({ success: true, data: data });
	});
};

export const savePatientDataApi = (data, step) => {
	return new Promise((resolve) => {
		resolve({ success: true, data: data, step: step });
	});
};