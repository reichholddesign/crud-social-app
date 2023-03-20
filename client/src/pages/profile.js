import { useState, useEffect } from "react"
import { Link, Route, Routes, useNavigate } from 'react-router-dom'


export default function Profile({setUser, user}){
    const navigate = useNavigate();
    const [posts, setPosts] = useState({hasPosts: false, posts: null}) 

  // get initial data
    useEffect(() => {
        async function getData(){
       const getData = await fetch('/login') 
     const response = await getData
     const resJson = await response.json()
     if(resJson.login) {
        const fetchPostData = await fetch('/profile')
        const postResponse = await fetchPostData
        const parsedPosts = await postResponse.json()
        setPosts({hasPosts: true, posts: parsedPosts.posts})

     } else { 
        navigate("/")
      }
    }

    getData()
    }, [])


    // add a new post 
    async function handleSubmitPost(e){
      e.preventDefault()
      const formData = new FormData();
      formData.append("title", document.querySelector('input').value);
      formData.append("caption", document.querySelector('textarea').value); 
      formData.append("file", document.querySelector('#imageUpload').files[0]
      );
      const addPost = await fetch('/post/createPost',  {
        method: 'POST',
        body: formData
    }) 
    const postResponse = await addPost;
    const resJson = await postResponse.json()
    let postsCopy = [...posts.posts]
    postsCopy.push(resJson)
   setPosts({hasPosts: true, posts: postsCopy})
    }
    

    return (
        <>
          <h1>Welcome {user.userName}</h1>  
          <main>
        
            <div>
        
                <span> </span>
            </div>
            <section className="add-post-section">
            <h2>Add a post</h2>
            <form >
              <div class="mb-3">
                  <label for="title" class="form-label">Title</label>
                  <input type="text" class="form-control" id="title" name="title" />
              </div>
              <div class="mb-3">
                <label for="caption" class="form-label">Caption</label>
                <textarea class="form-control" id="caption" name="caption"></textarea>
              </div>
              <div class="mb-3">
                <label for="imgUpload" class="form-label">Image</label>
                <input type="file" class="form-control" id="imageUpload" name="file" />
              </div>
              <button type="submit" class="btn btn-primary" value="Upload" onClick={(e)=>handleSubmitPost(e)}>Submit</button>
            </form>
            </section>

            <section>
              <h2>Your posts</h2>
            <ul class="row list-unstyled">
           {
            posts.hasPosts && posts.posts.map((postData, i) => {
            return(
              <>
              <Link to={`/post/${postData._id}`}>             
               <li key={postData.title}>
              <h3>{postData.title}</h3>
              <img src={postData.image} width="200px" height="200px"/>
              <span>{postData.caption}</span>
              </li>
              </Link>

              </>
            )
           })
          }
            </ul>
            </section>
            </main>
      </>
    )   
    }