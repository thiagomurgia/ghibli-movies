import React,{useState, useEffect} from "react";
import './global.css'

function App() {

  const [movies, setMovies] = useState([]);
  const [moviesPerPage, setMoviesPerPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(0)
  const startIndex = currentPage * moviesPerPage
  const endIndex = startIndex + moviesPerPage
  const currentMovie = movies.slice(startIndex, endIndex)

  const pages = Math.ceil(movies.length / moviesPerPage)

  useEffect(()=>{
    function loadApi(){
      let url = 'https://ghibliapi.herokuapp.com/films/';
      
      fetch(url)
      .then((result)=> result.json())
      .then((json)=>{
        setMovies(json)

        
      })
    }
    loadApi()
  })


  return (

    <div>

      {currentMovie.map((item)=>{
        return(
          
          <div key={item.id}>
            <div className="main">
              <div className="card">
                <header><strong>{item.title}</strong></header>
                <div className="image">
                  <div className="mov-img"><img src={item.image}/></div>
                  <div className="about">

                  <div><small>Title:</small> <strong>{item.title}</strong></div>
                  <div>Original Title: <strong>{item.original_title}</strong></div>
                  <div>Romanised Title: <strong>{item.original_title_romanised}</strong></div>
                  <div>Director: <strong>{item.director}</strong></div>
                  <div>Running Time: <strong>{item.running_time}</strong> <small>minutes</small></div>
                  <div className="movie-banner">
                    <div className="movie-banner-header">Banner</div>
                    <img src={item.movie_banner} />

                  </div>
                  </div>
                  
                  </div>
                  <div className="description">
                    <div className="description-title">Description</div>
                    {item.description}
                  </div>                  
              </div>
              <div className="paginator">
              {Array.from(Array(pages),(item, index) =>{
                return <button className="button"
                value={index}
                onClick={(e)=>setCurrentPage(Number(e.target.value))}>{index + 1}</button>
              })}
            </div>
          </div>
            
        </div>
        )
      })}
      
    </div>
  );
}

export default App;
