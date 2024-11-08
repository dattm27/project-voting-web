import { useState, useEffect } from 'react';
import styles from './VoteDetailPage.module.scss';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { make_vote, add_btn } from '../../Assets/index';
import { prepareContractCall } from 'thirdweb';
import { client, chain } from '../../Utils/constant.js';
import { abi } from '../../Utils/voteContract.js';
import { getContract } from 'thirdweb';
import { TransactionButton, useActiveAccount } from 'thirdweb/react';
import { GET_ELECTION_CANDIDATES, GET_VOTER, GET_ELECTION_TITLE } from '../../GraphQL/client.jsx';

const VoteDetailPage = () => {
    const { voteAddr } = useParams();
    const activeAccount = useActiveAccount();
    const [candidates, setCandidates] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const [votedCandidate, setVotedCandidate] = useState(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCandidate, setEditingCandidate] = useState({ id: '', name: '', description: '' });
    const [base64Image, setBase64Image] = useState('');

    const CONTRACT = getContract({ client, address: voteAddr, chain, abi });

    const { data, loading, error, refetch } = useQuery(GET_ELECTION_CANDIDATES, { variables: { electionAddr: voteAddr || '' } });
    const { data: titleData } = useQuery(GET_ELECTION_TITLE, { variables: { electionAddr: voteAddr || '' } });
    const { data: voterData } = useQuery(GET_VOTER, {
        variables: { voterAddr: activeAccount?.address || '', electionAddr: voteAddr || '' },
        skip: !activeAccount,
    });

    useEffect(() => {
        if (data?.newCandidates) {
            setCandidates(data.newCandidates.map(({ candidateId, name, voteCount }) => ({ id: candidateId, name, votes: voteCount })));
            setIsOwner(titleData?.newElections[0]?.owner.toLowerCase() === activeAccount?.address.toLowerCase());
        }
    }, [data, titleData, activeAccount]);

    useEffect(() => setVotedCandidate(voterData?.newVotes[0]?.candidateId?.candidateId), [voterData]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setBase64Image(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
        }
        console.log(base64Image);
    };

    const handleEditCandidate = (candidate) => {
        setEditingCandidate(candidate);
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditModalOpen(false);
        setEditingCandidate({ id: '', name: '', description: '' });
    };

    const renderModalContent = (isEdit = false) => (
        <div className={styles.modalContent}>
            <h2>{isEdit ? 'Edit Candidate' : 'Add New Candidate'}</h2>
            {isEdit && (
                <>
                    <label>ID:</label>
                    <input type="text" value={editingCandidate.id} disabled className={styles.inputField} />
                </>
            )}
            <label>Name:</label>
            <input
                type="text"
                placeholder="Candidate Name"
                value={editingCandidate.name}
                onChange={(e) => setEditingCandidate({ ...editingCandidate, name: e.target.value })}
                disabled={isEdit}
                className={styles.inputField}
            />
            <label>Description:</label>
            <textarea
                placeholder="Candidate Description"
                value={editingCandidate.description}
                onChange={(e) => setEditingCandidate({ ...editingCandidate, description: e.target.value })}
                className={styles.descriptionField}
            />
            <label>Avatar:</label>
            <input type="file" onChange={handleImageUpload} className={styles.imageUpload} />
            <div className={styles.btn_container}>
                <TransactionButton
                    transaction={() =>
                        prepareContractCall({
                            contract: CONTRACT,
                            method: isEdit ? 'updateCandidate' : 'addCandidate',
                            params: [editingCandidate.name, editingCandidate.description, 1],
                        })
                    }
                    onTransactionConfirmed={() => {
                        alert(isEdit ? 'Candidate updated successfully!' : 'Candidate added successfully!');
                        refetch();
                        handleCloseModal();
                    }}
                    className={styles.transactBtn}
                >
                    {isEdit ? 'Update Candidate' : 'Add Candidate'}
                </TransactionButton>
                <button onClick={handleCloseModal} className={styles.closeModalButton}>Close</button>
            </div>
        </div>
    );

    if (loading) return <p>Loading candidates...</p>;
    if (error) return <p>Error loading candidates: {error.message}</p>;

    return (
        <div className={styles.votePage}>
            <h1 className={styles.voteTitle}>{titleData?.newElections[0]?.title || 'Loading title...'}</h1>
            <h2>{isOwner ? 'Edit your vote' : (candidates.length ? 'Vote for Your Candidate' : 'No candidates added yet.')}</h2>
            <div className={styles.candidatesList}>
                {candidates.map((candidate) => (
                    <div key={candidate.id} className={styles.candidateCard}>
                        <img src={make_vote} alt={candidate.name} className={styles.candidateImage} />
                        <h2>{candidate.name}</h2>
                        <div className={styles.candidateCardBtns}>
                            {isOwner ? (
                                <button onClick={() => handleEditCandidate(candidate)} className={styles.editBtn}>Edit</button>
                            ) : (
                                <TransactionButton
                                    transaction={() => prepareContractCall({ contract: CONTRACT, method: 'vote', params: [candidate.id] })}
                                    onTransactionConfirmed={() => {
                                        alert('Vote successfully!');
                                        refetch();
                                    }}
                                    disabled={!!voterData?.newVotes?.length}
                                    className={`${styles.transactBtn} ${votedCandidate === candidate.id ? styles.transactBtn__voted : styles.transactBtn__vote}`}
                                >
                                    {votedCandidate === candidate.id ? 'Voted' : 'Vote'}
                                </TransactionButton>
                            )}
                        </div>
                        <p className={styles.voteCount}>Votes: {candidate.votes}</p>
                    </div>
                ))}
                {isOwner && (
                    <div className={styles.candidateCard}>
                        <img src={add_btn} alt="Add Candidate" className={`${styles.candidateImage} ${styles.addCardImg}`} />
                        <button onClick={() => setIsModalOpen(true)} className={styles.editButton}></button>
                    </div>
                )}
            </div>
            {(isModalOpen || isEditModalOpen) && (
                <div className={styles.modalOverlay}>{renderModalContent(isEditModalOpen)}</div>
            )}
        </div>
    );
};

export default VoteDetailPage;
