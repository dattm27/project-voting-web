import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import styles from './VotesPage.module.scss';
import { GET_ELECTIONS, GET_USER_ELECTIONS } from '../../GraphQL/client.jsx';
import { Link } from "react-router-dom";
import { useActiveAccount } from "thirdweb/react";
import { vote_placeholder,vote_icon } from '../../Assets/index.js';
import { getAllElections } from '../../Services/serverServices.js';

function VotesPage() {
    const [filteredElectionData, setFilteredElectionData] = useState([]);
    const [showUserElections, setShowUserElections] = useState(false);
    const activeAccount = useActiveAccount();

    const { data: allElectionsData } = useQuery(GET_ELECTIONS);
    const { data: userElectionsData } = useQuery(GET_USER_ELECTIONS, {
        variables: { owner: activeAccount?.address || "" },
        skip: !activeAccount,
    });

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
        if (!activeAccount) {
            setShowUserElections(false);
        }
    }, [allElectionsData, userElectionsData, showUserElections, activeAccount]);

    const toggleUserElections = () => {
        setShowUserElections((prev) => !prev);
    };

    const [backendElections, setBackendElections] = useState([]);

    useEffect(() => {
        const fetchBackendElections = async () => {
            const elections = await getAllElections();
            setBackendElections(elections);
        };
        fetchBackendElections();
    }, []);

    // Function to check if the election has ended
    const isElectionEnded = (electionDue) => {
        return electionDue * 1000 < Date.now(); // Compare with current time in ms
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
                        disabled={!activeAccount}
                    />
                    <span className={styles['slider']} />
                </label>
                <span>
                    {showUserElections ? 'Show All Elections' : 'Show My Elections'}
                </span>
            </div>
            {displayedElections.length > 0 ? (
                displayedElections.map((election, index) => (
                    <div
                        key={index}
                        className={`${styles['vote-card']} ${isElectionEnded(election.electionDue) ? styles['disabled'] : ''}`}
                    >
                        <Link
                            key={index}
                            to={`/vote/${election.electionAddr}`}
                            state={{ voteAddr: election.electionAddr }}
                            className={styles['vote-card__link']}
                        ></Link>
                        <img
                            src={
                                backendElections.find(e => Number(e.id) === Number(election.id))?.photoLink
                                || vote_placeholder
                            }
                            alt="Election"
                            className={styles['vote-card__image']}
                        />
                        <div className={styles['vote-card__text-wrapper']}>
                            <h2 className={styles['vote-card__title']}>{election.title}</h2>
                            <div className={styles.votesLabel}>
                            <div className={styles.iconContainer}>
                                <img className={styles.votesIcon} src={vote_icon} alt="Votes" />
                            </div>
                            <p>Total votes: {election.totalVotes}</p>
                        </div>
                            <h3 className={styles['vote-card__election-due']}>
                                {election.electionDue
                                    ? `Vote end: ${new Date(election.electionDue * 1000).toISOString().replace('T', ' ').split('.')[0]}`
                                    : 'No end date available'}
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
