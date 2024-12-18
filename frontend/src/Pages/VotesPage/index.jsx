import Masonry from 'react-masonry-css';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import styles from './VotesPage.module.scss';
import { GET_ELECTIONS, GET_USER_ELECTIONS } from '../../GraphQL/client.jsx';

import { useActiveAccount } from "thirdweb/react";

import { getAllElections } from '../../Services/serverServices.js';
import VoteCard from '../../Components/VoteCard'

function VotesPage() {
    const [filteredElectionData, setFilteredElectionData] = useState([]);
    const [showUserElections, setShowUserElections] = useState(false);
    const activeAccount = useActiveAccount();

    const { data: allElectionsData } = useQuery(GET_ELECTIONS);
    const { data: userElectionsData } = useQuery(GET_USER_ELECTIONS, {
        variables: { owner: activeAccount?.address || "" },
        skip: !activeAccount,
    });

    const [backendElections, setBackendElections] = useState([]);

    useEffect(() => {
        const fetchBackendElections = async () => {
            const elections = await getAllElections();
            setBackendElections(elections);
        };
        fetchBackendElections();
    }, []);

    useEffect(() => {
        if (showUserElections && activeAccount && userElectionsData?.newElections) {
            const formattedData = userElectionsData.newElections.map((election) => ({
                title: election.title,
                owner: election.owner,
                id: election.electionId,
                totalVotes: election.totalVotes,
                electionAddr: election.electionAddr,
                electionDue: election.electionEndTime,
                numOfCandidates: election.numOfCandidates,
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
                numOfCandidates: election.numOfCandidates,
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

    // Breakpoints for masonry layout
    const breakpointColumns = {
        default: 3, // 3 columns for larger screens
        768: 2, // 2 columns for tablets
        576: 1, // 1 column for smaller screens
    };

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
                <Masonry
                    breakpointCols={breakpointColumns}
                    className={styles['masonry-grid']}
                    columnClassName={styles['masonry-column']}
                >
                    {displayedElections.map((election, index) => (
                        <VoteCard election={election} backendElections={backendElections} key={index}/>
                    ))}
                </Masonry>
            ) : (
                <h2>It looks like you haven&apos;t created any elections yet!</h2>
            )}
        </div>
    );
}

export default VotesPage;
