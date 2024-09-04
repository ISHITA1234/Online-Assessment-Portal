import { AppBar } from "../components/AppBar";
import Footer from "../components/Footer";
import { faCross, faInfo, faPhone, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function About(){     

    return(
        <> 
        <div className="flex justify-between mb-20">
            {/* <button data-tooltip-target="tooltip-top" data-tooltip-placement="top" type="button" className="rounded-full  mr-2 right-align" onClick={()=>{window.location.href='/cmnpLab'}}><FontAwesomeIcon icon={faInfo} className="h-5 w-10"/></button>            */}
            <button data-tooltip-target="tooltip-top" data-tooltip-placement="top" type="button" className="rounded-full  mr-2 right-align" onClick={()=>{window.location.href='/contact'}}><FontAwesomeIcon icon={faPhone} title='Find Contact Details' className="h-5 w-10"/></button>           
            <div>
            <button className="ml-10 mr-10 px-8 bg-gray-600 text-white rounded-full"><a href="/SignUp">SignUp</a></button>
            <button className="px-8 bg-gray-600 text-white rounded-full"><a href="/SignIn">Login</a></button>   
            </div>             
        </div> 
        
        <div className="ml-10 text-center md:text-center mt-20">
            <label className="text-4xl font-bold">Computer Methods and Numerical Programming Lab</label>
            <label className="text-4xl font-bold"> (ETCE UG1)</label>           
            <div className="text-xl"><label className="font-bold underline">Instructor:</label> Ananda S. Chowdhury</div>
            <div className="text-xl"><label className="font-bold underline">TA: </label>Arijit De, Sevakram Kumbhare</div>
            <div className="text-xl"><label className="font-bold underline">Lab timings:</label> 2:30PM to 5:30PM</div>
        </div>
        

        <div className="ml-20 mr-20 text-center md:text-center">
        <div className="text-3xl font-bold center-align underline mt-10">Tentatative Schedule</div>
        </div>
        

        <div className="ml-20 mr-20 mb-20 mt-5 border border-gray-600">
                <table className="w-full text-lg text-left rtl:text-right text-gray-600 dark:text-gray-400">
                <thead className="text-lg bg-gray-500 text-white">
                <tr className="bg-gray-600">
                    
                    <th>Day</th>
                    <th>Assignment</th>
                    <th>Date</th>
                    
                </tr>
                </thead>
                <tbody>
                    <tr  className="border border-gray-300">
                        <td>1</td>
                        <td>Basics</td>
                        <td>-</td>
                    </tr>
                    <tr  className="border border-gray-300">
                        <td>2</td>
                        <td>Conditional Statement</td>
                        <td>-</td>
                    </tr>
                    <tr  className="border border-gray-300">
                        <td>3</td>
                        <td>Loops</td>
                        <td>-</td>
                    </tr>
                    <tr  className="border border-gray-300">
                        <td>4</td>
                        <td>Functions</td>
                        <td>-</td>
                    </tr>
                    <tr  className="border border-gray-300">
                        <td>5</td>
                        <td>Arrays and Strings</td>
                        <td>-</td>
                    </tr>
                    <tr  className="border border-gray-300">
                        <td>6</td>
                        <td>Structures and Unions</td>
                        <td>-</td>
                    </tr>
                    <tr  className="border border-gray-300">
                        <td>7</td>
                        <td>Numerical Methods - Root finding methods</td>
                        <td>-</td>
                    </tr>
                    <tr  className="border border-gray-300">
                        <td>8</td>
                        <td>Numerical Methods - Solving simultaneous equations</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>            
        <Footer></Footer>
            
        </>
    )
}