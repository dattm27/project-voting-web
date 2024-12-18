import React, { useState } from 'react';
import styles from './Search.module.scss';
import { getElectionByFilter } from '../../Services/serverServices';
import { useQuery } from '@apollo/client';
import { GET_ELECTIONS } from '../../GraphQL/client';
import VoteCardSearch from '../../Components/VoteCardSearch';

function SearchPage() {
    const [hasSearched, setHasSearched] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [filter, setFilter] = useState({ title: '', isEnd: null, sortByCandidates: null, sortByVotes: null });
    const [selectedValues, setSelectedValues] = useState([]);

    const { data: allElectionsData } = useQuery(GET_ELECTIONS);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        const updatedValues = checked
            ? [...selectedValues, value]
            : selectedValues.filter((val) => val !== value);

        setSelectedValues(updatedValues);

        const newFilter = {
            ...filter,
            isEnd: updatedValues.includes('isEnd'),
            sortByCandidates: updatedValues.includes('sortByCandidates'),
            sortByVotes: updatedValues.includes('sortByVotes'),
        };
        setFilter(newFilter);
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        const searchQuery = event.target.search.value;
        const newFilter = { ...filter, title: searchQuery };
        setFilter(newFilter);
        setHasSearched(true);

        const results = await fetchSearchResults(newFilter);
        const formattedResults = results.map((election) => {
            const match = allElectionsData?.newElections?.find((el) => el.electionId === election.id);
            return {
                ...election,
                votes: match?.totalVotes || null,
                electionAddr: match?.electionAddr || null,
            };
        });

        setSearchResults(formattedResults);
    };

    const fetchSearchResults = async (filter) => {
        return await getElectionByFilter({
            title: filter.title,
            isEnd: filter.isEnd,
            sortByCandidates: filter.sortByCandidates,
            sortByVotes: filter.sortByVotes,
        });
    };

    return (
        <div className={styles.searchPage}>

            <div className={styles.searchSection}>
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <input
                        id="search"
                        name="search"
                        type="search"
                        placeholder="Search elections..."
                        className={styles.searchInput}
                        required
                    />
                    <button type="submit" className={styles.searchButton}>Search</button>
                </form>

            </div>
            <div className={styles.filtersSection}>
                {[{ value: 'isEnd', label: 'Is End' },
                { value: 'sortByCandidates', label: 'Sort By Candidates' },
                { value: 'sortByVotes', label: 'Sort By Votes' }].map((option) => (
                    <div key={option.value} className={styles.checkboxItem}>
                        <label>
                            <input
                                type="checkbox"
                                value={option.value}
                                checked={selectedValues.includes(option.value)}
                                onChange={handleCheckboxChange}
                            />
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
            {hasSearched && (
                <div className={styles.resultSection}>
                    {searchResults.length > 0 ? (
                        searchResults.map((result) => (
                            <VoteCardSearch key={result.id} backendElections={result} />
                        ))
                    ) : (
                        <p className={styles.noResultsMessage}>No results found.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchPage;
