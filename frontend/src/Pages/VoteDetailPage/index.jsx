// import { useState, useEffect } from 'react';
// import styles from './VoteDetailPage.module.scss';
// import { useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { make_vote, add_btn, vote_icon } from '../../Assets/index';
// import { prepareContractCall } from 'thirdweb';
// import { client, chain } from '../../Utils/constant.js';
// import { abi } from '../../Utils/voteContract.js';
// import { getContract } from 'thirdweb';
// import { TransactionButton, useActiveAccount } from 'thirdweb/react';
// import { GET_ELECTION_CANDIDATES, GET_VOTER, GET_ELECTION_TITLE } from '../../GraphQL/client.jsx';
// import Modal from '../../Components/Modal'
// import AddCandidateForm from '../../Components/AddCandidateForm'
// import EditCandidateForm from '../../Components/EditCandidateForm'
// import CandidateDescription from '../../Components/CandidateDescription'
// import {getElectionById,getAllCandidates,createCandidate} from '../../Services/serverServices.js';

// const VoteDetailPage = () => {
//     const { voteAddr } = useParams();
//     const activeAccount = useActiveAccount();
//     const [candidates, setCandidates] = useState([]);
//     const [isOwner, setIsOwner] = useState(false);
//     const [votedCandidate, setVotedCandidate] = useState(undefined);
//     const [isModalAddOpen, setIsModalAddOpen] = useState(false);
//     const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
//     const [isModalEditOpen, setIsModalEditOpen] = useState(false);
//     const [editingCandiateName, setEditingCandiateName] = useState('')
//     const [backendCandidates, setBackendCandidates] = useState([])
//     const CONTRACT = getContract({ client, address: voteAddr, chain, abi });

//     const { data, loading, error, refetch } = useQuery(GET_ELECTION_CANDIDATES, { variables: { electionAddr: voteAddr || '' } });
//     const { data: titleData } = useQuery(GET_ELECTION_TITLE, { variables: { electionAddr: voteAddr || '' } });
//     const { data: voterData } = useQuery(GET_VOTER, {
//         variables: { voterAddr: activeAccount?.address || '', electionAddr: voteAddr || '' },
//         skip: !activeAccount,
//     });

//     useEffect(() => {
//         if (data?.newCandidates) {
//             setCandidates(data.newCandidates.map(({ candidateId, name, voteCount }) => ({ id: candidateId, name, votes: voteCount })));
//             setIsOwner(titleData?.newElections[0]?.owner.toLowerCase() === activeAccount?.address.toLowerCase());
//         }
//     }, [data, titleData, activeAccount]);

//     useEffect(() => setVotedCandidate(voterData?.newVotes[0]?.candidateId?.candidateId), [voterData]);

//     useEffect(() => {
//         async function fetchCandidates() {
//             if (data?.newCandidates?.length > 0) {
//                 const election = await getElectionById(data.newCandidates[0].electionId.id);
//                 console.log(election)
//                 const candidates = election.candidates;
//                 setBackendCandidates(candidates);
//             }
//         }
//         fetchCandidates();
//     }, [data]);


//     const handleCloseAddModal = () => setIsModalAddOpen(false);
//     const handleCloseEditModal = () => setIsModalEditOpen(false);
//     const handleCloseInfoModal = () => setIsModalInfoOpen(false);

//     const handleRefetch = () => {
//         refetch();
//         handleCloseAddModal();
//         handleCloseEditModal();
//         handleCloseInfoModal();
//     };

//     if (loading) return <p>Loading candidates...</p>;
//     if (error) return <p>Error loading candidates: {error.message}</p>;

//     return (
//         <div className={styles.votePage}>
//             <h1 className={styles.voteTitle}>{titleData?.newElections[0]?.title || 'Loading title...'}</h1>
//             <h2>{isOwner ? 'Edit your vote' : (candidates.length ? 'Vote for Your Candidate' : 'No candidates added yet.')}</h2>
//             <div className={styles.candidatesList}>
//                 {candidates.map((candidate) => (
//                     <div key={candidate.id} className={styles.candidateCard}>
//                         <img src={
//                             backendCandidates.find(c => c.id == candidate.id)?.photoLink || make_vote
//                             //make_vote
//                         } alt={candidate.name} className={styles.candidateImage} />
//                         <h2>{candidate.name}</h2>
//                         <div className={styles.candidateCardBtns}>
//                             {isOwner ? (
//                                 <button
//                                     onClick={() => {
//                                         setEditingCandiateName(candidate.name)
//                                         setIsModalEditOpen(true)
//                                     }}
//                                     className={styles.editBtn}
//                                 >Edit</button>
//                             ) : (
//                                 <div className={styles.buttonContainer}>
//                                     <TransactionButton
//                                         transaction={() => prepareContractCall({ contract: CONTRACT, method: 'vote', params: [candidate.id] })}
//                                         onTransactionConfirmed={() => {
//                                             alert('Vote successfully!');
//                                             refetch();
//                                         }}
//                                         disabled={!!voterData?.newVotes?.length}
//                                         className={`${styles.transactBtn} ${votedCandidate === candidate.id ? styles.transactBtn__voted : styles.transactBtn__vote}`}
//                                     >
//                                         {votedCandidate === candidate.id ? 'Voted' : 'Vote'}
//                                     </TransactionButton>
//                                     <button 
//                                         onClick={() => {
//                                             setEditingCandiateName(candidate.name)
//                                             setIsModalInfoOpen(true)
//                                         }}
//                                         className={styles.editBtn}
//                                     >More info</button>
//                                 </div>

//                             )}
//                         </div>
//                         <div className={styles.votesLabel}>
//                             <div className={styles.iconContainer}>
//                                 <img className={styles.votesIcon} src={vote_icon} alt='hihi'></img>
//                             </div>
//                             <p >
//                                 Votes: {candidate.votes}
//                             </p>
//                         </div>
//                     </div>
//                 ))}
//                 {isOwner && (
//                     <div className={styles.candidateCard}>
//                         <img src={add_btn} alt="Add Candidate" className={`${styles.candidateImage} ${styles.addCardImg}`} />
//                         <button onClick={() => setIsModalAddOpen(true)} className={styles.addCandiateBtn}></button>
//                     </div>
//                 )}
//             </div>
//             <Modal isOpen={isModalAddOpen} onClose={handleCloseAddModal}>
//                 <AddCandidateForm
//                     contract={CONTRACT}
//                     onSuccess={handleRefetch}
//                 />
//             </Modal>
//             <Modal isOpen={isModalEditOpen} onClose={handleCloseEditModal}>
//                 <EditCandidateForm
//                     onSuccess={handleRefetch}
//                     candidateName={editingCandiateName}
//                 />
//             </Modal>
//             <Modal isOpen={isModalInfoOpen} onClose={handleCloseInfoModal}>
//                 <CandidateDescription 
//                 name={editingCandiateName}
//                 description={`What is Lorem Ipsumors on the Internet tend to c words etc.`}/>
//             </Modal>
//         </div>
//     );
// };

// export default VoteDetailPage;
import { useState, useEffect } from 'react';
import styles from './VoteDetailPage.module.scss';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { add_btn, vote_icon, vote_placeholder } from '../../Assets/index';
import { prepareContractCall } from 'thirdweb';
import { client, chain } from '../../Utils/constant.js';
import { abi } from '../../Utils/voteContract.js';
import { getContract } from 'thirdweb';
import { TransactionButton, useActiveAccount } from 'thirdweb/react';
import { GET_ELECTION_CANDIDATES, GET_VOTER, GET_ELECTION_DATA } from '../../GraphQL/client.jsx';
import Modal from '../../Components/Modal';
import AddCandidateForm from '../../Components/AddCandidateForm';
import EditCandidateForm from '../../Components/EditCandidateForm';
import CandidateDescription from '../../Components/CandidateDescription';
import { getElectionById,updateElection} from '../../Services/serverServices.js';
import {uploadImageByFile} from '../../Services/CloudinaryServices.js'

const VoteDetailPage = () => {
    const { voteAddr } = useParams();
    const activeAccount = useActiveAccount();
    const [candidates, setCandidates] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const [votedCandidate, setVotedCandidate] = useState(undefined);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [editingCandidateName, setEditingCandidateName] = useState('');
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
            setCandidates(data.newCandidates.map(({ candidateId, name, voteCount }) => ({ id: candidateId, name, votes: voteCount })));
            setIsOwner(electionData?.newElections[0]?.owner.toLowerCase() === activeAccount?.address.toLowerCase());
        }
    }, [data, electionData, activeAccount]);

    const handleGetElectionData = async (id) => {
        try {
            const res = await getElectionById(id);
            console.log(res)
            setElectionDataBe(res)
        }
        catch (error) {
            console.error('Error creating election:', error);
            throw error;
        }
    }

    useEffect(() => {
        if (electionData?.newElections[0]?.id)

            handleGetElectionData(electionData?.newElections[0]?.id);
    }, [electionData])

    useEffect(() => {
        setVotedCandidate(voterData?.newVotes[0]?.candidateId?.candidateId);
    }, [voterData]);

    // Modal close handlers
    const handleCloseAddModal = () => setIsModalAddOpen(false);
    const handleCloseEditModal = () => setIsModalEditOpen(false);
    const handleCloseInfoModal = () => setIsModalInfoOpen(false);

    // Refetch logic after successful mutation
    const handleRefetch = () => {
        refetch();
        handleCloseAddModal();
        handleCloseEditModal();
        handleCloseInfoModal();
    };

    // Loading and error handling
    if (loading) return <p>Loading candidates...</p>;
    if (error) return <p>Error loading candidates: {error.message}</p>;

    return (
        <div className={styles.votePage}>
            <h1 className={styles.voteTitle}>{electionData?.newElections[0]?.title || 'Loading title...'}</h1>
            <h2>{isOwner ? 'Edit your vote' : (candidates.length ? 'Vote for Your Candidate' : 'No candidates added yet.')}</h2>

            <div className={styles.candidatesList}>
                <div className={styles.electionCard}>
                    <img
                        className={styles.electionImage}
                        src={electionDataBe?.photoLink ? electionDataBe.photoLink : vote_placeholder}

                    />
                    {/* {isOwner && (<buttton className={styles.editImageBtn}>Edit</buttton>)}
                     */}
                    {isOwner && (
                        <>
                            <button
                                className={styles.editImageBtn}
                                onClick={() => document.getElementById('imageInput').click()}
                            >
                                Edit
                            </button>
                            <input
                                id="imageInput"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        console.log("Selected Image:", file);
                                        const {photoLink} = await uploadImageByFile(file);
                                        const res = await updateElection(electionData?.newElections[0]?.id,{
                                            photoLink: photoLink
                                        })
                                        console.log(res)
                                    }
                                }}
                            />
                        </>
                    )}
                </div>
                {candidates.map((candidate) => (
                    <div key={candidate.id} className={styles.candidateCard}>
                        <img
                            src={candidate.photoLink || vote_placeholder}
                            alt={candidate.name}
                            className={styles.candidateImage}
                        />

                        <h2>{candidate.name}</h2>
                        <div className={styles.candidateCardBtns}>
                            {isOwner ? (
                                <button
                                    onClick={() => {
                                        setEditingCandidateName(candidate.name);
                                        setIsModalEditOpen(true);
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
                                        className={`${styles.transactBtn} ${votedCandidate === candidate.id ? styles.transactBtn__voted : styles.transactBtn__vote}`}
                                    >
                                        {votedCandidate === candidate.id ? 'Voted' : 'Vote'}
                                    </TransactionButton>
                                    <button
                                        onClick={() => {
                                            setEditingCandidateName(candidate.name);
                                            setIsModalInfoOpen(true);
                                        }}
                                        className={styles.editBtn}
                                    >
                                        More info
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className={styles.votesLabel}>
                            <div className={styles.iconContainer}>
                                <img className={styles.votesIcon} src={vote_icon} alt="Votes" />
                            </div>
                            <p>Votes: {candidate.votes}</p>
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
            <Modal isOpen={isModalEditOpen} onClose={handleCloseEditModal}>
                <EditCandidateForm onSuccess={handleRefetch} candidateName={editingCandidateName} />
            </Modal>
            <Modal isOpen={isModalInfoOpen} onClose={handleCloseInfoModal}>
                <CandidateDescription name={editingCandidateName} description="What is Lorem Ipsumors on the Internet tend to c words etc." />
            </Modal>
        </div>
    );
};

export default VoteDetailPage;
