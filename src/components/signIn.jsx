// import React from 'react';
// import '../signIn.css'; 

// const SignIn = () => {
//     return (
//         <div className="py-8">
//             <div className="container">
//                 <div className="w-full max-w-md mx-auto my-8">
//                     <div>
//                         <h1 className="plain-page-heading text-center w-full">Sign in</h1>
//                     </div>
//                     <form method="POST" action="http://localhost:5000/api/auth/login">
//                         <input type="hidden" name="_token" value="QDVtdi82AFPvasY9eIcyQheIe3U0bgBMPbMXJ1fm" autoComplete="off" />
//                         <fieldset className="w-full">
//                             <div className="form-control">
//                                 <label className="form-label">
//                                     <span>Email address</span>
//                                 </label>
//                                 <div className="relative w-full">
//                                     <input type="email" name="email" className="form-input" placeholder="" required />
//                                 </div>
//                             </div>
//                             <div className="form-control">
//                                 <div className="flex">
//                                     <div className="w-1/2">
//                                         <label className="form-label">Password</label>
//                                     </div>
//                                     <div className="w-1/2 text-right">
//                                         <a href="http://localhost:5000/auth/forgot-password" className="text-sm pb-2">Forgot password</a>
//                                     </div>
//                                 </div>
//                                 <div className="relative w-full">
//                                     <input type="password" name="password" className="form-input" placeholder="" required />
//                                 </div>
//                             </div>
//                             <button type="submit" className="button w-full text-center button-primary">Sign in</button>
//                         </fieldset>
//                     </form>
//                     <div className="my-7">
//                         <a href="http://localhost:5000/auth/register" className="button w-full text-center button-link">Not registered? Sign up!</a>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignIn;
