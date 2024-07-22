import * as styles from './App.module.scss';
import { useState } from 'react';
import { Link/* , Outlet */ } from 'react-router-dom';
import Content from './Content/Content';
import react from '@/assets/images/png/react.png';
import webpack from '@/assets/images/jpeg/webpack.jpg';
import AvatarSvg from '@/assets/images/svg/placeholderAvatar.svg';

// TREE SHAKING
function TODO(a: number) {
    console.log(a);
}

export default function App() {
    const [ count, setCount ] = useState<number>(0);

    const increment = () => setCount(prev => prev + 1);
    TODO(5123);

    return (
        <div className={styles.wrapper}>
            <div className={styles.imagesBlock}>
                <img className={styles.reactImg} src={react} alt={'react'}/>
                <img className={styles.webpackImg} src={webpack} alt={'webpack'}/>
            </div>
            <div>
                <AvatarSvg className={styles.icon} width={70} height={70} fill={'#fff'}/>
            </div>
            <div className={styles.linksBlock}>
                <p>Pages:</p>
                <Link to={'/about'} className={styles.link}>About</Link>
                <Link to={'/shop'} className={styles.link}>Shop</Link>
            </div>
            <div className={styles.counterblock}>
                <h1 className={styles.value}>{count}</h1>
                <button className={styles.button} onClick={increment}>
                    counter
                </button>
            </div>
            <Content/>
            {/* <Outlet/> */}
        </div>
    );
}