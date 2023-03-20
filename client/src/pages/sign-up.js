export default function SignUp(){

    async function handleSubmit(e){
        e.preventDefault()
        const dataPost = await fetch('/signup', {
            method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userName: e.target[0].value, 
                              email: e.target[1].value,
                              password: e.target[2].value,
                              confirmPassword: e.target[3].value,
                            })
        }) 
        const response = await dataPost;
        console.log(response)
    }
    
    
        return(
            <>
            <main>
                 <section class="col-6 mt-5">
                    {/* <% if (locals.messages.errors) { %>
                        <% messages.errors.forEach( el => { %>
                            <div class="alert alert-danger"><%= el.msg %></div>
                        <% }) %>    
                    <% } %>
                    <% if (locals.messages.info) { %>
                        <% messages.info.forEach( el => { %>
                            <div class="alert alert-info"><%= el.msg %></div>
                        <% }) %>    
                    <% } %> */}
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div class="mb-3">
                            <label for="userName" class="form-label">User Name</label>
                            <input type="text" class="form-control" id="userName" name="userName" />
                          </div>
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">Email address</label>
                          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" />
                          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div class="mb-3">
                          <label for="password" class="form-label">Password</label>
                          <input type="password" class="form-control" id="password" name="password" />
                        </div>
                        <div class="mb-3">
                            <label for="confirmPassword" class="form-label">Confirm Password</label>
                            <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" />
                          </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </form>
                </section>
    
            </main>
            
            </>
        )
    }