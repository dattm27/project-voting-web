const endPointConfig = {
    serverIP: 'http://ec2-54-153-162-131.ap-southeast-2.compute.amazonaws.com:3000',
    //serverIP: 'http://localhost:3000',
    apiBaseURL: '/api/',
    endpoints: {
        elections: 'elections',
        candidates: 'candidates',
        electionsFilter: 'elections-filter',
    }
};

export default endPointConfig;