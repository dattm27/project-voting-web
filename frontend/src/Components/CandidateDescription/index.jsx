import styles from './CandidateDescription.module.scss';

const DescriptionLabel = ({ description ,candidate}) => {
    return (
        <div className={styles.descriptionLabel}>
            <h2>{`${candidate.name} Info`}</h2>
            <pre>{description}</pre>
        </div>
    );
};

export default DescriptionLabel;
