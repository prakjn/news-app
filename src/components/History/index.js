import React from 'react'

const History = ({history}) => {
    return (
        <div>
            <h2>Past Search terms:</h2>
            {history.map((item) => (
                <h2 key={item}>{item}</h2>
            ))}
        </div>
    )
}

export default History
