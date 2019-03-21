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
		console.warn('access token expired');
		return false;
	}
  
	return true;
  
};

export const getToken = () => {
	return window.localStorage.getItem('token');
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

export const postApiWithoutToken = (url, body) => {
	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body
	})
		.then(response => response)
		.then(response => response.json())
		.then(response => {
			return { ...response, success: true };
		})
		.catch(err => {
			console.log('postApi with token error: ', err);
			return { errors: [{ description: 'Server error' }], success: false };
		});
};

export const postApi = (url, body) => {
	const access_token = getToken();
	if (isAuthTokenValid(access_token)) {
		return fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + access_token
			},
			body
		})
			.then(response => response)
			.then(response => response.json())
			.then(response => {
				return { ...response, success: true };
			})
			.catch(err => {
				console.log(' postApi error: ', err);
				return { errors: [{ description: 'Server error' }], success: false };
			});
	}
	window.location.href = '/';
	
};

export const getApi = (url, body) => {
	const access_token = getToken();
	if (isAuthTokenValid(access_token)) {
		
		return fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + access_token
			},
			body
		})
			.then(response => response)
			.then(response => response.json())
			.then(response => {
				return { data: response, success: true };
			})
			.catch(err => {
				console.log(' getApi error: ', err);
				return { errors: [{ description: 'Server error' }], success: false };
			});
	}
	window.location.href = '/';
	
};