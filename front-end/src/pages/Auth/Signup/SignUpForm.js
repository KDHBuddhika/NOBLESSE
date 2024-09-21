// src/pages/Auth/Signup/SignUpForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Imported useNavigate
import './SignUpForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCaretDown, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 

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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can add your sign-up logic, such as sending data to the server
        console.log({
            title: selectedTitle,
            email,
            password,
            firstName,
            lastName
        });

        // After successful sign-up, navigate to the verification page
        navigate('/SignupVerify');
    };

    return (
        <div className="signup-container">
            <form className="form1">
                <div className="signup-login-box">
                    <h2>Create An Account</h2>
                    
                    <div className="input-group">
                    <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                       
                     </div>

             <div className="input-group">
                <div className="password-box">
                    <input type={passwordVisible ? 'text' : 'password'} id="password" placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)} required />
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
                    <input type="text" placeholder="First Name" id="firstName" value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} required />
                </div>
            </div>


            <div className="input-group">
                <input type="text" placeholder="Last Name" id="lastName" value={lastName}
                 onChange={(e) => setLastName(e.target.value)} required />
            </div>

          <button className="sign-up-btn" type="submit" onClick={handleSubmit}>
                        Sign Up
                    </button>

                    <div className="sign-in">
                        Already have an account? <Link to="/signin">Sign In</Link>
                    </div>
                </div>
            </form><br /><br /><br /><br /><br /><br />
        </div>
    );
}

export default SignUpForm;
