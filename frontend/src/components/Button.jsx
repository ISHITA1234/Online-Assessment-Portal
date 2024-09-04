export function Button({onClick, submitMessage}){
    return(
        <div>
            <button className="font-bold txt-4pxl bg-gray-600 text-white w-40 rounded mt-5" onClick={onClick}>{submitMessage}</button><br/>            
        </div>
    )
}