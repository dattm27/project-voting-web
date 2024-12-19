import instance from './AxiosInstance.js'; // Đảm bảo đường dẫn này là chính xác
import endPointConfig from './endPointConfig.js';

// Get all elections
export const getAllElections = async () => {
    try {
        const response = await instance.get(endPointConfig.endpoints.elections);
        return response.data;
    } catch (error) {
        console.error('Error fetching elections:', error);
        throw error;
    }
};

// Get an election by ID
export const getElectionById = async (id) => {
    try {
        const response = await instance.get(`${endPointConfig.endpoints.elections}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching election with ID ${id}:`, error);
        throw error;
    }
};

export const getElectionByFilter = async (filter) => {
    try {
        const response = await instance.get(`${endPointConfig.endpoints.electionsFilter}?title=${filter.title}&isEnd=${filter.isEnd}&sortByCandidates=${filter.sortByCandidates}&sortByVotes=${filter.sortByVotes}`);
        return response.data;
    }
    catch (error) {
        console.error(`Error fetching election with filter ${filter}:`, error);
        throw error;
    }
}

// Create a new election
export const createElection = async (electionData) => {
    try {
        const response = await instance.post(endPointConfig.endpoints.elections, electionData);
        return response.data;
    } catch (error) {
        console.error('Error creating election:', error);
        throw error;
    }
};

// Update an election by ID
export const updateElection = async (id, electionData) => {
    try {
        const response = await instance.put(`${endPointConfig.endpoints.elections}/${id}`, electionData);
        return response.data;
    } catch (error) {
        console.error(`Error updating election with ID ${id}:`, error);
        throw error;
    }
};

// Delete an election by ID
export const deleteElection = async (id) => {
    try {
        await instance.delete(`${endPointConfig.endpoints.elections}/${id}`);
    } catch (error) {
        console.error(`Error deleting election with ID ${id}:`, error);
        throw error;
    }
};


// Get all candidates by electionId
export const getCandidatesByElectionId = async (electionId) => {
    try {
        const response = await instance.get(`${endPointConfig.endpoints.candidates}/${electionId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching candidates for election ID ${electionId}:`, error);
        throw error;
    }
};

// Get a candidate by ID and electionId
export const getDetailCandidate = async (id, electionId) => {
    try {
        const response = await instance.get(`${endPointConfig.endpoints.candidates}/${id}/${electionId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching candidate with ID ${id} and election ID ${electionId}:`, error);
        throw error;
    }
};

// Create a new candidate
export const createCandidate = async (candidateData) => {
    try {
        const response = await instance.post(endPointConfig.endpoints.candidates, candidateData);
        return response.data;
    } catch (error) {
        console.error('Error creating candidate:', error);
        throw error;
    }
};

// Update a candidate by ID and electionId
export const updateCandidate = async (id, electionId, candidateData) => {
    try {
        const response = await instance.put(`${endPointConfig.endpoints.candidates}/${id}/${electionId}`, candidateData);
        return response.data;
    } catch (error) {
        console.error(`Error updating candidate with ID ${id} and election ID ${electionId}:`, error);
        throw error;
    }
};

// Delete a candidate by ID and electionId
export const deleteCandidate = async (id, electionId) => {
    try {
        await instance.delete(`${endPointConfig.endpoints.candidates}/${id}/${electionId}`);
    } catch (error) {
        console.error(`Error deleting candidate with ID ${id} and election ID ${electionId}:`, error);
        throw error;
    }
};

