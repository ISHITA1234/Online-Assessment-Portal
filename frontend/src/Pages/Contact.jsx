import Footer from "../components/Footer";
import { faCross, faHome, faInfo, faPhone, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Contact(){
    return(
        <>
        <div className="flex justify-left mb-20">
            <button data-tooltip-target="tooltip-top" data-tooltip-placement="top" type="button" className="rounded-full  mr-2 right-align" onClick={()=>{window.location.href='/cmnpLab'}}><FontAwesomeIcon icon={faHome} title='Go Back to Home Page' className="h-5 w-10"/></button>           
        </div> 
        <div className="ml-10 text-center md:text-center mt-20">
            <label className="text-4xl font-bold">Contacts (CMNP Lab)</label>
            <label className="text-4xl font-bold"> (ETCE UG1)</label>           
            <div className="text-xl mb-10"><label className="font-bold underline">Instructor</label><br></br>
                <label className="font-bold">Ananda S. Chowdhury</label><br></br>
                Email:<label className="text-blue-500 underline">@jadavpuruniversity.in</label><br></br>
                <br></br>
            </div>
            <div className="text-xl"><label className="font-bold underline">Technical Assistants</label><br></br>
                <div className="mb-5">
                <label className="font-bold">Arijit De</label> <br></br>
                Email:<label className="text-blue-500 underline">arijitde.etce.rs@jadavpuruniversity.in</label><br></br>
                <br></br>
                </div>                
                <div className="mb-5">
                <label className="font-bold">Sevakram Kumbhare</label> <br></br>
                Email:<label className="text-blue-500 underline">stkumbhare.etce.rs@jadavpuruniversity.in</label>, <label className="text-blue-500 underline">sevakramfriends@gmail.com</label><br></br>
                <br></br>
                </div>                
            </div>            
        </div>
        </>
    )
}