import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUpForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCaretDown,faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 

function CustomDropdown({ options, selected, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (value) => {
        onSelect(value);
        setIsOpen(false);
    };
     
    return (
        <div className="custom-dropdown">
            <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
                <span>{selected}</span>
                <FontAwesomeIcon icon={faCaretDown} className="dropdown-icon" />
            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    {options.map(option => (
                        <div
                            key={option}
                            className="dropdown-item"
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


function SignUpForm() {
    const [selectedTitle, setSelectedTitle] = useState('Ms');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div>
        <form className="form1">
            <div className="signup-login-box">
            <h2>Create An Account</h2>
            <div className="input-group">
                <input type="email" placeholder="Email Address" required />
            </div>

            <div className="input-group">
                <div className="password-box">
                    <input
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="Password"
                        required
                    />
                    <FontAwesomeIcon
                        icon={passwordVisible ? faEye : faEyeSlash}
                        className="show-password-icon"
                        onClick={togglePasswordVisibility}
                    />
                </div>
            </div>

            <div className="discription">
                Enter your legal name as on your ID. 
            </div>

            <div className="name-fields">
                <CustomDropdown
                    options={['Ms', 'Mr', 'Mrs', 'Miss']}
                    selected={selectedTitle}
                    onSelect={setSelectedTitle}
                />
                <div className="group">
                    <input type="text" placeholder="First Name" required />
                </div>
            </div>

            <div className="input-group">
                <input type="text" placeholder="Last Name" required />
            </div>

            <button className="sign-up-btn" type="submit">
                Sign up
            </button>

            <div className="sign-in">
                Already have an account? <Link to="/signin">Sign In</Link>
            </div>
            </div>
        </form> <br /><br /><br /><br /><br /><br />
        </div>
    );
}


export default SignUpForm;
