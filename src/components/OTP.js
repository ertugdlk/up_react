import React, { useState } from "react";
import css from '../components/css/OTP.css'
const Axios = require('axios')

const OTP = () => {
    const [otp, setOtp] = useState(new Array(4).fill(""));

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        //Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    //eğer girilen OTP backendden gelen OTP ile aynıysa matchleştiğini göster ve kullanıcıyı verifike et daha sonra dashboarda aktar.

    const checkOTP = async () =>{
    try
    {
        const url = "http://localhost:5000/auth/otp"
        const response = await Axios.post(url , {otp} , {withCredentials: true})

    if(response.status!==200){
        alert("Invalid OTP entry") 
    }
    else{
        alert("OTP successful!")
    }
}
catch(err)
{
  console.log(err)
}
}

    return (
        <>   
        <div className="otp-window">
            <div className="otp-modal"> 
            <div className="row">
                <div className="info">
                    <p className="otp-info">Please enter the OTP sent to your email</p>
                    
                    {otp.map((data, index) => {
                        return (
                            <input
                                className="otp-field"
                                type="text"
                                name="otp"
                                maxLength="1"
                                key={index}
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onFocus={e => e.target.select()}
                            />
                        );
                    })}

                    <p className="otp-entered">OTP : {otp.join("")}</p>
                    <p>
                        <button
                            className="clear-button"
                            onClick={e => setOtp([...otp.map(v => "")])}
                        >
                            Clear
                        </button>
                        <button
                            className="verify-button"
                            onClick={e =>
                                alert("Entered OTP is " + otp.join(""))
                            }
                         onClick={checkOTP}>
                            Verify OTP
                        </button>
                    </p>
                </div>
            </div>
            </div>  
        </div>  
        </>
    );
};
export default OTP;