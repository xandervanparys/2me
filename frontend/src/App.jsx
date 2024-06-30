import React, {useState} from 'react';
import './outputApp.css';

function App() {
    const [letters, setLetters] = useState([]);

    const fetchLetters = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/letters');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setLetters(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            <button onClick={fetchLetters} className="btn w-64 rounded-full btn-primary">
                Fetch Letters
            </button>
            <div className="accordion my-8">
                {letters.map((letter, index) => (
                    <div key={index} className="collapse collapse-arrow bg-base-200 mb-4">
                        <input type="radio" name="my-accordion-1" defaultChecked={index === 0}/>
                        <div className="collapse-title text-xl font-medium">{letter.title}</div>
                        <div className="collapse-content">
                            <p>{letter.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
