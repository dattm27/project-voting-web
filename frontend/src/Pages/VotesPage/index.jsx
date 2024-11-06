import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import styles from './VotesPage.module.scss';
import { GET_ELECTIONS, GET_USER_ELECTIONS } from '../../GraphQL/client.jsx';
import { Link } from "react-router-dom";
import { useActiveAccount } from "thirdweb/react";

function VotesPage() {
    const [filteredElectionData, setFilteredElectionData] = useState([]);
    const [showUserElections, setShowUserElections] = useState(false);
    const activeAccount = useActiveAccount();

    // Query for all elections data
    const { data: allElectionsData } = useQuery(GET_ELECTIONS);

    // Query for user elections data only if activeAccount exists
    const { data: userElectionsData } = useQuery(GET_USER_ELECTIONS, {
        variables: { owner: activeAccount?.address || "" },
        skip: !activeAccount, // Skip this query if there's no active account
    });



    useEffect(() => {
        if (showUserElections && activeAccount && userElectionsData && userElectionsData.newElections) {
            // Format user-specific elections data
            const formattedData = userElectionsData.newElections.map((election) => ({
                title: election.title,
                owner: election.owner,
                id: election.electionId,
                totalVotes: election.totalVotes,
                electionAddr: election.electionAddr,


            }));
            setFilteredElectionData(formattedData);
        } else if (!showUserElections && allElectionsData && allElectionsData.newElections) {
            // Format all elections data
            const formattedData = allElectionsData.newElections.map((election) => ({
                title: election.title,
                owner: election.owner,
                id: election.electionId,
                totalVotes: election.totalVotes,
                electionAddr: election.electionAddr,

            }));
            setFilteredElectionData(formattedData);
        }
        if (!activeAccount) {
            setShowUserElections(false);
        }
    }, [allElectionsData, userElectionsData, showUserElections, activeAccount]);

    const toggleUserElections = () => {
        setShowUserElections((prev) => !prev);
    };

    const displayedElections = filteredElectionData;

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
            {displayedElections.length > 0 ? (
                displayedElections.map((election, index) => (
                    <div className={styles['vote-card']} key={index}>
                        <Link
                            to={`/vote/${election.electionAddr}`}
                            // to='/vote'
                            state={{ voteAddr: election.electionAddr }}
                            className={styles['vote-card__card-link']}></Link>
                        <img
                            src="https://images.unsplash.com/photo-1730248202596-fbdef5624120?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Election"
                            className={styles['vote-card__image']}
                        />
                        <div className={styles['vote-card__text-wrapper']}>
                            <h2 className={styles['vote-card__title']}>{election.title}</h2>
                            <div className={styles['vote-card__total-votes']}>
                                {`Total votes: ${election.totalVotes}`}
                            </div>
                            <h3 className={styles['vote-card__election-addr']}>
                                {`Contract address: ${election.electionAddr}`}
                            </h3>
                        </div>
                    </div>
                ))
            ) : (
                <h2>It looks like you haven&apos;t created any elections yet!</h2>
            )}
        </div>
    );
}

export default VotesPage;
