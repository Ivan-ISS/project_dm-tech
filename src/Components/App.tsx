import './App.scss';
import { useState } from 'react';

export default function App() {
    const [ count, setCount ] = useState<number>(0);

    const increment = () => setCount(prev => prev + 1);

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>
                <span>inc</span>
            </button>
        </div>
    );
}