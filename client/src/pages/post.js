
import { Routes, Route, useParams, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function Post({user}){
    const [storedPostData, setStoredPostData] = useState({show: false, postObj: null})
    const { id } = useParams();
    const navigate = useNavigate();

  async function handleLike(e){
        e.preventDefault()
        const putDataReq = await fetch(`/post/likePost/${id}`, {
            'method': 'PUT'
        })
        const putDataRes = await putDataReq
        const parsedLikeData = await putDataRes.json()
        if(parsedLikeData.likeCountUpdated){
           const updatedLikeVal = ++storedPostData.postObj.likes 
            setStoredPostData({...storedPostData, postObj: {...storedPostData.postObj, likes: updatedLikeVal}})
        }
    }
    async function handleDelete(e){
        e.preventDefault()
        const deleteDataReq = await fetch(`/post/deletePost/${id}`, {
            'method': 'DELETE'
        })
        const putDataRes = await deleteDataReq
        const parsedDeleteData = await putDataRes.json()
        if(parsedDeleteData.deleted){
            navigate("/feed");
        }
    }


    async function handleComment(e){
        e.preventDefault()
        const comment = document.querySelector("#comment").value
        const coomentDataReq = await fetch(`/comment/createComment/${id}`, {
            'method': 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({comment: comment,      
                                  })
     }) 
        const commentDataRes = await coomentDataReq
        const parsedcommentData = await commentDataRes.json()
        console.log(parsedcommentData)
        if(parsedcommentData.commentAdded){
            let commentArr = storedPostData.comments
            commentArr.push(parsedcommentData.commentData)
            setStoredPostData({...storedPostData, comments: commentArr})
            console.log(storedPostData) 
        }
    }


    useEffect(() => {
        
        if(id){
           async function getData(){
           const postDataReq = await fetch(`${id}`)
           const postData = await postDataReq
           const parsedData = await postData.json()
           console.log(parsedData)
           setStoredPostData({show: true, postObj: parsedData.post, author: parsedData.user, comments: parsedData.comment})
        }
        getData()
        }
    }, [    ])



    return (
        <>      
        <main className="post-main-container">
        { storedPostData.show &&
        <>
        <div className="flex-col" >
        <h2>{storedPostData.postObj.title}</h2>
       <img src={storedPostData.postObj.image} width="200px" height="200px" />
        <span>{storedPostData.postObj.caption}</span>  
        <div className="flex-col">
        <form>
          <button class="btn btn-primary fa fa-heart" onClick={(e) => handleLike(e)}>Like</button>
        </form>
        <h3 class="col-3">{storedPostData.postObj.likes}</h3>
        </div>
        </div>
             
        {  user._id === storedPostData.author._id && (
        <>
         <form>
         <button class="btn btn-primary fa fa-trash" onClick={(e) => handleDelete(e)}>Remove</button>
        </form>
        </>
        )}
  
     <form>
      <div class="mb-3">
        <label for="comment" class="form-label">Comment</label>
        <textarea class="form-control" id="comment" name="comment"></textarea>
      </div>
      <button type="submit" class="btn btn-primary" onClick={(e) => handleComment(e)}>Submit</button>
    </form>
     <section>
 {     storedPostData.comments.map((comment, i) => {
            return(
              <>
              <li key={`comment-${i}`}>
              <p>{comment.comment}</p>
              </li>
              </>
            )
           })
          }
    </section>       
    </>  
}

</main>
   </>
   
       )


    }



