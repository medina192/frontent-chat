import React, { useState, useRef } from 'react'
import '../../styles/screens/authScreen.css';
import { BsFillPersonFill, BsFillEnvelopeFill, BsLockFill } from "react-icons/bs";
import { generalCallApi } from '../../services/api/apiCalls';

import { useSelector, useDispatch } from 'react-redux'
import { RootState, useAppDispatch } from '../../store/store';
import { login, loginUser, logout } from '../../slices/userSlice';
import { useNavigate } from 'react-router';


const RegisterScreen = () => {

    const user = useSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch()


    const navigate = useNavigate();

    const inputsData = useRef({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        errorName: ['', false],
        errorEmail: ['', false],
        errorPassword: ['', false],
    });



    const checkInputsErrors = () => {

        let auxErrors = {
            errorName: ['', false],
            errorEmail: ['', false],
            errorPassword: ['', false],
        }

        if(inputsData.current.name === '')
            auxErrors.errorName = ['You does not write an username', true];
        if(inputsData.current.email === '')
            auxErrors.errorEmail = ['You does not write an email', true];
        if(inputsData.current.password.length > 0)
        {

            if(inputsData.current.password.length < 8)
            {
                auxErrors.errorPassword = ['The password must contain at least 8 characters', true];
            }
        }
        else
        {
            auxErrors.errorPassword = ['You does not write a password', true];
        }


        
        const errorsData = Object.entries(auxErrors);

        for(const error in errorsData)
        {
            if(errorsData[error][1][1])
            {
                setErrors(auxErrors);
                return true;
            }
        }

        return false;

    }



    const setInputsValues = (rawValue: any, name: string) => {
        
        const value = rawValue.target.value;

        switch (name) {
            case 'name':
                inputsData.current.name = value;    
            break;
            case 'email':
                inputsData.current.email = value;    
            break;
            case 'password':
                inputsData.current.password = value;    
            break;
        
            default:
                break;
        }

        
    }


    const removeErrorFromInput = (name: string) => {
        

        switch (name) {
            case 'name':
                inputsData.current.name = '';  
                setErrors({
                    ...errors,
                    errorName: ['', false],
                });  
            break;
            case 'email':
                inputsData.current.email = '';    
                setErrors({
                    ...errors,
                    errorEmail: ['', false],
                });  
            break;
            case 'password':
                inputsData.current.password = ''; 
                setErrors({
                    ...errors,
                    errorPassword: ['', false],
                });     
            break;
        
            default:
                break;
        }


    }

    const submitForm = async(e: any) => {
        e.preventDefault();

        if(checkInputsErrors())
        {}
        else{

            generalCallApi('Post', '/api/auth/createuser', inputsData.current)
            .then( data => {
                const resp = data?.data;
                localStorage.setItem('token-friend-chat', resp.token);
                dispatch(login({
                    isLogged: true,
                    name: resp.user.name,
                    uid: resp.user.uid,
                }));
                localStorage.setItem('rememeber-friend-chat', 'true');
                navigate('/chat/messages');
            })
            .catch(error => {

                const respError = JSON.parse( error.request);

                if(respError.msg === 'The email already exists')
                {
                    setErrors({
                        ...errors,
                        errorEmail: [respError.msg, true]
                    })
                }
            })

        }
    }

    const goToLogInScreen = () => {
        navigate('/chat/auth/login')
    }

    return (
        <div className='center-container expand-100-100 color-background'>
            <form className='con-form-auth' onSubmit={ submitForm }> 
                <p className='ls-auth-title'>Registrate</p>
               
                <div className='con-icon-input'>
                    <BsFillPersonFill className='auth-icon-input' />
                    <div className='con-input-aux-border'>
                        <input onChange={(value) => setInputsValues(value, 'name') } 
                            onFocus={() => removeErrorFromInput('name')}
                         type="text" placeholder='Username' className='ls-input-login' />
                    </div>
                </div>
                {
                    errors.errorName[1] ? 
                    ( <p className='error-msg-input'>{ errors.errorName[0] }</p> )
                    :
                    ( <></> )
                }

                <div className='con-icon-input'>
                    <BsFillEnvelopeFill className='auth-icon-input' />
                    <div className='con-input-aux-border'>
                        <input onChange={(value) => setInputsValues(value, 'email') } 
                            onFocus={() => removeErrorFromInput('email')}
                            type="text" placeholder='Email' className='ls-input-login' />
                    </div>
                </div>
                {
                    errors.errorEmail[1] ? 
                    ( <p className='error-msg-input'>{ errors.errorEmail[0] }</p> )
                    :
                    ( <></> )
                }

                <div className='con-icon-input'>
                    <BsLockFill className='auth-icon-input' />
                    <div className='con-input-aux-border'>
                        <input onChange={(value) => setInputsValues(value, 'password') } 
                            onFocus={() => removeErrorFromInput('password')}
                            type="password" placeholder='Password' className='ls-input-login' />
                    </div>
                </div>
                {
                    errors.errorPassword[1] ? 
                    ( <p className='error-msg-input'>{ errors.errorPassword[0] }</p> )
                    :
                    ( <></> )
                }

                <button onClick={ submitForm } className='ls-button-login'>
                    Register
                </button>

                <p className='ls-text-account'>Do you already have an account??</p>
                <p onClick={ goToLogInScreen } className='ls-text-link-account'>Log In</p>
            </form>
        </div>
    )
}

export default RegisterScreen
