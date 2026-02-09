const API_BASE_URL = 'https://solarionis.test'; 

export const API_ENDPOINTS = {
    SEND_VERIFICATION: `${API_BASE_URL}/api/auth/send-verification`,
    VERIFY_CODE: `${API_BASE_URL}/api/auth/verify-code`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    USER: `${API_BASE_URL}/api/auth/user`
};

export default API_BASE_URL;