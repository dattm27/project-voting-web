import { useState } from 'react';
import { useReadContract, TransactionButton } from 'thirdweb/react';
import { CONTRACT } from '../../Utils/constant.js';
import { prepareContractCall } from 'thirdweb';

function TestPage() {
    // State for the input fields
    const [title, setTitle] = useState("Test Election");
    const [owner, setOwner] = useState("0xbfa625b92390EFA48e77433De502135b844adbB0");

    const { data: count, isLoading: loadingCount } = useReadContract({
        contract: CONTRACT,
        method: 'electionCreated',
    });

    return (
        <div>
            {loadingCount ? <h1>Loading...</h1> : <h1>Current elections count: {Number(count)}</h1>}

            {/* Input field for title */}
            <div>
                <label htmlFor="title">Election Title:</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // Update state on input change
                />
            </div>

            {/* Input field for owner */}
            <div>
                <label htmlFor="owner">Owner Address:</label>
                <input
                    id="owner"
                    type="text"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)} // Update state on input change
                />
            </div>

            <TransactionButton
                transaction={() =>
                    prepareContractCall({
                        contract: CONTRACT,
                        method: 'createElection',
                        params: [title, owner], // Using state variables for arguments
                    })
                }
                onTransactionConfirmed={(tx) => {
                    alert("Transaction sent!");
                    console.log(tx);
                    // Add custom logic, like a toast notification or redirection
                }}
            >
                Create Election
            </TransactionButton>
        </div>
    );
}

export default TestPage;
