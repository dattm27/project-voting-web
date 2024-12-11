import styles from './VoteCard.module.scss';
import { Link } from "react-router-dom";
import { vote_placeholder, vote_icon } from '../../Assets/index.js';

function VoteCardSearch({election}) {
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
                election.photoLink
            }
            alt="Election"
            className={styles['vote-card__image']}
        />
        <div className={styles['vote-card__text-wrapper']}>
            <h2 className={styles['vote-card__title']}>{election.name}</h2>
            <div className={styles.votesLabel}>
                <div className={styles.iconContainer}>
                    <img className={styles.votesIcon} src={vote_icon} alt="Votes" />
                </div>
                <p>Total votes: {election.votes}</p>
            </div>
            <h3 className={styles['vote-card__election-due']}>
                {election.electionDue
                    ? `Vote end: ${election.electionDue}`
                    : 'No end date available'}
            </h3>
        </div>
    </div> );
}

export default VoteCardSearch;