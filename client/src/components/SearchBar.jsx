// src/components/SearchBar.jsx
import React from 'react';

const SearchBar = ({ username, setUsername, onSearch, loading }) => {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., username"
                className="search-input"
            />
            <button onClick={onSearch} disabled={loading} className="search-button">
                {loading ? 'Searching...' : 'Search'}
            </button>
        </div>
    );
};

export default SearchBar;
