import AxiosInstance from './AxiosInstance';
import endPointConfig from './endPointConfig';

// Get all elections
export const getAllElections = async () => {
    try {
        const response = await AxiosInstance.getAxiosInstance().get(endPointConfig.endpoints.elections);
        return response.data;
    } catch (error) {
        console.error('Error fetching elections:', error);
        throw error;
    }
};

// Get an election by ID
export const getElectionById = async (id) => {
    try {
        const response = await AxiosInstance.getAxiosInstance().get(`${endPointConfig.endpoints.elections}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching election with ID ${id}:`, error);
        throw error;
    }
};

// Create a new election
export const createElection = async (electionData) => {
    try {
        const response = await AxiosInstance.getAxiosInstance().post(endPointConfig.endpoints.elections, electionData);
        return response.data;
    } catch (error) {
        console.error('Error creating election:', error);
        throw error;
    }
};

// Update an election by ID
export const updateElection = async (id, electionData) => {
    try {
        const response = await AxiosInstance.getAxiosInstance().put(`${endPointConfig.endpoints.elections}/${id}`, electionData);
        return response.data;
    } catch (error) {
        console.error(`Error updating election with ID ${id}:`, error);
        throw error;
    }
};

// Delete an election by ID
export const deleteElection = async (id) => {
    try {
        await AxiosInstance.getAxiosInstance().delete(`${endPointConfig.endpoints.elections}/${id}`);
    } catch (error) {
        console.error(`Error deleting election with ID ${id}:`, error);
        throw error;
    }
};


// Get all candidates
export const getAllCandidates = async () => {
    try {
        const response = await AxiosInstance.getAxiosInstance().get(endPointConfig.endpoints.candidates);
        return response.data;
    } catch (error) {
        console.error('Error fetching candidates:', error);
        throw error;
    }
};

// Get a candidate by ID
export const getCandidateById = async (id) => {
    try {
        const response = await AxiosInstance.getAxiosInstance().get(`${endPointConfig.endpoints.candidates}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching candidate with ID ${id}:`, error);
        throw error;
    }
};

// Create a new candidate
export const createCandidate = async (candidateData) => {
    try {
        const response = await AxiosInstance.getAxiosInstance().post(endPointConfig.endpoints.candidates, candidateData);
        return response.data;
    } catch (error) {
        console.error('Error creating candidate:', error);
        throw error;
    }
};

// Update a candidate by ID
export const updateCandidate = async (id, candidateData) => {
    try {
        const response = await AxiosInstance.getAxiosInstance().put(`${endPointConfig.endpoints.candidates}/${id}`, candidateData);
        return response.data;
    } catch (error) {
        console.error(`Error updating candidate with ID ${id}:`, error);
        throw error;
    }
};

// Delete a candidate by ID
export const deleteCandidate = async (id) => {
    try {
        await AxiosInstance.getAxiosInstance().delete(`${endPointConfig.endpoints.candidates}/${id}`);
    } catch (error) {
        console.error(`Error deleting candidate with ID ${id}:`, error);
        throw error;
    }
};
