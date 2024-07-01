import './outputApp.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

const LoginPage = () => {

    const handleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    };

    return (
        <div>
            <h2>Login Page</h2>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
};
const LettersPage = () => {
    const [letters, setLetters] = useState([]);
    const [user, setUser] = useState(null);

    const fetchLetters = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/letters', {
                credentials: 'include' // Ensure cookies are sent with the request
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setLetters(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetch('http://localhost:3000/current_user')
            .then(response => response.json())
            .then(data => {
                setUser(data);
                if (!data) {
                    window.location.href = '/login';
                } else {
                    fetchLetters();
                }
            });
    }, []);

    if (!user) {
        return <Navigate to="/login"/>;
    }

    return (
        <div>
            <h2>Letters Page</h2>
            {letters.map((letter, index) => (
                <div key={index} className="collapse bg-base-200">
                    <input type="radio" name="my-accordion-1" defaultChecked={index === 0}/>
                    <div className="collapse-title text-xl font-medium">{letter.title}</div>
                    <div className="collapse-content">
                        <p>{letter.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const HomePage = () => {
    return (
        <div>
            <h2>Logged in SUI!</h2>
        </div>
    );
}


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/letters" element={<LettersPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                {/* other routes */}
                <Route path="*" element={<Navigate to="/login"/>}/>

            </Routes>
        </Router>
    );
};
export default App;