import styles from './CandidateDescription.module.scss';

const DescriptionLabel = ({ description ,name}) => {
    return (
        <div className={styles.descriptionLabel}>
            <h2>{`${name} Info`}</h2>
            <p>{description}</p>
        </div>
    );
};

export default DescriptionLabel;
