import {
	getApi,
	postApi,
	postApiWithoutToken,
	getApiWithoutToken
} from './apiWrapper';
import {
	SAVE_PATIENT_DATA,
	CREATE_ACCOUNT_URL,
	LOAD_INPUT_HISOTRY,
	FEEDBACK_URL,
	GET_GRAPH_DATA,
	CLEAR_INPUT_HISOTRY,
	SERVER_STATUS,
	RESET_ACCOUNT_URL,
	LOGIN_ACCOUNT_URL
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
				errorMsg: res.msg,
				isServerError: res.isServerError
			};
		})
		.catch(err => {
			return {
				success: false,
				msg: 'error catch'
			};
		});
};

export const getGraphDataApi = (fromDate, toDate) => {
	return getApi(GET_GRAPH_DATA+`?from=${fromDate}&to=${toDate}`)
		.then((res) => {
			if (res.success) {
				return {
					success: true,
					data: res
				};
			}

			return {
				success: false,
				errorMsg: res.msg,
				isServerError: res.isServerError
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
				errorMsg: res.msg,
				isServerError: res.isServerError
			};
		})
		.catch(err => {
			return {
				success: false,
				msg: 'error catch'
			};
		});
};

export const leaveFeedbackApi = (feedback) => {
	const data = JSON.stringify({
		content: feedback
	});

	return postApi(FEEDBACK_URL, data)
		.then(response => {
			if (res.success) {
				return {
					success: true
				};
			}

			return {
				success: false,
				errorMsg: res.msg,
				isServerError: res.isServerError
			};
		})
		.catch((err) => {
			return {
				success: false,
				msg: err
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
							success: false,
							msg: 'This email already exists.',
							error: false
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

export const clearInputHistoryApi = () => {
	return getApi(CLEAR_INPUT_HISOTRY)
		.then((res) => {
			if (res.success) {
				return {
					success: true,
					data: res.data
				};
			}

			return {
				success: false,
				errorMsg: res.msg,
				isServerError: res.isServerError
			};
		})
		.catch(err => {
			return {
				success: false,
				msg: 'error catch'
			};
		});
};

export const getServerStatusApi = () => {
	return getApiWithoutToken(SERVER_STATUS)
		.then((res) => {
			if (res.success) {
				return {
					success: true,
					data: res.data,
					isServerError: false
				};
			}

			return {
				success: false,
				errorMsg: res.msg,
				isServerError: res.isServerError
			};
		})
		.catch(err => {
			return {
				success: false,
				msg: 'error catch'
			};
		});
};

export const loginAccountApi = (data) => {
	const params = JSON.stringify(data);

	return postApiWithoutToken(LOGIN_ACCOUNT_URL, params)
		.then(response => {
			if (response) {
				switch (response.status) {
					case 'authenticated':
						return {
							success: true,
							token: response.jwt
						};


					default:
						return {
							success: false,
							msg: response.msg,
							status: response.status,
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

export const resetAccountApi = (data) => {
	const params = JSON.stringify(data);

	return postApiWithoutToken(RESET_ACCOUNT_URL, params)
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