import { useEffect, useState } from 'react';
import styles from './VoteCardSearch.module.scss';
import { Link } from "react-router-dom";
import { vote_placeholder, vote_candidate, vote_card } from '../../Assets/index.js';
import { GET_ELECTION_BY_ID } from '../../GraphQL/client.jsx';
import { useQuery } from '@apollo/client';

function VoteCardSearch({ backendElections }) {
    const [election, setElection] = useState(null);

    // Fetch election data
    const { data } = useQuery(GET_ELECTION_BY_ID, {
        variables: { electionId: backendElections?.id?.toString() || '' },
        skip: !backendElections?.id,
    });

    // Update the election state when data changes
    useEffect(() => {
        if (data?.newElections?.length > 0) {
            setElection(data.newElections[0]);
        }
    }, [data]);

    // Helper function to check if the election has ended
    const isElectionEnded = (electionEndTime) => electionEndTime * 1000 < Date.now();

    // Election properties
    const electionPhoto = backendElections?.photoLink || vote_placeholder;
    const electionEndDate = election?.electionEndTime
        ? `Vote end: ${new Date(election.electionEndTime * 1000).toLocaleString()}`
        : 'No end date available';

    return (
        <div
            className={`${styles['vote-card']} 
                ${election?.electionEndTime && isElectionEnded(election.electionEndTime) ? styles['disabled'] : ''} 
                ${election?.owner ? styles['owner'] : ''}`}
        >
            <Link
                to={`/vote/${election?.electionAddr}`}
                state={{ voteAddr: election?.electionAddr }}
                className={styles['vote-card__link']}
            ></Link>

            <img
                src={electionPhoto}
                alt="Election"
                className={styles['vote-card__image']}
            />

            <div className={styles['vote-card__text-wrapper']}>
                <h2 className={styles['vote-card__title']}>{election?.title || 'Election Title'}</h2>
                <div className={styles['vote-card__stat']}>
                    <div className={styles['vote-card__stat__ele']}>
                        <img src={vote_card} alt="Votes" />
                        <span>{election?.totalVotes || 0}</span>
                    </div>
                    <div className={styles['vote-card__stat__ele']}>
                        <img src={vote_candidate} alt="Candidates" />
                        <span>{election?.numOfCandidates || 0}</span>
                    </div>
                </div>
                <p className={styles['vote-card__due']}>{electionEndDate}</p>
            </div>
        </div>
    );
}

export default VoteCardSearch;
