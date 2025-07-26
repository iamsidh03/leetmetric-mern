// src/components/ProfileCard.jsx
import React from 'react';

const ProfileCard = ({ userData }) => {
    // Return null if the necessary data isn't available yet
    if (!userData || !userData.matchedUser) {
        return null;
    }

    const { userAvatar, ranking } = userData.matchedUser.profile;
    const { username } = userData.matchedUser;

    return (
        <div className="profile-card">
            <img src={userAvatar} alt={`${username}'s avatar`} className="avatar" />
            <div>
                <h2 className="username">{username}</h2>
                <p className="rank">Rank: {ranking.toLocaleString()}</p>
            </div>
        </div>
    );
};

export default ProfileCard;
