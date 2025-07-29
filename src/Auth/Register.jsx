import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onClose }) => {
  const [userType, setUserType] = useState('therapist');
  const [therapistId, setTherapistId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [celNumber, setCelNumber] = useState('');
  const [spacialization, setSpacialization] = useState('');
  const [adress, setAdress] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    let userData;

    if (userType === 'therapist') {
      userData = {
        TherapistId: therapistId,
        FirstName: firstName,
        LastName: lastName,
        CelNumber: celNumber,
        Email: email,
        Spacialization: spacialization,
        Password: password, 
      };
      const apiUrl = `https://localhost:7152/api/Manager/AddTherapist`;

      try {
        const response = await axios.post(apiUrl, userData);
        alert(response.data);
        onClose();
      } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data);
        } else {
          setError('An error occurred');
        }
      }
    } else {
      userData = {
        TherapistId: therapistId,
        FirstName: firstName,
        LastName: lastName,
        CelNumber: celNumber,
        Email: email,
        Adress: adress,
        Password: password, // Include password in user data
      };
      const apiUrl = `https://localhost:7152/api/Manager/AddClient`;

      try {
        const response = await axios.post(apiUrl, userData);
        alert(response.data);
        onClose();
      } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data);
        } else {
          setError('An error occurred');
        }
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label>
              <input type="radio" value="therapist" checked={userType === 'therapist'} onChange={() => setUserType('therapist')} />
              Therapist
            </label>
            <label>
              <input type="radio" value="client" checked={userType === 'client'} onChange={() => setUserType('client')} />
              Client
            </label>
          </div>
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          {userType === 'therapist' && (
            <>
              <input type="text" placeholder="Therapist ID" value={therapistId} onChange={(e) => setTherapistId(e.target.value)} required />
              <input type="text" placeholder="Spacialization" value={spacialization} onChange={(e) => setSpacialization(e.target.value)} required />
            </>
          )}
          {userType === 'client' && (
            <input type="text" placeholder="Address" value={adress} onChange={(e) => setAdress(e.target.value)} required />
          )}
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="number" placeholder="Cell Number" value={celNumber} onChange={(e) => setCelNumber(e.target.value)} required />
          <input type="password" placeholder="Password (at least 8 characters)" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Register</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Register;
