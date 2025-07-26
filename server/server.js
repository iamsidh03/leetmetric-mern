// server/server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
// Enable CORS for all routes, allowing our React frontend to make requests
app.use(cors());
// Allow the server to understand JSON request bodies
app.use(express.json());

// --- Routes ---
// Define the main route to get user stats
app.get('/api/user/:username', async (req, res) => {
    const { username } = req.params;

    // The GraphQL query to fetch LeetCode user data
    const leetcodeQuery = `
        query getUserProfile($username: String!) {
            allQuestionsCount {
                difficulty
                count
            }
            matchedUser(username: $username) {
                username
                profile {
                    ranking
                    userAvatar
                }
                submitStats {
                    acSubmissionNum {
                        difficulty
                        count
                    }
                }
            }
        }
    `;

    try {
        // Make the POST request to the LeetCode GraphQL API
        const response = await axios.post(
            'https://leetcode.com/graphql',
            {
                query: leetcodeQuery,
                variables: { username: username },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    // It's good practice to set a Referer header
                    'Referer': 'https://leetcode.com'
                },
            }
        );

        const data = response.data;

        // Check for errors in the LeetCode response (e.g., user not found)
        if (data.errors || !data.data.matchedUser) {
            return res.status(404).json({ error: 'User not found on LeetCode.' });
        }

        // Send the successful response back to our React client
        res.json(data.data);

    } catch (error) {
        console.error('Error fetching from LeetCode API:', error.message);
        // Handle potential network errors or other issues
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
