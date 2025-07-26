// src/App.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// Import all the individual UI components
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import ProblemStats from './components/ProblemStats';
import ProfileCard from './components/ProfileCard';

function App() {
    // State management for the entire application
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // The function that communicates with our backend server
    const handleSearch = async () => {
        if (!username) {
            setError('Please enter a username.');
            return;
        }
        setLoading(true);
        setError('');
        setUserData(null);

        try {
            // Make the API call to our Node.js server
            const response = await axios.get(`http://localhost:5001/api/user/${username}`);
            setUserData(response.data);
        } catch (err) {
            // Display any errors returned from the server
            setError(err.response?.data?.error || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    // The final render method, which assembles the UI from components
    return (
        <div className="app-container">
            <Header />
            <SearchBar
                username={username}
                setUsername={setUsername}
                onSearch={handleSearch}
                loading={loading}
            />
            <ErrorMessage message={error} />
            
            {/* Show the loader only when fetching data */}
            {loading && <Loader />}

            {/* Show the results only when userData is available */}
            {userData && (
                <div className="stats-container">
                    <ProfileCard userData={userData} />
                    <ProblemStats userData={userData} />
                </div>
            )}
        </div>
    );
}

export default App;
