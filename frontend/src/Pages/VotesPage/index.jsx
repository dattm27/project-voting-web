// import { useEffect, useState } from 'react';
// import { useQuery } from '@apollo/client';
// import styles from './VotesPage.module.scss';
// import { GET_ELECTIONS, GET_USER_ELECTIONS } from '../../GraphQL/client.jsx';
// import { Link } from "react-router-dom";
// import { useActiveAccount } from "thirdweb/react";
// import { vote_placeholder } from '../../Assets/index.js';
// import { getAllElections, getCandidateById, getElectionById } from '../../Services/serverServices.js';

// function VotesPage() {
//     const [filteredElectionData, setFilteredElectionData] = useState([]);
//     const [showUserElections, setShowUserElections] = useState(false);
//     const activeAccount = useActiveAccount();

//     // Query for all elections data
//     const { data: allElectionsData } = useQuery(GET_ELECTIONS);
//     console.log(allElectionsData);
//     //const backendElections = getAllElections();

//     // Query for user elections data only if activeAccount exists
//     const { data: userElectionsData } = useQuery(GET_USER_ELECTIONS, {
//         variables: { owner: activeAccount?.address || "" },
//         skip: !activeAccount, // Skip this query if there's no active account
//     });



//     useEffect(() => {
//         if (showUserElections && activeAccount && userElectionsData && userElectionsData.newElections) {
//             // Format user-specific elections data
//             const formattedData = userElectionsData.newElections.map((election) => ({
//                 title: election.title,
//                 owner: election.owner,
//                 id: election.electionId,
//                 totalVotes: election.totalVotes,
//                 electionAddr: election.electionAddr,


//             }));
//             setFilteredElectionData(formattedData);
//         } else if (!showUserElections && allElectionsData && allElectionsData.newElections) {
//             // Format all elections data
//             const formattedData = allElectionsData.newElections.map((election) => ({
//                 title: election.title,
//                 owner: election.owner,
//                 id: election.electionId,
//                 totalVotes: election.totalVotes,
//                 electionAddr: election.electionAddr,
//                 electionDue: election.electionEndTime
//             }));
//             setFilteredElectionData(formattedData);
//         }
//         if (!activeAccount) {
//             setShowUserElections(false);
//         }

//     }, [allElectionsData, userElectionsData, showUserElections, activeAccount]);

//     const toggleUserElections = () => {
//         setShowUserElections((prev) => !prev);
//     };

//     const [backendElections, setBackendElections] = useState([]);

//     useEffect(() => {
//         const fetchBackendElections = async () => {
//             const elections = await getAllElections();
//             console.log(elections);
//             const e = elections.find(e => Number(e.id) === 1);
//             console.log(e);
//             setBackendElections(elections);
//         };
//         fetchBackendElections();
//     }, []);

//     const displayedElections = filteredElectionData;
//     return (
//         <div className={styles['content-wrapper']}>
//             <div className={styles['toggle-container']}>
//                 <label className={styles['switch']}>
//                     <input
//                         type="checkbox"
//                         checked={showUserElections}
//                         onChange={toggleUserElections}
//                         disabled={!activeAccount} // Disable toggle if no active account
//                     />
//                     <span className={styles['slider']} />
//                 </label>
//                 <span>
//                     {showUserElections ? 'Show All Elections' : 'Show My Elections'}
//                 </span>
//             </div>
//             {displayedElections.length > 0 ? (
//                 displayedElections.map((election, index) => (
//                     <div className={styles['vote-card']} key={index}>
//                         <Link
//                             to={`/vote/${election.electionAddr}`}
//                             // to='/vote'
//                             state={{ voteAddr: election.electionAddr }}
//                             className={styles['vote-card__card-link']}></Link>
//                         <img
//                             src={
//                                 backendElections.find(e => Number(e.id) === Number(election.id))?.photoLink 
//                                 || vote_placeholder
//                             }
//                             alt="Election"
//                             className={styles['vote-card__image']}
//                         />
//                         <div className={styles['vote-card__text-wrapper']}>
//                             <h2 className={styles['vote-card__title']}>{election.title}</h2>
//                             <div className={styles['vote-card__total-votes']}>
//                                 {`Total votes: ${election.totalVotes}`}
//                             </div>
//                             <h3 className={styles['vote-card__election-due']}>
//                                 {`Vote end: ${new Date(election.electionDue * 1000).toISOString().replace('T', ' ').split('.')[0]}`}
//                             </h3>
//                             <h2 className={styles['vote-card__election-addr']}>
//                                 {`Vote address: ${election.address}`}
//                             </h2>

//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <h2>It looks like you haven&apos;t created any elections yet!</h2>
//             )}
//         </div>
//     );
// }

// export default VotesPage;
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import styles from './VotesPage.module.scss';
import { GET_ELECTIONS, GET_USER_ELECTIONS } from '../../GraphQL/client.jsx';
import { Link } from 'react-router-dom';
import { useActiveAccount } from 'thirdweb/react';
import { vote_placeholder } from '../../Assets/index.js';
import { getAllElections } from '../../Services/serverServices.js';

const VotesPage = () => {
    const [filteredElectionData, setFilteredElectionData] = useState([]);
    const [showUserElections, setShowUserElections] = useState(false);
    const [backendElections, setBackendElections] = useState([]);
    const activeAccount = useActiveAccount();

    // Fetch all elections
    const { data: allElectionsData } = useQuery(GET_ELECTIONS);

    // Fetch user-specific elections
    const { data: userElectionsData } = useQuery(GET_USER_ELECTIONS, {
        variables: { owner: activeAccount?.address || '' },
        skip: !activeAccount, // Skip if there's no active account
    });

    // Fetch backend elections
    useEffect(() => {
        const fetchBackendElections = async () => {
            try {
                const elections = await getAllElections();
                setBackendElections(elections);
            } catch (error) {
                console.error('Error fetching backend elections:', error);
            }
        };

        if (!backendElections.length) fetchBackendElections();
    }, [backendElections]);

    // Update filtered elections based on toggle state
    useEffect(() => {
        if (showUserElections && activeAccount && userElectionsData?.newElections) {
            const formattedData = userElectionsData.newElections.map((election) => ({
                title: election.title,
                owner: election.owner,
                id: election.electionId,
                totalVotes: election.totalVotes,
                electionAddr: election.electionAddr,
                electionDue: election.electionEndTime,
            }));
            setFilteredElectionData(formattedData);
        } else if (!showUserElections && allElectionsData?.newElections) {
            const formattedData = allElectionsData.newElections.map((election) => ({
                title: election.title,
                owner: election.owner,
                id: election.electionId,
                totalVotes: election.totalVotes,
                electionAddr: election.electionAddr,
                electionDue: election.electionEndTime,
            }));
            setFilteredElectionData(formattedData);
        }

        if (!activeAccount) setShowUserElections(false);
    }, [allElectionsData, userElectionsData, showUserElections, activeAccount]);

    const toggleUserElections = () => {
        if (!activeAccount) return;
        setShowUserElections((prev) => !prev);
    };

    // Helper function to get photo link
    const getPhotoLink = (electionId) => {
        const backendElection = backendElections.find(
            (e) => Number(e.id) === Number(electionId)
        );
        return backendElection?.photoLink || vote_placeholder;
    };

    // Helper function to format election due date
    const formatElectionDue = (electionDue) => {
        if (!electionDue) return 'No end time specified';
        return new Date(electionDue * 1000).toISOString().replace('T', ' ').split('.')[0];
    };

    return (
        <div className={styles['content-wrapper']}>
            <div className={styles['toggle-container']}>
                <label className={styles['switch']}>
                    <input
                        type="checkbox"
                        checked={showUserElections}
                        onChange={toggleUserElections}
                        disabled={!activeAccount} // Disable toggle if no active account
                    />
                    <span className={styles['slider']} />
                </label>
                <span>
                    {showUserElections ? 'Show All Elections' : 'Show My Elections'}
                </span>
            </div>

            {filteredElectionData.length > 0 ? (
                filteredElectionData.map((election) => (
                    <div className={styles['vote-card']} key={election.id}>
                        <Link
                            to={`/vote/${election.electionAddr}`}
                            state={{ voteAddr: election.electionAddr }}
                            className={styles['vote-card__card-link']}
                        />
                        <img
                            src={getPhotoLink(election.id)}
                            alt="Election"
                            className={styles['vote-card__image']}
                        />
                        <div className={styles['vote-card__text-wrapper']}>
                            <h2 className={styles['vote-card__title']}>{election.title}</h2>
                            <div className={styles['vote-card__total-votes']}>
                                {`Total votes: ${election.totalVotes}`}
                            </div>
                            <h3 className={styles['vote-card__election-due']}>
                                {`Vote end: ${formatElectionDue(election.electionDue)}`}
                            </h3>
                            <h2 className={styles['vote-card__election-addr']}>
                                {`Vote address: ${election.electionAddr}`}
                            </h2>
                        </div>
                    </div>
                ))
            ) : (
                <h2>
                    {allElectionsData || userElectionsData
                        ? 'No elections found.'
                        : 'Loading elections...'}
                </h2>
            )}
        </div>
    );
};

export default VotesPage;
