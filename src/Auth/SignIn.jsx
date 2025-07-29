import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const USER_TYPE_MAP = {
    0: "Manager",
    1: "Therapist",
    2: "Client"
};

const SignIn = ({ onClose }) => {
    const [id, setId] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('https://localhost:7152/api/Manager/SignIn', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Number(id))
            });

            if (!res.ok) {
                const msg = await res.text();
                setError(msg || 'Could not sign in.');
                return;
            }
            const data = await res.json();

            const mappedUserType = USER_TYPE_MAP[data.userType] || String(data.userType);

            setUser({
                userId: data.userId,
                userType: mappedUserType,
                firstName: data.firstName,
                lastName: data.lastName
            });

            localStorage.setItem("userId", data.userId);
            localStorage.setItem("userType", mappedUserType);
            localStorage.setItem("firstName", data.firstName);
            localStorage.setItem("lastName", data.lastName);

            if (onClose) onClose();
            
            navigate(data.redirectUrl);
        } catch (err) {
            setError('Sign in failed');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                        required
                    />
                    <button type="submit">Sign In</button>
                </form>
                {error && <div className="error-message">{error}</div>}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default SignIn;