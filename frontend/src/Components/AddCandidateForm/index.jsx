/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { TransactionButton } from 'thirdweb/react';
import { prepareContractCall } from 'thirdweb';
import styles from './AddCandidateForm.module.scss';

const AddCandidateForm = ({ contract, onSuccess, onFailure }) => {
    const [candidateName, setCandidateName] = useState("");

    const handleCandidateNameChange = (e) => setCandidateName(e.target.value);

    const handleTransactionConfirmed = () => {
        alert('Candidate added successfully!');
        setCandidateName(""); // Clear input field after successful transaction
        onSuccess(); // Notify parent to refetch data or close modal
    };

    const handleTransactionFailed = (error) => {
        console.error('Transaction failed:', error);
        alert('Failed to add candidate.');
        onFailure && onFailure(); // Optional failure handling
    };

    return (
        <div>
            <h2 className={styles.title}>Add New Candidate</h2>
            <input
                type="text"
                placeholder="Candidate Name"
                value={candidateName}
                onChange={handleCandidateNameChange}
                className={styles.inputField}
            />
            <TransactionButton
                transaction={() =>
                    prepareContractCall({
                        contract: contract,
                        method: 'addCandidate',
                        params: [candidateName,1],
                    })
                }
                onTransactionConfirmed={handleTransactionConfirmed}
                onTransactionFailed={handleTransactionFailed}
                className={styles.addBtn}
            >
                Add Candidate
            </TransactionButton>
        </div>
    );
};

export default AddCandidateForm;
