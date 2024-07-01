const LoginPage = () => {
    useEffect(() => {
        fetch('http://localhost:3000/current_user')
            .then(response => response.json())
            .then(data => {
                if (data) {
                    window.location.href = '/letters';
                }
            });
    }, []);

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

export default LoginPage;