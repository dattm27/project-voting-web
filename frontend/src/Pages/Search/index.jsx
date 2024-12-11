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
    const [filter, setFilter] = useState({ title: '', isEnd: null, sortByCandidates: null, sortByVotes: null });

    const { data: allElectionsData } = useQuery(GET_ELECTIONS);
    console.log(allElectionsData);

    const handleSetFilter = (filterValue) => {
        console.log(filterValue);
        const newFilter = { ...filter };
        newFilter.isEnd = filterValue.includes('isEnd');
        newFilter.sortByCandidates = filterValue.includes('sortByCandidates');
        newFilter.sortByVotes = filterValue.includes('sortByVotes');
        console.log(newFilter);
        setFilter(newFilter);
    }

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
            sortByCandidates: filter.sortByCandidates,
            sortByVotes: filter.sortByVotes,
        });
        return response;
    };

    return (
        <div className={styles.searchPage}>
            <div>
                <DropdownCheckbox
                    options={[
                        { value: 'isEnd', label: 'Is End' },
                        { value: 'sortByCandidates', label: 'Sort By Candidates' },
                        { value: 'sortByVotes', label: 'Sort By Votes' },
                    ]}
                    onChange={handleSetFilter}
                />
            </div>
            <div>
                <form onSubmit={handleSearch} role="search" className={styles.searchForm}>
                    <input id="search" className={styles.searchInput} type="search" placeholder="Search..." autoFocus required />
                    <button type="submit">Search</button>
                </form>
                {hasSearched && (
                    <div className={styles.searchResults}>
                        {searchResults.length > 0 ? (
                            searchResults.map((result, index) => (
                                <VoteCardSearch key={index} election={result} />
                            ))
                        ) : (
                            <p>No results found</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

const DropdownCheckbox = ({ options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;

        let prevValues = selectedValues;

        if (checked) {
            const newValue = [...prevValues, value];
            prevValues = newValue; // Add value if checked
        } else {
            prevValues = prevValues.filter((val) => val !== value); // Remove value if unchecked
        }
        onChange(prevValues);

        setSelectedValues(prevValues);

        // Pass updated selected values to parent component
    };

    return (
        <div className="dropdown-checkbox">
            <button type="button" onClick={handleToggle}>
                {selectedValues.length > 0
                    ? selectedValues.join(', ') // Display selected options separated by comma
                    : 'Filter'}
            </button>
            {isOpen && (
                <ul className="dropdown-content">
                    {options.map((option) => (
                        <li key={option.value}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={option.value}
                                    checked={selectedValues.includes(option.value)} // Set checkbox checked state
                                    onChange={handleCheckboxChange}
                                />
                                {option.label}
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchPage;