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


// Get all candidates
export const getAllCandidates = async () => {
    try {
        const response = await instance.get(endPointConfig.endpoints.candidates);
        return response.data;
    } catch (error) {
        console.error('Error fetching candidates:', error);
        throw error;
    }
};

// Get a candidate by ID
export const getCandidateById = async (id) => {
    try {
        const response = await instance.get(`${endPointConfig.endpoints.candidates}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching candidate with ID ${id}:`, error);
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

// Update a candidate by ID
export const updateCandidate = async (id, candidateData) => {
    try {
        const response = await instance.put(`${endPointConfig.endpoints.candidates}/${id}`, candidateData);
        return response.data;
    } catch (error) {
        console.error(`Error updating candidate with ID ${id}:`, error);
        throw error;
    }
};

// Delete a candidate by ID
export const deleteCandidate = async (id) => {
    try {
        await instance.delete(`${endPointConfig.endpoints.candidates}/${id}`);
    } catch (error) {
        console.error(`Error deleting candidate with ID ${id}:`, error);
        throw error;
    }
};


const electionData = 
{
    "id" : 1,
    "name": "Test",
    "startDate": "2024-01-01T00:00:00.000Z",
    "endDate": "2024-11-15T15:37:08.999Z",
    "description": "temporary description.",
    "status": 2,
    "photoLink" : "https://res.cloudinary.com/dodhlbcqz/image/upload/v1732216894/cld-sample-5.jpg"
}

createElection(electionData).then((response) => {
    console.log(response);
});
