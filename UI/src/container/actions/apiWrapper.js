import jwtDecode from 'jwt-decode';

export const isAuthTokenValid = access_token => {
	if ( !access_token )
	{
		return false;
	}
	const decoded = jwtDecode(access_token);
	const currentTime = Date.now() / 1000;
	if ( decoded.exp < currentTime )
	{
		return false;
	}
	
	return true;
	
};

export const getToken = () => {
	return window.localStorage.getItem('token');
};

export const setToken = (token) => {
	return window.localStorage.setItem('token', token);
};

export const getUserInfo = () => {
	const token = window.localStorage.getItem('token');

	if (token && typeof token !== 'undefined') {
		return jwtDecode(token);
	}
	return null;
	
};

export const getUserRole = () => {
	const token = getUserInfo();

	if (token) {
		return token.role.replace(';', '');
	}
	return null;
	
};

export const isAuthenticated = () => {
	const token = getToken();
	if (token) {
		return true;
	}

	return false;
};

export const postApiWithoutToken = (url, body) => {
	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body
	}).then(response => {
		if (response.ok) {
			return response.json().then((res) => ({
				...res,
				success: true
			}));
		}

		throw response;
	}).catch(err => {
		if (err.name === "TypeError" && err.message === "Failed to fetch") {
			return {
				msg: 'server is offline',
				success: false,
				isServerError: true
			};
		}
		return err.text().then(errors => {
			let errorResponse = JSON.parse(errors);
			return {
				msg: errorResponse.message,
				success: false
			};
		});
	});
};

export const postApi = (url, body) => {
	const access_token = getToken();

	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': access_token
		},
		body
	}).then(response => {
		if (response.ok) {
			return response.json().then((res) => ({
				data: res,
				success: true
			}));
		}

		throw response;
	}).catch(err => {
		if (err.name === "TypeError" && err.message === "Failed to fetch") {
			return {
				msg: 'server is offline',
				success: false,
				isServerError: true
			};
		}
		return err.text().then(errors => {
			let errorResponse = JSON.parse(errors);
			return {
				msg: errorResponse.message,
				success: false
			};
		});
	});
};

export const getApi = (url, body) => {
	const access_token = getToken();
	if (isAuthTokenValid(access_token)) {
		
		return fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': access_token
			},
			body
		}).then(response => {
			if (response.ok) {
				return response.json().then((res) => ({
					data: res,
					success: true
				}));
			}

			throw response;
		}).catch((err, status) => {
			if (err.name === "TypeError" && err.message === "Failed to fetch") {
				return {
					msg: 'server is offline',
					success: false,
					isServerError: true
				};
			}
			return err.text().then(errors => {
				let errorResponse = JSON.parse(errors);
				return {
					msg: errorResponse.message,
					success: false
				};
			});
		});
	}

	window.location.href = '/';
};

export const getApiWithoutToken = (url, body) => {
	return fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		body
	}).then(response => {
		if (response.ok) {
			return response.json().then((res) => ({
				data: res,
				success: true
			}));
		}

		throw response;
	}).catch((err, status) => {
		if (err.name === "TypeError" && err.message === "Failed to fetch") {
			return {
				msg: 'server is offline',
				success: false,
				isServerError: true
			};
		}
		return err.text().then(errors => {
			let errorResponse = JSON.parse(errors);
			return {
				msg: errorResponse.message,
				success: false
			};
		});
	});
};

export const uploadFormData = (url, files) => {
	const fd = new FormData();
	fd.append( 'csv_file', files[0] );

	return fetch({
		url: url,
		type: 'POST',
		body: fd
	}).then(response => {
		if (response.ok) {
			return response.json().then((res) => ({
				...res,
				success: true
			}));
		}

		throw response;
	}).catch(err => {
		if (err.name === "TypeError" && err.message === "Failed to fetch") {
			return {
				msg: 'server is offline',
				success: false,
				isServerError: true
			};
		}
		return err.text().then(errors => {
			let errorResponse = JSON.parse(errors);
			return {
				msg: errorResponse.message,
				success: false
			};
		});
	});
};
