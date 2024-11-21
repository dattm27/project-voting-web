import styles from './CreateVote.module.scss';
import { useState } from 'react';
import { TransactionButton, useActiveAccount } from 'thirdweb/react';
import { CONTRACT } from '../../Utils/constant.js';
import { prepareContractCall } from 'thirdweb';
import { GET_NEW_VOTE } from '../../GraphQL/client.jsx';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

function CreateVote() {
    const [title, setTitle] = useState("");
    const [endDate, setEndDate] = useState(""); // State for end date and time
    const activeAccount = useActiveAccount();
    const navigate = useNavigate();

    // Fetch election data using GraphQL query
    const { refetch } = useQuery(GET_NEW_VOTE, {
        variables: { owner: activeAccount?.address },
        skip: !activeAccount
    });

    // Function to handle fetching new election data and redirecting
    const handleGetElectionData = async () => {
        try {
            const { data } = await refetch();
            if (data && data.newElections.length > 0) {
                const electionAddress = data.newElections[0].electionAddr;
                console.log("Election Address:", electionAddress);

                // Redirect to the election address page
                navigate(`/vote/${electionAddress}`);
            } else {
                console.error("No election data found.");
                alert("No new election data found!");
            }
        } catch (error) {
            console.error("Failed to fetch updated data:", error);
            alert("Failed to fetch updated data.");
        }
    };

    // Calculate the time difference in seconds
    const calculateTimeInSeconds = () => {
        const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
        const endTimestamp = Math.floor(new Date(endDate).getTime() / 1000); // End date in seconds
        if (endTimestamp > currentTimestamp) {
            return endTimestamp - currentTimestamp; // Time difference in seconds
        }
        alert("End date must be in the future.");
        throw new Error("Invalid end date.");
    };

    return (
        <div className={styles.container}>
            <h1>Create your own vote</h1>

            {/* Input field for vote title */}
            <div className={styles.inputGroup}>
                <label htmlFor="title" className={styles.label}>Vote Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                    placeholder="Enter the title of your vote"
                />
            </div>

            {/* Input field for end date and time */}
            <div className={styles.inputGroup}>
                <label htmlFor="endDate" className={styles.label}>End Date and Time</label>
                <input
                    id="endDate"
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={styles.input}
                />
            </div>

            {/* Transaction button to create a new election */}
            <TransactionButton
                transaction={() =>
                    prepareContractCall({
                        contract: CONTRACT,
                        method: 'createElection',
                        params: [title, calculateTimeInSeconds()],
                    })
                }
                className={styles.transactBtn}
                onTransactionConfirmed={(tx) => {
                    alert("Vote created successfully!");
                    console.log("Transaction confirmed:", tx);
                    handleGetElectionData();
                }}
                onTransactionFailed={(error) => {
                    console.error("Transaction failed:", error);
                    alert("Transaction failed. Please try again.");
                }}
            >
                Create Election
            </TransactionButton>
        </div>
    );
}

export default CreateVote;
