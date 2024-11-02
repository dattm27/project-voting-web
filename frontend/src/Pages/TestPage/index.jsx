import {useReadContract } from 'thirdweb/react';
import { CONTRACT } from '../../Utils/constant.js';
// import { prepareContractCall } from 'thirdweb';

function TestPage() {
  // Example parameters to pass to the contract
//   const title = "Test Election";
//   const owner = "0xbfa625b92390EFA48e77433De502135b844adbB0";
  const {data: count,isLoading: loadingCount} = useReadContract({
    contract:CONTRACT,
    method: 'electionCreated',
  })
console.log(Number(count));

  return (
    <div>
        {loadingCount?<h1>...</h1>:<h1>{Number(count)}</h1>}
        
        {/* <TransactionButton
      transaction={() =>
        prepareContractCall({
          contract: CONTRACT,
          method: 'createElection',
          args: [title, owner], // Pass your parameters here
        })
      }
      onTransactionConfirmed={(tx) => {
        alert("Transaction sent!");
        console.log(tx);
        // Add your custom logic here, such as a toast or redirect
      }}
    >
      Create Election
    </TransactionButton> */}
    </div>
    
  );
}

export default TestPage;
