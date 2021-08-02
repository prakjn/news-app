import React, {useState, useEffect} from 'react'
import axios from "axios";
import styled from 'styled-components';
const Search = ({history, setHistory, setTerm, term}) => {



    const [loading, isLoading] = useState(false);

    // Set number of pages
    const [pages, setPages] = useState();
    // Set current page number
    const [page, setPageNumber] = useState(1);

    // Number of hits from search
    const [hits, setHits] = useState(0);
    // Finalize query
    const [search,setSearch] = useState("")
    // Set search to get results
    const [results, setResults] = useState([])
    // Array for pagination
    const pageNumbers = []

    useEffect(() => {

    //Fetch Hacker News API
    const querySearch = async () => {
    //Returns if term is blank
    if (term === "") {return}
    isLoading(true);
    const res = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&query=${term}&page=${page}`)
     setResults(res.data.hits);
     setPages(res.data.nbPages);
     setHits (res.data.nbHits);
    isLoading(false);
    }
    querySearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[search, page]);

    // Create pagination 
    for(let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
     }


    // Handles form submit
    // When submmited history captures search term and sets page number
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(term)
        setPageNumber(1);
        //Returns if term is blank
        if (term === "") {return}
        // Set History
        setHistory([...history, term])
    }

    // Change page upon click
    const paginateHandler = (number) => {
        setPageNumber(number)
    }
    return (
        <div>
            <SearchContainer>
            <h1>Search News</h1>
            <form onSubmit={handleSubmit}>
            <input type="text" value={term} onChange={(e) => setTerm(e.target.value)}/>
            <input type="submit" value="search" />
            </form>
            </SearchContainer>
            

            <ArticleContainer>

            <ResultsFound>About {hits} Results</ResultsFound>
            {/* Maps results and filters if no URL exist */}
            {loading ? "Loading..." : results.filter((item) => item.url != null).map((item) =>  (   
            <Article key={item.objectID}>
            <a href={item.url} target="_blank" rel="noreferrer">{item.title}</a>
            <h4>By: {item.author}</h4>
            <p>Posted: {item.created_at}</p>
            </Article>
            ))}
            
            {/* Maps Pages */}
            <Pagination>
            {pageNumbers.map((item, index) => (
                <li key={item + index}><span onClick={() => paginateHandler(item)}>{item}</span></li>
            ))}
            </Pagination>
            
            </ArticleContainer>
        </div>
    )
}

export default Search

const ResultsFound = styled.h2`
font-size: 12px;
margin: 10px;
`

const ArticleContainer = styled.div`
display: flex;
flex-direction: column;
padding: 10px;
background-color: #e0e0e0;
width: 60%;
margin: 0 auto;
`

const Article = styled.div`
font-size: 8px;
margin: 10px;

a {
    text-decoration:none;
    color: blue;
    font-size: 16px;
    font-weight: bold;
}

h1 {
    font-size: 16px;
}

h4 {
    font-size: 12px;
}

p {
    font-size: 10px;
}
`

const SearchContainer = styled.div` 
display: flex;
align-items: center;
justify-content: center;

h1 {
    margin-right: 50px;
}
`

const Pagination = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
    width: 100%;
  li {
      padding 5px;
  }
  span {
      text-decoration:none;
      color: blue;
      cursor: pointer;
  }
`