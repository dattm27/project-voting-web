import { useState, useEffect } from 'react';
import styles from './VoteDetailPage.module.scss';
import { useSDK } from "@metamask/sdk-react";  // Assuming you’re using MetaMask for voting
import candidateData from '../../data/candidates';  // Example data import
import {make_vote} from '../../Assets/index'

const VotePage = () => {
    const [candidates, setCandidates] = useState([]);
    const { sdk } = useSDK(); // To authenticate voting
    const [userVoted, setUserVoted] = useState({}); // Track user votes

    useEffect(() => {
        // Load candidates, e.g., from local data or an API
        setCandidates(candidateData); 
    }, []);

    const handleVote = async (candidateId) => {
        // Ensure user is connected
        const accounts = await sdk?.connect();
        if (!accounts?.length) {
            alert("Please connect your MetaMask wallet to vote.");
            return;
        }

        try {
            setCandidates((prevCandidates) => 
                prevCandidates.map((candidate) => 
                    candidate.id === candidateId 
                        ? { ...candidate, votes: candidate.votes + 1 } 
                        : candidate
                )
            );
            setUserVoted((prevVotes) => ({ ...prevVotes, [candidateId]: true }));

            // Persist the vote count (mocked here - replace with actual backend logic)
            localStorage.setItem("votes", JSON.stringify(candidates));
        } catch (error) {
            console.error("Error voting for candidate:", error);
            alert("Voting failed. Please try again.");
        }
    };

    return (
        <div className={styles.votePage}>
            <h1>Vote for Your Candidate</h1>
            <div className={styles.candidatesList}>
                {candidates.map((candidate) => (
                    <div key={candidate.id} className={styles.candidateCard}>
                        <img src={make_vote} alt={candidate.name} className={styles.candidateImage} />
                        <h2>{candidate.name}</h2>
                        <p>{candidate.description}</p>
                        <button 
                            onClick={() => handleVote(candidate.id)} 
                            disabled={userVoted[candidate.id]} 
                            className={`${styles.voteButton} ${userVoted[candidate.id] ? styles.voted : ''}`}>
                            {userVoted[candidate.id] ? 'Voted' : 'Vote'}
                        </button>
                        <p className={styles.voteCount}>Votes: {candidate.votes}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VotePage;
