import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import styles from './UserHistoryPage.module.scss';
import { GET_USER_HISTORY } from '../../GraphQL/client';
import { back } from '../../Assets';

// Utility function to format the timestamp into a "time ago" format
const timeAgo = (timestamp) => {
    const seconds = Math.floor(Date.now() / 1000 - Number(timestamp));
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
};

// Function to shorten the voter address
const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

function UserHistoryPage() {
    const { userAddr } = useParams();
    const { loading, error, data } = useQuery(GET_USER_HISTORY, {
        variables: { voter: userAddr || '' },
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const votes = data?.newVotes || [];
    console.log(votes)
    return (
        <div className={styles.historyPage}>
            <div className={styles.historyHeader}>
                <Link
                    to={`/`}
                    className={styles.back_btn}
                    >
                    <img src={back} alt='back_btn' className={styles.back_icon} />
                    <span>Back</span>
                </Link>
                <h1>User Vote Transaction History</h1>
            </div>
            <table className={styles.historyTable}>
                <thead>
                    <tr>
                        <th>Transaction Hash</th>
                        <th>Election Address</th>
                        <th>Vote Name</th>
                        <th>Candidate Name</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {votes.map((vote, index) => (
                        <tr key={index}>
                            <td>
                                <a
                                    href={`https://testnet.snowtrace.io/tx/${vote?.transactionHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={vote?.transactionHash}
                                >
                                    {shortenAddress(vote?.transactionHash)}
                                </a>
                            </td>
                            <td>
                                <a
                                    href={`https://testnet.snowtrace.io/address/${vote?.electionId.electionAddr}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={vote?.electionId.electionAddr}
                                >
                                    {shortenAddress(vote?.electionId.electionAddr)}
                                </a>
                            </td>
                            <td><Link to={`/vote/${vote?.electionId.electionAddr}`}>{vote?.electionId?.title}</Link></td>
                            <td>
                                    {vote?.candidateId.name}
                            </td>
                            <td title={new Date(Number(vote?.timestamp) * 1000).toLocaleString()}>
                                {timeAgo(vote?.timestamp)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserHistoryPage;
