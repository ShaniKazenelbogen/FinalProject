import React from 'react';
import './home.css'; 
import { Link } from 'react-router-dom'; //our swagger link!!!
import signIn  from './components/signIn';
//import App from './App';


const App = () => {
    return (
        <div className="container">
            <header className="header">
                <h1>Welcome to Our TherapyCenter</h1>
                <p>You're in the center.</p>
            </header>
            <nav className="navbar">
                <ul>
                    <li><a href="#payment">History</a></li>
                    <li><a href="#history">Payment Status</a></li>
                    <li><a href="#details">Your Personal Details</a></li>
                </ul>
                <button className="Schedule An Appointment">Schedule An Appointment</button>
            </nav>
             <div className="auth-buttons">
                <Link to="/sign-in" className="button">Sign In</Link>
                <Link to="/sign-up" className="button">Sign Up</Link>
            </div>
            <main className="main-content">
                <section id="logo" className="services">                 
                    <img src="" alt="TherapyCenter Logo" className="logo" />
                </section>
                <section className="contact">
                    <h2>Contact Us</h2>
                    <form>
                        <input type="text" placeholder="Your Name" required />
                        <input type="email" placeholder="Your Email" required />
                        <textarea placeholder="Your Message" required></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </section>
            </main>
            <footer className="footer">
                <p>&copy; 2025 TherapyCenter. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;