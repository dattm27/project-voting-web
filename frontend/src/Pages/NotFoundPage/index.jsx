import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss'; // Custom styles

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>404 - Page Not Found</h1>
      <p className={styles.message}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className={styles.backButton}>
        Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
