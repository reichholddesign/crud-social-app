import { useState, useEffect } from "react"
import { Link, Route, Routes, useNavigate, BrowserRouter } from 'react-router-dom'
import Post from './post'

export default function Feed(){
    const [feedData, setFeedData] = useState({showFeed: false, data:''})

    useEffect(() => {
        async function getData(){
       const getData = await fetch('/feed') 
     const response = await getData
     const resJson = await response.json()
     setFeedData({showFeed: true, data: resJson.posts})
   
    }
    getData()
    }, [])





return (
    <>
    <main>
      <div class="container">
    <div class="row justify-content-center mt-5">
      <ul class="row list-unstyled">
        {/* <% for(var i=0; i<posts.length; i++) {%>
          <li class="col-6 justify-content-between mt-5">
            <a href="/post/<%= posts[i]._id%>">
              <img class="img-fluid" src="<%= posts[i].image%>">
            </a>
          </li>
        <% } %> */}
 {

            feedData.showFeed && feedData.data.map((item, i) => {
            return(
              <>
              <li key={item._id}>
                    <Link to={`/post/${item._id}`}>
                        <h2>{item.title}</h2>
                        <img src={item.image} width="200px" height="200px" />
                    </Link>
              </li>


              </>
            )
           })
           
          }
             
        </ul>
    </div>
  </div>  
  </main>
    </>
)   
}