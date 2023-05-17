import React from 'react';


// Using Context for having access getting scores and setting scores
export const CourseContext = React.createContext({
    scores: {},
    setScores: () => {
    },
});