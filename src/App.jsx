import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Footer from './Components/Footer';
import BootstrapNavbar from './Components/BootstrapNavbar';
import Login from './Pages/Login';
import Singup from './Pages/Singup';
import Courses from './Pages/Courses';
import { useState, useEffect } from 'react';
import Profile from './Pages/Profile';
import CourseDetails from './Pages/CourseDetails';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check localStorage for authentication status when the app initializes
        const authStatus = localStorage.getItem('isAuthenticated');
        if (authStatus === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (userData) => {
        setIsAuthenticated(true);
        // You may also want to set user data in state if needed
    };
    return (
        <Router>
            <BootstrapNavbar />
            <div>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/signup" element={<Singup />} />
                    <Route exact path="/courses" element={<Courses />} />
                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/course-details/:id" element={<CourseDetails />} />

                </Routes>
            </div>
            <Footer />
        </Router>
    )
}

export default App
