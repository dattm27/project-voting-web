import styles from './CandidateDescription.module.scss';

const DescriptionLabel = ({ description ,candidate}) => {
    return (
        <div className={styles.descriptionLabel}>
            <h2>{`${candidate.name} Info`}</h2>
            <p>{description}</p>
        </div>
    );
};

export default DescriptionLabel;
