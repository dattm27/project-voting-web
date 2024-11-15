import { TransactionButton } from "thirdweb/react";
import styles from './CandidateCard.module.scss'
import { make_vote } from "../../Assets";
import { prepareContractCall } from 'thirdweb';

const CandidateCard = (candidate, isOwner, votedCandidate, CONTRACT, openEditModal, refetch) => (
    <div className={styles.candidateCard}>
        <img src={make_vote} alt={candidate.name} className={styles.candidateImage} />
        <h2>{candidate.name}</h2>
        <div className={styles.candidateCardBtns}>
            {!isOwner ? (
                <TransactionButton
                    transaction={() => prepareContractCall({ contract: CONTRACT, method: 'vote', params: [candidate.id] })}
                    // className={/* styling classes here */}
                    onTransactionConfirmed={(tx) => {
                        alert("Vote successfully!");
                        console.log(tx);
                        refetch();
                    }}
                    disabled={votedCandidate === candidate.id}
                >
                    {votedCandidate === candidate.id ? "Voted" : "Vote"}
                </TransactionButton>
            ) : (
                <button onClick={() => openEditModal(candidate.id)}>Edit</button>
            )}
        </div>
        <p>Votes: {candidate.votes}</p>
    </div>
);

export default CandidateCard;
