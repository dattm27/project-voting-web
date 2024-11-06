import { useState, useEffect } from 'react';
import styles from './VoteDetailPage.module.scss';
import { useSDK } from "@metamask/sdk-react";
import { useLocation } from 'react-router-dom';
import { GET_ELECTION_CANDIDATES } from '../../GraphQL/client.jsx';
import { useQuery } from '@apollo/client';
import { make_vote } from '../../Assets/index';

const VotePage = () => {
    const [candidates, setCandidates] = useState([]);
    const { sdk } = useSDK();
    const [userVoted, setUserVoted] = useState({});
    const location = useLocation();

    // Fetch data using GraphQL
    const { data, loading, error } = useQuery(GET_ELECTION_CANDIDATES, {
        variables: { electionAddr: location.state.voteAddr || "" },
    });

    useEffect(() => {
        if (data && data.newCandidates) {
            // Map GraphQL data to the desired candidate structure
            const mappedCandidates = data.newCandidates.map(candidate => ({
                id: candidate.candidateId,
                name: candidate.name,
                description: candidate.electionId.title,
                votes: candidate.voteCount, // Assuming initial votes are 0; adjust as needed
            }));
            setCandidates(mappedCandidates);
        }
    }, [data]);

    const handleVote = async (candidateId) => {
        const accounts = await sdk?.connect();
        if (!accounts?.length) {
            alert("Please connect your MetaMask wallet to vote.");
            return;
        }

        try {
            setCandidates((prevCandidates) =>
                prevCandidates.map(candidate =>
                    candidate.id === candidateId
                        ? { ...candidate, votes: candidate.votes + 1 }
                        : candidate
                )
            );
            setUserVoted((prevVotes) => ({ ...prevVotes, [candidateId]: true }));

            // Persist the vote count (mocked)
            localStorage.setItem("votes", JSON.stringify(candidates));
        } catch (error) {
            console.error("Error voting for candidate:", error);
            alert("Voting failed. Please try again.");
        }
    };

    if (loading) return <p>Loading candidates...</p>;
    if (error) return <p>Error loading candidates: {error.message}</p>;

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
                            className={`${styles.voteButton} ${userVoted[candidate.id] ? styles.voted : ''}`}
                        >
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
