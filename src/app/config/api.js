import config from './config.json';

const api = {
    dashboardProfile: {
        baseUrl: config.apiBaseURL,
        port: '8000',
        basePath: '/dashboard',
    }
};

export default api;
