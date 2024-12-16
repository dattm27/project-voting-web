const endPointConfig = {
    //serverIP: 'https://project-voting-web.onrender.com',
    serverIP: 'http://localhost:3000',
    apiBaseURL: '/api/',
    endpoints: {
        elections: 'elections',
        candidates: 'candidates',
        electionsFilter: 'elections-filter',
        auth: 'auth',
        log: 'log',
    }
};

export default endPointConfig;