import { getApi, postApi, postApiWithoutToken } from './apiWrapper';
import {
	SAVE_PATIENT_DATA,
	CREATE_ACCOUNT_URL,
	LOAD_INPUT_HISOTRY
} from './api_url';

export const loadInputHistoryApi = () => {
	return getApi(LOAD_INPUT_HISOTRY)
		.then((res) => {
			if (res.success) {
				return {
					success: true,
					data: res
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

export const savePatientDataApi = (data) => {
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

export const loginApi = (username, password) => {
	const loginData = JSON.stringify({
		Username: username,
		Password: password
	});

	return postApiWithoutToken(LOGIN_URL, loginData)
		.then(response => {
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
			return {
				success: false,
				error: err
			};
		});
};

export const createAccountApi = (data) => {
	const params = JSON.stringify(data);

	return postApiWithoutToken(CREATE_ACCOUNT_URL, params)
		.then(response => {
			if (response) {
				switch (response.status) {
					case 'authenticated':
						return {
							success: true,
							token: response.jwt
						};

					case 'email-sent':
						return {
							success: false,
							msg: response.msg,
							error: false
						};

					default:
						return {
							success: false,
							msg: response.msg,
							error: true
						};
				}
			}
		})
		.catch((err) => {
			return {
				success: false,
				msg: 'Server is not available!',
				error: true
			};
		});
};