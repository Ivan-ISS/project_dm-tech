import * as styles from './App.module.scss';
import { useState } from 'react';

export default function App() {
    const [ count, setCount ] = useState<number>(0);

    const increment = () => setCount(prev => prev + 1);

    return (
        <div>
            <h1 className={styles.value}>{count}</h1>
            <button className={styles.button} onClick={increment}>
                <span>inc</span>
            </button>
        </div>
    );
}