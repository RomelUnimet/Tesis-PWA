import React from 'react'
import { useDispatch } from 'react-redux'
import { startRegister } from '../../actions/auth';
//import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm'

import '../../scss/auth/register.scss'

export const RegisterScreen = () => {


    const dispatch = useDispatch();

    const [ formValues, handleRegisterInputChange ] = useForm({
        email:'',
        password: ''
    })

    const { email, password } = formValues;

    const handleRegister = ( e ) =>{
        e.preventDefault();

        //la cosa de swall esta cool

        //Login Validation
        //dispatch( startLogin(email, password)); 
        dispatch( startRegister( email, password )); 
    }

    return (

        <div className="register-container">

            <h1 className="register-title">Create Account</h1>

            <div className="icon-container">
                <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg"
                    className="register-icon"
                >
                    <path d="M30.5455 0H1.45455C0.65 0 0 0.670312 0 1.5V40.5C0 41.3297 0.65 42 1.45455 42H30.5455C31.35 42 32 41.3297 32 40.5V1.5C32 0.670312 31.35 0 30.5455 0ZM18.7273 3.375H23.0909V13.2141L20.9773 11.625L18.7273 13.2844V3.375ZM28.7273 38.625H3.27273V3.375H16V17.2922C16 17.4469 16.0455 17.6016 16.1364 17.7281C16.1915 17.8086 16.2617 17.8769 16.3426 17.9293C16.4236 17.9816 16.5138 18.0168 16.6081 18.033C16.7024 18.0491 16.7988 18.0458 16.8918 18.0232C16.9848 18.0007 17.0726 17.9593 17.15 17.9016L20.9591 15.0938L24.6591 17.8781C24.7818 17.9719 24.9318 18.0234 25.0864 18.0234C25.4864 18.0234 25.8136 17.6859 25.8136 17.2734V3.375H28.7227V38.625H28.7273Z" />
                </svg>
            </div>


            <form onSubmit={ handleRegister }
             className="form-container"
             >
                <input 

                    type="text"
                    className="register-input"
                    placeholder="Email"
                    name="email"
                    value={ email }
                    onChange={ handleRegisterInputChange }
                />

                <input

                    type="password"
                    className="register-input"
                    placeholder="Password"
                    name="password"
                    value={ password }
                    onChange={ handleRegisterInputChange }
                />

                <button 
                    type="submit"
                    onClick={handleRegister}
                    className="btn-register" 
                    
                > 
                        Sign up 
                </button>
            </form>

            
        </div>
    )
}

