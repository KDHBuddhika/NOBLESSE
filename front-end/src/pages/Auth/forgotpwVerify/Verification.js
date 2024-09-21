import React, { useState } from 'react';
import './Verification.css';

function VerificationCodeForm() {
    const [code, setCode] = useState(new Array(5).fill(""));

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
        setCode([...code.map((d, idx) => (idx === index ? element.value : d))]);

        // Move to the next input field
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    // Define handleResendCode in the main component
    const handleResendCode = () => {
        console.log('Resend code clicked');
        // Example: trigger an API call to resend the code, show a message, etc.
    };

    return (
        <form className="verification-form">
            <div className="verification-box">
                <h2>Enter Verification Code</h2>
                <p>We have just sent a verification code to<br /> your email.</p>
                
                <div className="code-inputs">
                    {code.map((data, index) => {
                        return (
                            <input
                                key={index}
                                type="text"
                                name="code"
                                maxLength="1"
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onFocus={e => e.target.select()}
                                className="code-input"
                            />
                        );
                    })}
                </div>

                <p className="resend-text" onClick={handleResendCode}>Send a code again.</p>
                
                <button className="verify-btn" type="submit">Verify</button>
            </div>
        </form>
    );
}

export default VerificationCodeForm;
