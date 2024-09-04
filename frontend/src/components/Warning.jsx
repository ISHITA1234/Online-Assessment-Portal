export function Warning({warning,msg}){
    return(
        <div>
            <label>{warning} {msg=="Sign In"?<a className="underline" href="/signin">{msg}</a>:
            <a className="underline" href="/signup">{msg}</a>}</label>
        </div>
    )
}