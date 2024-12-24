/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { TransactionButton } from 'thirdweb/react';
import { prepareContractCall } from 'thirdweb';
import styles from './AddCandidateForm.module.scss';
import {GET_ELECTION_BY_ADDR} from '../../GraphQL/client'
import { useQuery } from '@apollo/client';
import {createCandidate} from '../../Services/serverServices'
// import { brightness } from '@cloudinary/url-gen/actions/adjust';

const AddCandidateForm = ({ contract, onSuccess, onFailure ,voteAddr}) => {
    const [candidateName, setCandidateName] = useState("");
    const { data} = useQuery(GET_ELECTION_BY_ADDR, { variables: { electionAddr: voteAddr || '' } });

    const handleCandidateNameChange = (e) => {
        setCandidateName(e.target.value);
    }

    const handleCreateCandidate = async () => {
        try{
            if(data && data.newElections.length > 0){
                console.log(data)
                const electionId = data.newElections[0]['id']
                const candidate = {
                    id: data.newElections[0]['numOfCandidates']+1,
                    name: candidateName,
                    description: "",
                    birthDay:"2003-09-26T00:00:00.000Z",
                    roll:"",
                    votes:0,
                    electionId:electionId,
                    photoLink:""
                };
                console.log("Candidate data:", candidate);
                const response = await createCandidate(candidate);
                console.log("Election created:", response);
            }
        }
        catch(error){
            console.error('Error creating election:', error);
            throw error;
        }
    }

    const handleTransactionConfirmed = () => {
        handleCreateCandidate();
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
