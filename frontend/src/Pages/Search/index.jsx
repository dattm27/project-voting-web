import styles from './Search.module.scss';

function SearchPage() {
    return (
        <div className={styles.searchPage}>
            <form onSubmit={(event) => event.preventDefault()} role="search">
                <label htmlFor="search">Search for stuff</label>
                <input id="search" className={styles.searchInput} type="search" placeholder="Search..." autoFocus required />
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default SearchPage;
