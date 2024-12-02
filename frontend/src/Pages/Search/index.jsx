import React, { useState } from 'react';
import styles from './Search.module.scss';
import { getElectionByFilter } from '../../Services/serverServices';
import { useQuery } from '@apollo/client';
import { GET_ELECTIONS } from '../../GraphQL/client';
import { Link } from 'react-router-dom';
import VoteCardSearch from '../../Components/VoteCardSearch'

function SearchPage() {
    const [hasSearched, setHasSearched] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [filter, setFilter] = useState({ title: '', isEnd: null });

    const { data: allElectionsData } = useQuery(GET_ELECTIONS);
    console.log(allElectionsData);

    const handleSearch = async (event) => {
        event.preventDefault();
        const searchQuery = event.target.search.value;
        let newFilter = { ...filter, title: searchQuery };
        setFilter(newFilter);
        setHasSearched(true);

        // Giả sử bạn có một hàm để lấy kết quả tìm kiếm từ server
        const beResults = await fetchSearchResults(newFilter);
        let result = beResults.map((election) => ({
            id: election.id,
            name: election.name,
            description: election.description,
            photoLink: election.photoLink,
            electionDue: election.endDate,
            votes: null,
            electionAddr: null,
        }));

        result = result.map((election) => {
            const found = allElectionsData.newElections.find((el) => el.electionId == election.id);
            if (found) {
                election.votes = found.totalVotes;
                election.electionAddr = found.electionAddr;
            }
            return election;
        });

        console.log(result);

        setSearchResults(result);
    };

    const fetchSearchResults = async (filter) => {
        // Thay thế URL này bằng URL API thực tế của bạn
        const response = await getElectionByFilter({
            title: filter.title,
            isEnd: filter.isEnd,
        });
        return response;
    };

    return (
        <div className={styles.searchPage}>
            <form onSubmit={handleSearch} role="search" className={styles.searchForm}>
                <input
                    type="checkbox"
                    onChange={(e) => {
                        const newFilter = {
                            title: filter.title,
                            isEnd: e.target.checked,
                        }

                        setFilter(newFilter);
                    }}
                />

                <input id="search" className={styles.searchInput} type="search" placeholder="Search..." autoFocus required />
                <button type="submit">Search</button>
            </form>
            {hasSearched && (
                <div className={styles.searchResults}>
                    {searchResults.length > 0 ? (
                        searchResults.map((result, index) => (
                            <VoteCardSearch key={index} election={result}/>
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchPage;