import React from 'react';
import MyButton from '../utils/button';
import Login from './login'

const RegisterLogin = () => {
    return (
        <div className='page_wrapper'>
            <div className='container'>
                <h1 className='registerHeader'>Welcome</h1>
                <div className='register_login_container'>
                    
                    <div className='left'>
                        <h1>New users</h1>
                        <p>Login here to track all of your jobs, add notes, and see what is and what isnt working during your job search!</p>
                        <MyButton
                            type='default'
                            title='Create an account'
                            linkTo='/register'
                            addStyles={{
                                margin: '10px 0 0 0'
                            }}
                        />
                    </div>
                    <div className='right'>
                        <h1>Login</h1>
                        <p>Please login if you already have an account</p>
                        <Login/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RegisterLogin;