

// src/components/ErrorMessage.jsx
import React from 'react';

const ErrorMessage = ({ message }) => {
    if (!message) return null; // Don't render anything if there's no message
    return <p className="error-message">{message}</p>;
};

export default ErrorMessage;
