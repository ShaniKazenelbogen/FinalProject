import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import About from './components/About.jsx';
import History from './components/History.jsx';
import Register from './Auth/Register.jsx';
import SignIn from './Auth/SignIn.jsx';
import { UserProvider, useUser } from './UserContext';
import './app.css';
import TherapistDashboard from './dashboards/TherapistDashboard.jsx';
import ClientDashboard from './dashboards/ClientDashboard.jsx';
import ManagerDashboard from './dashboards/ManagerDashboard.jsx';
import RequireAuth from './Auth/RequireAuth.jsx';

const WelcomeMessage = () => {
    const { user } = useUser();
    return user ? <h2>Welcome {user.firstName} {user.lastName}</h2> : null;
};

const AppContent = ({
    isSignInModalOpen,
    setIsSignInModalOpen,
}) => {
    const { user } = useUser();
    const location = useLocation();
    const navigate = useNavigate();
    const [question, setQuestion] = useState("");
    const [email, setEmail] = useState("");
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    // Utility to always get userType as string
    const getUserTypeStr = (user) => {
        if (!user) return "";
        return typeof user.userType === 'string'
            ? user.userType
            : user.userType?.toString?.() || String(user.userType);
    };


    useEffect(() => {
        if (!user && !isSignInModalOpen) {
            setIsSignInModalOpen(true);
        }
    }, [user, isSignInModalOpen, setIsSignInModalOpen]);

    const handleSend = (e) => {
        e.preventDefault();
        setQuestion("");
        setEmail("");
        alert("Your question has been sent!");
    };

    const showRegisterButton = user && getUserTypeStr(user) === "Manager";

    return (
        <div className="front-page-container">
            <div className="top-bar">
                <div className="navigation-list">
                    <Link to="/about" className="nav-item">About</Link>
                    <Link to="/history" className="nav-item">History</Link>
                </div>
                <div className="top-buttons">
                    {showRegisterButton && (
                        <button className="top-btn" onClick={() => setIsRegisterModalOpen(true)}>Register</button>
                    )}
                    <button className="top-btn" onClick={() => setIsSignInModalOpen(true)}>Sign In</button>
                </div>
            </div>
            <div className="center-title">Therapy Center</div>
            <WelcomeMessage />

            {isRegisterModalOpen && (
                <Register onClose={() => setIsRegisterModalOpen(false)} />
            )}
            {isSignInModalOpen && (
                <SignIn onClose={() => setIsSignInModalOpen(false)} />
            )}

            <Routes>
                {/* Dashboards are protected */}
                <Route
                    path="/dashboards/TherapistDashboard"
                    element={
                        <RequireAuth allowedTypes={["Therapist"]}>
                            <TherapistDashboard />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/dashboards/ClientDashboard"
                    element={
                        <RequireAuth allowedTypes={["Client"]}>
                            <ClientDashboard />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/dashboards/ManagerDashboard"
                    element={
                        <RequireAuth allowedTypes={["Manager"]}>
                            <ManagerDashboard />
                        </RequireAuth>
                    }
                />
                
                <Route path="/about" element={<About />} />
                <Route path="/history" element={<History />} />
                
                <Route path="*" element={<Navigate to={
                    user
                        ? (
                            (() => {
                                const userTypeStr = getUserTypeStr(user);
                                if (userTypeStr === "Therapist") return "/dashboards/TherapistDashboard";
                                if (userTypeStr === "Manager") return "/dashboards/ManagerDashboard";
                                return "/dashboards/ClientDashboard";
                            })()
                        )
                        : "/"
                } />} />
            </Routes>
            <form className="bottom-bar" onSubmit={handleSend}>
                <input
                    type="text"
                    className="question-input"
                    placeholder="Your question..."
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                />
                <input
                    type="email"
                    className="email-input"
                    placeholder="Your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button type="submit" className="send-btn">Send</button>
            </form>
        </div>
    );
};

const App = () => {
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

    return (
        <UserProvider>
            <Router>
                <AppContent
                    isSignInModalOpen={isSignInModalOpen}
                    setIsSignInModalOpen={setIsSignInModalOpen}
                />
            </Router>
        </UserProvider>
    );
};

export default App;