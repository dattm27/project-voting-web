// VoteDetailPage.jsx
import { useState, useEffect } from 'react';
import styles from './VoteDetailPage.module.scss';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { add_btn, vote_card, vote_placeholder } from '../../Assets/index';
import { prepareContractCall } from 'thirdweb';
import { client, chain } from '../../Utils/constant.js';
import { abi } from '../../Utils/voteContract.js';
import { getContract } from 'thirdweb';
import { TransactionButton, useActiveAccount } from 'thirdweb/react';
import { GET_ELECTION_CANDIDATES, GET_VOTER, GET_ELECTION_DATA } from '../../GraphQL/client.jsx';
import Modal from '../../Components/Modal';
import AddCandidateForm from '../../Components/AddCandidateForm';
import EditCandidateForm from '../../Components/EditCandidateForm';
import EditElectionForm from '../../Components/EditElectionForm';
import CandidateDescription from '../../Components/CandidateDescription';
import { getElectionById } from '../../Services/serverServices.js';

const VoteDetailPage = () => {
    const { voteAddr } = useParams();
    const activeAccount = useActiveAccount();
    const [candidates, setCandidates] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const [votedCandidate, setVotedCandidate] = useState(undefined);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
    const [isModalEditCandidateOpen, setIsModalEditCandidateOpen] = useState(false);
    const [isModalEditElectionOpen, setIsModalEditElectionOpen] = useState(false);
    const [editingCandidate, setEditingCandidate] = useState(undefined);
    const [electionDataBe, setElectionDataBe] = useState({});


    const CONTRACT = getContract({ client, address: voteAddr, chain, abi });

    const { data, loading, error, refetch } = useQuery(GET_ELECTION_CANDIDATES, { variables: { electionAddr: voteAddr || '' } });
    const { data: electionData } = useQuery(GET_ELECTION_DATA, { variables: { electionAddr: voteAddr || '' } });
    const { data: voterData } = useQuery(GET_VOTER, {
        variables: { voterAddr: activeAccount?.address || '', electionAddr: voteAddr || '' },
        skip: !activeAccount,
    });

    // Effect to handle candidates and ownership logic
    useEffect(() => {
        if (data?.newCandidates) {
            setCandidates(data.newCandidates.map(({ candidateId, name, voteCount }) => ({ id: candidateId, name: name, votes: voteCount })));
            setIsOwner(electionData?.newElections[0]?.owner.toLowerCase() === activeAccount?.address.toLowerCase());
        }
    }, [data, electionData, activeAccount]);

    const handleGetElectionData = async (id) => {
        try {

            let res = await getElectionById(id);
            setElectionDataBe(res);
        } catch (error) {
            console.error('Error fetching election data:', error);
        }
    };


    useEffect(() => setVotedCandidate(voterData?.newVotes[0]?.candidateId?.candidateId), [voterData]);

    useEffect(() => {
        if (electionData?.newElections[0]?.id) handleGetElectionData(electionData?.newElections[0]?.id);
    }, [electionData]);

    // Modal close handlers
    const handleCloseAddModal = () => setIsModalAddOpen(false);
    const handleCloseEditCandidateModal = () => setIsModalEditCandidateOpen(false);
    const handleCloseEditElectionModal = () => setIsModalEditElectionOpen(false);
    const handleCloseInfoModal = () => setIsModalInfoOpen(false);

    // Refetch logic after successful mutation
    const handleRefetch = async () => {
        try {
            // Close all modals
            handleCloseAddModal();
            handleCloseEditCandidateModal();
            handleCloseEditElectionModal();
            handleCloseInfoModal();

            // Refetch Apollo query data
            await refetch(); // Refetch candidates from GET_ELECTION_CANDIDATES

            // Refetch backend data for the election
            if (electionData?.newElections[0]?.id) {
                await handleGetElectionData(electionData?.newElections[0]?.id);
            }
        } catch (error) {
            console.error('Error refetching data:', error);
        }
    };

    // Loading and error handling
    if (loading) return <p>Loading candidates...</p>;
    if (error) return <p>Error loading candidates: {error.message}</p>;

    return (
        <div className={styles.votePage}>
            <h1 className={styles.voteTitle}>{electionData?.newElections[0]?.title.toUpperCase() || 'Loading title...'}</h1>

            <div className={styles.voteHeading}>

                <div className={`${styles.electionPoster}`}>
                    <img
                        className={styles.electionImage}
                        src={electionDataBe?.photoLink || vote_placeholder} // Use tempPhotoLink if available
                        alt="Election"
                    />
                    {isOwner && (
                        <>
                            <button
                                className={styles.editImageBtn}
                                onClick={() => { setIsModalEditElectionOpen(true); }}
                            >
                                Edit
                            </button>

                        </>
                    )}
                </div>
                <div className={styles.electionDes}>
                    <h2>{`ABOUT ${electionDataBe?.name?.toUpperCase()}`}</h2>
                    {/* <p>{`${electionDataBe?.description}`}</p>
                     */}
                    <pre>{electionDataBe?.description}</pre>
                </div>
            </div>
            <h2>{isOwner ? 'Edit your vote' : (candidates.length ? 'Vote for Your Candidate' : 'No candidates added yet.')}</h2>
            <div className={styles.candidatesList}>

                {/* Render candidates */}
                {candidates.map((candidate) => (
                    <div key={candidate.id} className={styles.candidateCard}>
                        <img
                            src={electionDataBe?.candidates?.find(
                                (c) => c.id === parseInt(candidate.id)
                            )?.photoLink || vote_placeholder}
                            alt={candidate.name}
                            className={styles.candidateImage}
                        />
                        <h2>{candidate.name}</h2>
                        <div className={styles.candidateCardBtns}>
                            {isOwner ? (
                                <button
                                    onClick={() => {
                                        setEditingCandidate(candidate);
                                        setIsModalEditCandidateOpen(true);
                                    }}
                                    className={styles.editBtn}
                                >
                                    Edit
                                </button>
                            ) : (
                                <div className={styles.buttonContainer}>
                                    <TransactionButton
                                        transaction={() => prepareContractCall({ contract: CONTRACT, method: 'vote', params: [candidate.id] })}
                                        onTransactionConfirmed={() => {
                                            alert('Vote successfully!');
                                            refetch();
                                        }}
                                        disabled={!!voterData?.newVotes?.length}
                                        onError={(error) => {
                                            console.error('Transaction error', error);
                                            alert(error.message);
                                        }}
                                        className={`${styles.transactBtn} ${votedCandidate === candidate.id ? styles.transactBtn__voted : styles.transactBtn__vote}`}
                                    >
                                        {votedCandidate === candidate.id ? 'Voted' : 'Vote'}
                                    </TransactionButton>
                                    <button
                                        onClick={() => {
                                            setEditingCandidate(candidate);
                                            setIsModalInfoOpen(true);
                                        }}
                                        className={styles.editBtn}
                                    >
                                        More info
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className={styles['total_vote']}>
                            <img src={vote_card}></img>
                            <span>{candidate.votes}</span>
                        </div>
                    </div>
                ))}

                {isOwner && (
                    <div className={styles.candidateCard}>
                        <img src={add_btn} alt="Add Candidate" className={`${styles.candidateImage} ${styles.addCardImg}`} />
                        <button onClick={() => setIsModalAddOpen(true)} className={styles.addCandiateBtn}></button>
                    </div>
                )}
            </div>
            <Modal isOpen={isModalAddOpen} onClose={handleCloseAddModal}>
                <AddCandidateForm contract={CONTRACT} voteAddr={voteAddr} onSuccess={handleRefetch} />
            </Modal>
            <Modal isOpen={isModalEditCandidateOpen} onClose={handleCloseEditCandidateModal}>
                <EditCandidateForm onSuccess={handleRefetch} candidate={editingCandidate} electionId={electionData?.newElections[0]?.id} descript={electionDataBe?.candidates?.find((c) => c.id == (editingCandidate?.id))?.description} />
            </Modal>
            <Modal isOpen={isModalEditElectionOpen} onClose={handleCloseEditElectionModal}>
                <EditElectionForm onSuccess={handleRefetch} election={electionDataBe} />
            </Modal>
            <Modal isOpen={isModalInfoOpen} onClose={handleCloseInfoModal}>
                <CandidateDescription candidate={editingCandidate} description={electionDataBe?.candidates?.find((c) => c.id == (editingCandidate?.id))?.description} />
            </Modal>
        </div>
    );
};

export default VoteDetailPage;
