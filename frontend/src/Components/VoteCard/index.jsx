import styles from './VoteCard.module.scss';
import { Link } from "react-router-dom";
import { vote_placeholder, vote_icon } from '../../Assets/index.js';

function VoteCard({election, backendElections}) {
    const isElectionEnded = (electionDue) => {
        return electionDue * 1000 < Date.now(); // Compare with current time in ms
    };
    return ( <div
        className={`${styles['vote-card']} ${isElectionEnded(election.electionDue) ? styles['disabled'] : ''}`}
    >
        <Link

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
    </div> );
}

export default VoteCard;