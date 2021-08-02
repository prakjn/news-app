import React, {useState, useEffect} from 'react'
import axios from "axios";
import styled from 'styled-components';
const Search = ({history, setHistory}) => {



    const [loading, isLoading] = useState(false);
    // user query
    const [term, setTerm] = useState("")
    // Page number
    const [page, setPageNumber] = useState(1);
    const [pages, setPages] = useState();
    // finalized query
    const [search,setSearch] = useState("")
    // set search to get results
    const [results, setResults] = useState([])
    const pageNumbers = []

    //Fetch query from search term
    useEffect(() => {
    const querySearch = async () => {
    isLoading(true);
    const res = await axios.get(`http://hn.algolia.com/api/v1/search_by_date?query=${term}&hitsPerPage=15&page=${page}`)
     setResults(res.data.hits);
     setPages(res.data.nbPages)
     console.log(res.data)
    isLoading(false);
    }
    querySearch();
},[search, page]);

    // create pagination
    for(let i = 1; i <= pages; i++) {
    pageNumbers.push(i)
     }


    // handles form submit
    // when submmited history captures search term and sets page number
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(term)
        setPageNumber(1);
        if (term === "") {return}
        setHistory([...history, term])
    }

    // change page
    const paginate = (number) => {
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
            {!isLoading ? "Is Loading..." : results.map((item) =>  (    
            <Article>
            <a key={item.story_title} href={item.story_url} target="_blank"><h1>{item.story_title}</h1></a>
            <h4>Author: {item.author}</h4>
            <p>Posted: {item.created_at}</p>
            </Article>
            ))}
            
            <Pagination>
            {pageNumbers.map((item) => (
                <li><a onClick={() => paginate(item)} href="#">{item}</a></li>
            ))}
            </Pagination>
            </ArticleContainer>

      
        </div>
    )
}

export default Search


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
    text-decoration: none
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
  a {
      text-decoration:none;
      color: blue;
  }
`