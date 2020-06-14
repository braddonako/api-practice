import axios from 'axios';
import {
    LOGIN_USER,
} from './types';

import {
    USER_SERVER
} from '../Components/utils/misc';

export function loginUser(dataToSubmit) {

    const request = axios.post(`http://localhost:3002/users/api/login`, dataToSubmit, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    })
        .then(response => response.data).catch(error => {
            console.log(error.response)
        });

    return {
        type: LOGIN_USER,
        payload: request
    }

}
