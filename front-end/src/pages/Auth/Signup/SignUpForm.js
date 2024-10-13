import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUpForm.css';
import Logo from '../logo/Logo';
import CloseIcon from '../closeIcon/CloseIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import Axios for HTTP requests

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
    const [errorMessage, setErrorMessage] = useState('');

    const [selectedTitle, setSelectedTitle] = useState('Ms');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userType] = useState('seller'); // Assume a default userType
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const registrationDate = new Date().toISOString();

        const userRegisterDto = {
            email,
            password,
            firstName,
            lastName,
            userType,
            registrationDate,
        };

        try {
            const response = await axios.post('https://localhost:7281/register', userRegisterDto);
            console.log(response.data);
            if (response.status === 200) {
                navigate('/SignupVerify'); // Redirect user to the verification page
            }
        } catch (error) {
            if (error.response) {
                // Server responded with an error
                console.error('Error during registration:', error.response.data);
                if (error.response.status === 400) {
                    // Display specific error like "Email is already registered"
                    setErrorMessage(error.response.data);
                } else {
                    setErrorMessage('An error occurred during registration. Please try again later.');
                }
            } else if (error.request) {
                // Request made but no response received
                console.error('Error request:', error.request);
                setErrorMessage('Unable to connect to the server. Please check your internet connection.');
            } else {
                // General error during setup
                console.error('Error message:', error.message);
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        }
    };

    const handleClose = () => {
        console.log('Close button clicked');
        navigate('/signin');
    };

    return (
        <div className="signup-container">
            <Logo />
            <CloseIcon onClick={handleClose} className="custom-close-icon" />
            <div className="si-container">
            {errorMessage && (
                <div className="error-message">
                    {errorMessage}
                </div>
            )}
                <form className="form1" onSubmit={handleSubmit}>
                    <div className="signup-login-box">
                        <h2>Create An Account</h2>

                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <div className="password-box">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Last Name"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>

                        <button className="sign-up-btn" type="submit">
                            Sign Up
                        </button>

                        <div className="sign-in">
                            Already have an account? <Link to="/signin">Sign In</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUpForm;
