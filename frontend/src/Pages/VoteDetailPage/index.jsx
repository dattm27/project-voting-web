import { useState, useEffect } from 'react';
import styles from './VoteDetailPage.module.scss';
import { useParams } from 'react-router-dom';
import { GET_ELECTION_CANDIDATES, GET_VOTER, GET_ELECTION_TITLE } from '../../GraphQL/client.jsx';
import { useQuery } from '@apollo/client';
import { make_vote } from '../../Assets/index';
import { prepareContractCall } from 'thirdweb';
import { client, chain } from '../../Utils/constant.js';
import { abi } from '../../Utils/voteContract.js';
import { getContract } from "thirdweb";
import { TransactionButton, useActiveAccount } from "thirdweb/react";

const VotePage = () => {
    const [candidates, setCandidates] = useState([]);
    const [name, setName] = useState("");
    const [votedCandidate, setVotedCandidate] = useState(undefined);
    const { voteAddr } = useParams();
    const activeAccount = useActiveAccount();

    const CONTRACT = getContract({
        client: client,
        address: voteAddr,
        chain: chain,
        abi: abi,
    });

    // GraphQL queries
    const { data, loading, error, refetch } = useQuery(GET_ELECTION_CANDIDATES, {
        variables: { electionAddr: voteAddr || "" },
    });

    const { data: titleData } = useQuery(GET_ELECTION_TITLE, {
        variables: { electionAddr: voteAddr || "" },
    });
    // console.log(titleData?.newElections[0].owner)
    const { data: voterData } = useQuery(GET_VOTER, {
        variables: { voterAddr: activeAccount?.address || "", electionAddr: voteAddr || "" },
        skip: !activeAccount,
    });

    // Update candidates when data changes
    useEffect(() => {
        if (data && data.newCandidates) {
            const mappedCandidates = data.newCandidates.map(candidate => ({
                id: candidate.candidateId,
                name: candidate.name,
                description: candidate.electionId.title,
                votes: candidate.voteCount,
            }));
            setCandidates(mappedCandidates);
        }
    }, [data]);

    // Update voted candidate when voter data changes
    useEffect(() => {
        setVotedCandidate(voterData?.newVotes[0]?.candidateId?.candidateId);
    }, [voterData]);

    if (loading) return <p>Loading candidates...</p>;
    if (error) return <p>Error loading candidates: {error.message}</p>;
    return (
        <div className={styles.votePage}>
            <h1 className={styles.voteTitle}>
                {titleData ? titleData?.newElections[0].title : "Loading title..."}
            </h1>
            <h2>Vote for Your Candidate</h2>
            <div className={styles.candidatesList}>
                {candidates.map((candidate) => (
                    <div key={candidate.id} className={styles.candidateCard}>
                        <img src={make_vote} alt={candidate.name} className={styles.candidateImage} />
                        <h2>{candidate.name}</h2>
                        <p>{candidate.description}</p>
                        <TransactionButton
                            transaction={() =>
                                prepareContractCall({
                                    contract: CONTRACT,
                                    method: 'vote',
                                    params: [candidate.id],
                                })
                            }
                            className={`${styles.transactBtn} ${
                                votedCandidate === candidate.id ? styles.transactBtn__voted : styles.transactBtn__vote
                            } ${
                                voterData?.newVotes?.length !== 0 ? styles.transactBtn__notallow : styles.transactBtn__allow
                            }`}
                            onTransactionConfirmed={(tx) => {
                                alert("Vote successfully!");
                                console.log(tx);
                                refetch();
                            }}
                            disabled={voterData?.newVotes?.length !== 0}
                        >
                            {votedCandidate === candidate.id ? "Voted" : "Vote"}
                        </TransactionButton>
                        <p className={styles.voteCount}>Votes: {candidate.votes}</p>
                    </div>
                ))}
            </div>
            {titleData?.newElections[0]?.owner.toLowerCase()== activeAccount?.address.toLowerCase() && (
                <>
                    <h2>Add a New Candidate</h2>
                    <div className={styles.addCandidateForm}>
                        <input
                            type="text"
                            placeholder="Candidate Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.inputField}
                        />
                        <TransactionButton
                            transaction={() =>
                                prepareContractCall({
                                    contract: CONTRACT,
                                    method: 'addCandidate',
                                    params: [name, 1],
                                })
                            }
                            className={styles.transactBtn}
                            onTransactionConfirmed={(tx) => {
                                alert("Candidate added successfully!");
                                console.log(tx);
                                refetch();
                            }}
                        >
                            Add Candidate
                        </TransactionButton>
                    </div>
                </>
            )}
        </div>
    );
};

export default VotePage;
