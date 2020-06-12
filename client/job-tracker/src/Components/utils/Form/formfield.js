import React from 'react';

const Formfield = ({formdata, change, id}) => {


    // this is a function that will let the user know they MUST enter a username and password == it is required
    const showError = () => {
        let errorMessage = null;

        if(formdata.validation && !formdata.valid){
            errorMessage = (
                <div className="error_label">
                    {formdata.validationMessage}
                </div>
            )
        }

        return errorMessage;
    }
   
    const renderTemplate = () => {

        let formTemplate = '';

        switch(formdata.element){
            case('input'):
                formTemplate = (
                    <div className='formBlock'>
                        <input
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event)=> change({event, id, blur:true})} // blur checks if something has been entered or not
                            onChange={(event)=> change({event,id})}
                        />

                        {showError()}
                    </div>
                )
            break;
            default:
                formTemplate = '';
        }

        return formTemplate;

    }
   
    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default Formfield;