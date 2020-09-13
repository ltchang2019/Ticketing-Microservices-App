import { useState } from 'react';

import useRequest from '../../hooks/useRequest';

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { makeRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email,
            password
        }
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        
        makeRequest();
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group">
                <label>Email</label>
                <input 
                    className="form-control"
                    value={email}
                    onChange={ e => setEmail(e.target.value) }
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input 
                    type="password" 
                    className="form-control"
                    value={password}
                    onChange={ e => setPassword(e.target.value) }
                />
            </div>

            {errors}
            <button className="btn btn-primary">Sign Up</button>
        </form>
    );
}