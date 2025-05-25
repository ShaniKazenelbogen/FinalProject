// import React from 'react';

// const RegistrationForm = () => {
//     const [formData, setFormData] = useState({
//         first_name: '',
//         last_name: '',
//         email: '',
//         password: '',
//         password_confirmation: ''
//     });

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
        
//         try {
//             const response = await fetch('https://www.londonsocialworkforchildren.com/auth/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ ...formData, _token: 'QDVtdi82AFPvasY9eIcyQheIe3U0bgBMPbMXJ1fm' }),
//             });

//             if (response.ok) {
//                 // Handle successful registration
//                 const data = await response.json();
//                 console.log('Registration successful:', data);
//             } else {
//                 // Handle errors
//                 console.error('Registration failed:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error during registration:', error);
//         }
//     };

//     return (
//         <div className="container">
//             <div className="w-full max-w-md mx-auto my-8">
//                 <h1 className="plain-page-heading text-center w-full mb-12">Register for LSWC</h1>
                
//                 <form onSubmit={handleSubmit}>
//                     <input type="hidden" name="_token" value="QDVtdi82AFPvasY9eIcyQheIe3U0bgBMPbMXJ1fm" autoComplete="off" />
                    
//                     <fieldset className="w-full">
//                         <div className="form-control">
//                             <label className="form-label">First name</label>
//                             <div className="relative w-full">
//                                 <input type="text" name="first_name" className="form-input" value={formData.first_name} onChange={handleChange} />
//                             </div>
//                         </div>

//                         <div className="form-control">
//                             <label className="form-label">Last name</label>
//                             <div className="relative w-full">
//                                 <input type="text" name="last_name" className="form-input" value={formData.last_name} onChange={handleChange} />
//                             </div>
//                         </div>

//                         <div className="form-control">
//                             <label className="form-label">Email address</label>
//                             <div className="relative w-full">
//                                 <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} />
//                             </div>
//                         </div>

//                         <div className="form-control">
//                             <label className="form-label">Password</label>
//                             <div className="relative w-full">
//                                 <input type="password" name="password" className="form-input" value={formData.password} onChange={handleChange} />
//                             </div>
//                         </div>

//                         <div className="form-control">
//                             <label className="form-label">Confirm password</label>
//                             <div className="relative w-full">
//                                 <input type="password" name="password_confirmation" className="form-input" value={formData.password_confirmation} onChange={handleChange} />
//                             </div>
//                         </div>

//                         <button type="submit" className="button w-full text-center button-primary">Register</button>
//                         <p className="flex justify-end mt-4">Already have an account? <a className="ml-2" href="https://www.londonsocialworkforchildren.com/auth/login">Sign in</a></p>
//                     </fieldset>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default RegistrationForm;
