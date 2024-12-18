import { Link } from "react-router-dom";
import { create_vote, make_vote, newsfeed_vote } from '../../Assets/index';

import styles from './HomePage.module.scss';

function HomePage() {

  return (
    <div className={styles['home-page']}>

      <h2 className={styles['home-page-title']}>Creating Voting With Us</h2>

      <div className={styles['card-container']}>
        <Link to="/create-vote">
          <div className={`${styles['home-container-card']} ${styles.glassmorphism} ${styles['w-border']}`}>
            <div className={styles['home-image-div']}>
              <img className={styles['home-image-card']} src={create_vote} alt="make_vote" />
            </div>
            <h2 className={`${styles['home-card-title']} ${styles['gradient-text']}`}>Create Vote</h2>
            <h4 className={styles['card-description']}>
              Start a poll to gather opinions and make decisions easier. Whether it’s for events, projects, or casual fun, get feedback instantly.
            </h4>
          </div>
        </Link>

        <Link to="/vote">
          <div className={`${styles['home-container-card']} ${styles.glassmorphism} ${styles['w-border']}`}>
            <div>
              <img className={styles['home-image-card']} src={make_vote} alt="newsfeed_vote" />
            </div>
            <h2 className={`${styles['home-card-title']} ${styles['gradient-text']}`}>Vote others</h2>
            <h4 className={styles['card-description']}>
              Join polls created by others and share your opinion. Help shape decisions that matter to you.
            </h4>
          </div>
        </Link>

        <Link to="/votes">
          <div className={`${styles['home-container-card']} ${styles.glassmorphism} ${styles['w-border']}`}>
            <div>
              <img className={styles['home-image-card']} src={newsfeed_vote} alt="create_vote" />
            </div>
            <h2 className={`${styles['home-card-title']} ${styles['gradient-text']}`}>Vote lists</h2>
            <h4 className={styles['card-description']}>
              Discover and follow ongoing and past polls. Stay engaged with what’s trending and see the results unfold.
            </h4>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
