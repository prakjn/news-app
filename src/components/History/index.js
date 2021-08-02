import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components';
const History = ({history, setTerm}) => {

    

    return (
        <div>
            <SearchHistoryTitle>Search History</SearchHistoryTitle>
            <HistoryContainer>
            {history.map((item, index) => (
                <Link to="/search" key={item + index} onClick={(e) => setTerm(e.target.innerText)}>{item}</Link>
            ))}
            </HistoryContainer>
        </div>
    )
}

export default History


const SearchHistoryTitle = styled.h1`
display: flex;
align-items: center;
justify-content: center;

`

const HistoryContainer = styled.div`
display: flex;
flex-direction: column;
padding: 10px;
background-color: #e0e0e0;
width: 60%;
margin: 0 auto;
 a{
    text-decoration:none;
    color: blue;
    font-size: 16px;
    margin: 10px;
    font-weight: bold;
    
 }

`