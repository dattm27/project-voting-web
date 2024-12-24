import styles from './CreateVote.module.scss';
import { useState } from 'react';
import { TransactionButton, useActiveAccount } from 'thirdweb/react';
import { CONTRACT } from '../../Utils/constant.js';
import { prepareContractCall } from 'thirdweb';
import { GET_NEW_VOTE } from '../../GraphQL/client.jsx';
import { useQuery } from '@apollo/client';
import { createRoutesFromChildren, useNavigate } from 'react-router-dom';
import { createElection } from '../../Services/serverServices.js';
import { uploadImageByFile } from '../../Services/CloudinaryServices.js';
import { ethers } from 'ethers';
import { contractABI } from '../../Utils/constant.js';
function CreateVote() {
    const [title, setTitle] = useState("");
    const [endDate, setEndDate] = useState(""); // State for end date and time
    const [description, setDescription] = useState(""); // State for description
    const [photo, setPhoto] = useState(null); // State for photo
    
    const activeAccount = useActiveAccount();
    const navigate = useNavigate();

    // Fetch election data using GraphQL query
    const { refetch } = useQuery(GET_NEW_VOTE, {
        variables: { owner: activeAccount?.address },
        skip: !activeAccount
    });

    // Function to handle fetching new election data and redirecting
    const handleGetElectionData = async () => {
        try {
            const { data } = await refetch();
            if (data && data.newElections.length > 0) {
                const electionAddress = data.newElections[0].electionAddr;
                console.log("Election Address:", electionAddress);

                // Redirect to the election address page
                navigate(`/vote/${electionAddress}`);
            } else {
                console.error("No election data found.");
                alert("No new election data found!");
            }
        } catch (error) {
            console.error("Failed to fetch updated data:", error);
            alert("Failed to fetch updated data.");
        }
    };

    // Calculate the time difference in seconds
    const calculateTimeInSeconds = () => {
        const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
        const endTimestamp = Math.floor(new Date(endDate).getTime() / 1000); // End date in seconds
        if (endTimestamp > currentTimestamp) {
            return endTimestamp - currentTimestamp; // Time difference in seconds
        }
        alert("End date must be in the future.");
        throw new Error("Invalid end date.");
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            console.log("File:", file);
            setPhoto(file); // Lưu file vào state
        } else {
            alert("Please upload a valid image file (JPEG or PNG).");
        }
    };

    const handleCreateElection = async (id) => {
        try{
            // const {data} = await refetch();
            // if(data && data.newElections.length > 0){
                // const electionId = data.newElections[0].electionId;
                const  electionId = id ;
                const {photoLink} = await uploadImageByFile(photo);
                console.log("Photo link:", photoLink);
                const election = {
                    id: electionId,
                    name: title,
                    description: description,
                    startDate: new Date().toISOString(),
                    endDate: new Date(endDate).toISOString(),
                    status: '1',
                    photoLink: photoLink,
                    walletAddress: activeAccount.address,
                };
                console.log("Election data:", election);

                const response = await createElection(election);
                console.log("Election created:", response);
            // }
        }
        catch(error){
            console.error('Error creating election:', error);
            throw error;
        }
    }

    return (
        <div className={styles.container}>
            <h1>Create your own vote</h1>

            {/* Input field for vote title */}
            <div className={styles.inputGroup}>
                <label htmlFor="title" className={styles.label}>Vote Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                    placeholder="Enter the title of your vote"
                />
            </div>

            {/* Input field for end date and time */}
            <div className={styles.inputGroup}>
                <label htmlFor="endDate" className={styles.label}>End Date and Time</label>
                <input
                    id="endDate"
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={styles.input}
                />
            </div>

            {/* Input field for vote description */}
            <div className={styles.inputGroup}>
                <label htmlFor="description" className={styles.label}>Description</label>
                <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.input}
                    placeholder="Enter the description of your vote"
                />
            </div>

            {/* File upload for photo */}
            <div className={styles.inputGroup}>
                <label htmlFor="photo" className={styles.label}>Upload Photo</label>
                <input
                    id="photo"
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleFileUpload}
                    className={styles.input}
                />
            </div>

            {/* Transaction button to create a new election */}
            <TransactionButton
                transaction={() =>
                    prepareContractCall({
                        contract: CONTRACT,
                        method: 'createElection',
                        params: [title, calculateTimeInSeconds()],
                    })
                }
                className={styles.transactBtn}
                onTransactionConfirmed={async (tx) => {
                    // console.log("Transaction confirmed:", tx);
                    //handleGetElectionData();    ---> khong can phai fetch lai toan bo du lieu nhu the
                    //lay luon id tu tx log (nhung da bi ma huy -> phai decode)
                  
                    try {
                        const logs = tx.logs;
                        // console.log ('log', logs);
                        //xac dinh event can decode tu abi
                        const abiInterface = new ethers.Interface(contractABI);
                        const event = abiInterface.getEvent("NewElection");
                        // console.log('event', event);
                        //lay ra event tu tx log
                        const eventLog = logs.find(log => log.topics[0] === event.topicHash);
                        if (!eventLog) {
                            throw new Error("Event 'NewElection' not found in logs");
                        }
                        // lay id, title, election Address ra tu event log
                        const {id, election}  = abiInterface.decodeEventLog(event, eventLog.data, eventLog.topics);
                        await handleCreateElection(id.toString());
                        alert("Vote created successfully!");
                        // Redirect to the election address page
                        navigate(`/vote/${election}`);
                       
                    }
                    catch (error){
                        console.log(error);
                    }
                    
                    
                    
                }}
                onTransactionFailed={(error) => {
                    console.error("Transaction failed:", error);
                    alert("Transaction failed. Please try again.");
                }}
            >
                Create Election
            </TransactionButton>
        </div>
    );
}

export default CreateVote;