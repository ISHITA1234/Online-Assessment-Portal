export function InputBox(props){
    return(
        <div>
            <label className="font-bold">{props.label}:</label>            
            <input required className="border ml-2 mb-2 mt-2" type={props.type} onChange={props.onChange} placeholder={props.placeholder} name="name"></input>
        </div>
    )
}