// src/components/ProblemStats.jsx
import React from 'react';

const ProblemStats = ({ userData }) => {
    // --- 1. Calculate all necessary stats from the props ---
    const allQuestions = userData.allQuestionsCount;
    const solvedStats = userData.matchedUser.submitStats.acSubmissionNum;

    const getStats = (difficulty) => {
        const total = allQuestions.find(q => q.difficulty === difficulty)?.count || 0;
        const solved = solvedStats.find(s => s.difficulty === difficulty)?.count || 0;
        const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;
        return { total, solved, percentage };
    };

    const easy = getStats('Easy');
    const medium = getStats('Medium');
    const hard = getStats('Hard');
    
    const totalSolved = easy.solved + medium.solved + hard.solved;
    const totalQuestions = easy.total + medium.total + hard.total;

    // --- 2. Prepare data for the SVG Donut Chart ---
    const chartData = [
        { color: 'var(--easy-color)', value: easy.solved },
        { color: 'var(--medium-color)', value: medium.solved },
        { color: 'var(--hard-color)', value: hard.solved },
    ];

    const radius = 85;
    const circumference = 2 * Math.PI * radius;
    let accumulatedAngle = 0;

    return (
        <div className="stats-summary-card">
            {/* Left Column: Donut Chart */}
            <div className="summary-left">
                <svg width="250" height="250" viewBox="0 0 200 200" className="donut-chart">
                    <circle cx="100" cy="100" r={radius} fill="transparent" stroke="#3a3a3a" strokeWidth="15" />
                    {chartData.map((segment, index) => {
                        const percentageOfTotal = totalSolved > 0 ? (segment.value / totalSolved) : 0;
                        const strokeDashoffset = circumference * (1 - percentageOfTotal);
                        const rotation = accumulatedAngle;
                        accumulatedAngle += percentageOfTotal * 360;

                        return (
                            <circle
                                key={index}
                                cx="100"
                                cy="100"
                                r={radius}
                                fill="transparent"
                                stroke={segment.color}
                                strokeWidth="15"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                transform={`rotate(${rotation} 100 100)`}
                            />
                        );
                    })}
                    <text x="50%" y="45%" dominantBaseline="middle" textAnchor="middle" className="chart-text-main">
                        {totalSolved.toLocaleString()} / {totalQuestions.toLocaleString()}
                    </text>
                    <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" className="chart-text-sub">
                        ✓ Solved
                    </text>
                </svg>
            </div>

            {/* Right Column: Difficulty Breakdown */}
            <div className="summary-right">
                {/* Easy Stats with Progress Bar */}
                <div className="difficulty-item">
                    <div className="difficulty-header">
                        <p className="difficulty-label easy">Easy</p>
                        <p className="difficulty-count">{easy.solved} / {easy.total}</p>
                    </div>
                    <div className="difficulty-progress-bar">
                        <div className="difficulty-progress-fill easy-bg" style={{ width: `${easy.percentage}%` }}></div>
                    </div>
                </div>
                {/* Medium Stats with Progress Bar */}
                <div className="difficulty-item">
                    <div className="difficulty-header">
                        <p className="difficulty-label medium">Medium</p>
                        <p className="difficulty-count">{medium.solved} / {medium.total}</p>
                    </div>
                    <div className="difficulty-progress-bar">
                        <div className="difficulty-progress-fill medium-bg" style={{ width: `${medium.percentage}%` }}></div>
                    </div>
                </div>
                {/* Hard Stats with Progress Bar */}
                <div className="difficulty-item">
                    <div className="difficulty-header">
                        <p className="difficulty-label hard">Hard</p>
                        <p className="difficulty-count">{hard.solved} / {hard.total}</p>
                    </div>
                    <div className="difficulty-progress-bar">
                        <div className="difficulty-progress-fill hard-bg" style={{ width: `${hard.percentage}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemStats;
