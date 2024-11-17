import endPointConfig from "./endPointConfig";

export function getAllElections() {
    return fetch(`${endPointConfig.serverIP}${endPointConfig.apiBaseURL}${endPointConfig.endpoints.elections}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Fetched elections:', data);
            return data;
        })
        .catch((error) => {
            console.error('Failed to fetch elections:', error);
            throw error;
        });
}