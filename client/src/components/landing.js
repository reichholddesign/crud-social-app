
export default function Landing({handleUpdate}){

return (
    <>
    <main>
        <section>
            <button onClick={() => handleUpdate('login')}>Sign in</button>
            <button onClick={() => handleUpdate('sign-up')}>Sign up</button>
        </section>
    </main>
    
    </>
)

}

