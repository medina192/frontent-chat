import React, { useState, useRef } from 'react'
import '../../styles/screens/authScreen.css';
import { BsFillPersonFill, BsFillEnvelopeFill, BsLockFill } from "react-icons/bs";

import { generalCallApi } from '../../services/api/apiCalls';

import { useSelector, useDispatch } from 'react-redux'
import { RootState, useAppDispatch } from '../../store/store';
import { login, loginUser, logout } from '../../slices/userSlice';
import { useNavigate } from 'react-router';

const LoginScreen = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate();

    const inputsData = useRef({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        errorEmail: ['', false],
        errorPassword: ['', false],
    });


    const checkInputsErrors = () => {

        let auxErrors = {
            errorEmail: ['', false],
            errorPassword: ['', false],
        }

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

    const submitForm = (e: any) => {
        e.preventDefault();

        if(checkInputsErrors())
        {}
        else{

            generalCallApi('Post', '/api/auth/login', inputsData.current)
            .then( data => {
                const resp = data?.data;
                localStorage.setItem('token-friend-chat', resp.token);
                //if(rememberMe)
                    localStorage.setItem('rememeber-friend-chat', 'true');
                dispatch(login({
                    isLogged: true,
                    name: resp.user.name,
                    uid: resp.user.uid,
                }));
                navigate('/')
            })
            .catch(error => {
                console.log('erer', error.request)
                
                const respError = JSON.parse( error.request.response);

                if(respError.msg === 'The Email is not register')
                {
                    setErrors({
                        ...errors,
                        errorEmail: [respError.msg, true]
                    })
                }
                
            })

        }
    }


    const goToRegisterScreen = () => {
        navigate('/chat/auth/register')
    }

    return (
        <div className='center-container expand-100-100 color-background'>
            <form className='con-form-auth' onSubmit={ submitForm }> 
                <p className='ls-auth-title'>Log In</p>
               

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

                {
                    /*
                    
                                    <div className='con-remember-me'>
                    <input 
                        type={"checkbox"} 
                        className='check-remember' 
                        defaultChecked={ rememberMe } 
                        onChange={() => setRememberMe(!rememberMe)}
                    />
                    <p className='ls-remember-me-text'>Recuerdame</p>
                </div>
                    */
                }


                <button onClick={ submitForm } className='ls-button-login'>
                    Iniciar Sesi??n
                </button>
                <p className='ls-text-account'>You do not have an account?</p>
                <p onClick={ goToRegisterScreen } className='ls-text-link-account'>Register Here??</p>
            </form>
        </div>
    )
}

export default LoginScreen
