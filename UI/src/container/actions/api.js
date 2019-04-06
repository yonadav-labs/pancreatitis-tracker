import { uploadFormData, postApi, postApiWithoutToken } from './apiWrapper';
import {
	SAVE_PATIENT_DATA
} from './api_url';

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

export const savePatientDataApi = (data) => {
	console.log("DDFDF: ", data);
	return postApi(SAVE_PATIENT_DATA, JSON.stringify(data))
		.then((res) => {
			if (res.success) {
				return {
					success: true,
					data: res.data
				};
			}

			return {
				success: false,
				msg: res.msg
			};
		})
		.catch(err => {
			return {
				success: false,
				msg: 'error catch'
			};
		});
};

export const loadClinicalScoresApi = () => {
	const data = [
		{ title: "SIRS", value:  "80", text: "4 out of 5" },
		{ title:"HAPS", value:  "60", text: "3 out of 5" },
		{ title:"PANC3", value:  "60", text: "3 out of 5" },
		{ title:"POP", value:  "40", text: "2 out of 5" },
		{ title:"RANSON", value:  "60", text: "3 out of 5" },
		{ title:"GLASGOW", value:  "60", text: "3 out of 5" },
		{ title:"APACHE II", value:  "60", text: "3 out of 5" },
		{ title:"JSS", value:  "60", text: "3 out of 5" },
		{ title:"MARSHALL", value:  "60", text: "3 out of 5" },
		{ title:"POP Mort. %", value:  "60", text: "60%" }
	];

	return new Promise((resolve) => {
		resolve({ success: true, data: data });
	});
};

export const loginApi = (username, password) => {
	const loginData = JSON.stringify({
		Username: username,
		Password: password
	});

	return postApiWithoutToken(LOGIN_URL, loginData)
		.then(response => {
			console.log(response);
			if (response && response.token) {
				const decode = jwtDecode(response.token);

				window.localStorage.setItem('token', response.token);
				return {
					success: true,
					user: response
				};
			}

			return {
				success: false,
				error: response.Message
			};
		})
		.catch((err) => {
			console.log('login acttion err', err);
			return {
				success: false,
				error: err
			};
		});
};