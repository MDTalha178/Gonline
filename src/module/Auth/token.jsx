
/**
 * Saves the given authentication tokens to local storage.
 * @param {Object} data - { access_token, refresh_token }
 */

export const setToken = (data) =>{

    const token = {accessToken: data.access_token, refreshToken:data.refresh_token, role_type:data.role_type};
    localStorage.setItem('token', JSON.stringify(token));
}


/**
 * Retrieves the saved authentication tokens from local storage.
 * @returns {Object|null} An object containing accessToken and refreshToken, or null if not found.
 */


export const getToken = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    return token;
}