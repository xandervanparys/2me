import './outputApp.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import withAuth from './WithAuth';
import LoginPage from './LoginPage';
import LettersPage from './LettersPage';
import HomePage from './HomePage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/letters" element={withAuth(LettersPage)()} />
                <Route path="/home" element={withAuth(HomePage)()} />
                {/* other routes */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
