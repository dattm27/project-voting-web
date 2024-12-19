import { useState } from 'react';
import { useReadContract, TransactionButton } from 'thirdweb/react';
import { CONTRACT } from '../../Utils/constant.js';
import { prepareContractCall } from 'thirdweb';
import styles from './TestPage.module.scss';
import { GET_ELECTION } from '../../GraphQL/client.jsx';
import { useQuery } from '@apollo/client';

function TestPage() {
    // State for the input fields
    const [title, setTitle] = useState("");
    const [owner, setOwner] = useState("");

    // State for filtered election data (only title and owner)
    const [filteredElectionData, setFilteredElectionData] = useState(null);

    const { data: count, isLoading: loadingCount } = useReadContract({
        contract: CONTRACT,
        method: 'electionCreated',
    });

    // GraphQL query
    const { refetch } = useQuery(GET_ELECTION); // Add `refetch`

    // Handler to display only title and owner from election data
    const handleGetElectionData = async () => {
        try {
            const { data } = await refetch(); // Use `refetch` to get fresh data
            if (data && data.newElections) {
                const formattedData = data.newElections.map((election) => ({
                    title: election.title,
                    owner: election.owner,
                    id: election.electionId,
                }));
                setFilteredElectionData(formattedData);
            }
        } catch (error) {
            console.error("Failed to fetch updated data:", error);
        }
    };

    return (
        <div className={styles.container}>
            {loadingCount ? (
                <h1>Loading...</h1>
            ) : (
                <h1 className={styles.heading}>Current elections count: {Number(count)}</h1>
            )}

            {/* Input field for title */}
            <div className={styles.inputGroup}>
                <label htmlFor="title" className={styles.label}>Election Title:</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // Update state on input change
                    className={styles.input}
                />
            </div>

            {/* Input field for owner */}
            <div className={styles.inputGroup}>
                <label htmlFor="owner" className={styles.label}>Owner Address:</label>
                <input
                    id="owner"
                    type="text"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)} // Update state on input change
                    className={styles.input}
                />
            </div>

            <TransactionButton
                transaction={() =>
                    prepareContractCall({
                        contract: CONTRACT,
                        method: 'createElection',
                        params: [title, owner], // Using state variables for arguments
                    })
                }
                className={styles.transactBtn}
                onTransactionConfirmed={(tx) => {
                    alert("Transaction sent!");
                    console.log(tx);
                    // Add custom logic, like a toast notification or redirection
                }}
            >
                Create Election
            </TransactionButton>

            {/* Button to get filtered election data */}
            <button onClick={handleGetElectionData} className={styles.fetchBtn}>
                Get Election Data
            </button>

            {/* Display filtered election data */}
            {filteredElectionData && (
                <div className={styles.rawData}>
                    <h2 className={styles.heading}>Election Data:</h2>
                    <ul>
                        {filteredElectionData.map((election, index) => (
                            <li key={index}>
                                <strong>Title:</strong> {election.title} <br />
                                <strong>Owner:</strong> {election.owner} <br />
                                <strong>Id:</strong> {election.id}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default TestPage;
