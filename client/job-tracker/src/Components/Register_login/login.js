import React, { Component } from 'react';
import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions'

import { connect } from 'react-redux';
import { loginUser } from '../../actions/user_actions'

class Login extends Component {


     state = {
         formError: false,
         formSuccess: '',
         formdata: {
             email: {
                 element: 'input',
                 value: '',
                 config: {
                     name: 'email_input',
                     type: 'email',
                     placeholder: 'Enter your email'
                 },
                 validation: {
                     required: true,
                     email: true
                 },
                 valid: false,
                 touched: false,
                 validationMessage: ''
             },
             password: {
                 element: 'input',
                 value: '',
                 config: {
                     name: 'password_input',
                     type: 'password',
                     placeholder: 'Enter your password'
                 },
                 validation: {
                     required: true
                 },
                 valid: false,
                 touched: false,
                 validationMessage: ''
             }
         }
     }

    submitForm = (event) => {
        event.preventDefault();
        // going to turn the data to key value pairs == so we have just the name and value

        let dataToSubmit = generateData(this.state.formdata, 'login')
        let formIsValid = isFormValid(this.state.formdata, 'login');

        if(formIsValid){
            this.props.dispatch(loginUser(dataToSubmit)); // dispatch comes from redux
        } else {
            this.setState({
                formError: true
            })
        }

        console.log(dataToSubmit)
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'login');
        this.setState({
            formError: false,
            formdata: newFormdata
        })

    }

    render() {
        return (
            <div className="signin_wrapper">
                <form onSubmit={(event)=> this.submitForm(event)}>
                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element)=> this.updateForm(element)}
                    />
                    <FormField
                        id={'password'}
                        formdata={this.state.formdata.password}
                        change={(element)=> this.updateForm(element)}
                    />

                    { this.state.formError ? 
                    <div className='error_label'>
                        Please check your data
                    </div>
                    :null
                    } 
                    <button onClick={(event)=> this.submitForm(event)}>Login</button>

                </form>
            </div>
        );
    }
}



export default connect()(Login);