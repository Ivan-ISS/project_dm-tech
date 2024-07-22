import * as styles from './App.module.scss';
import { useState } from 'react';
import { Link/* , Outlet */ } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { selectCounter } from '@/redux/slices/firstSelector';
import { inc } from '@/redux/slices/firstSlice';
import Content from '@/Components/Content/Content';
import react from '@/assets/images/png/react.png';
import webpack from '@/assets/images/jpeg/webpack.jpg';
import AvatarSvg from '@/assets/images/svg/placeholderAvatar.svg';


export default function App() {
    const [ count, setCount ] = useState<number>(0);
    const counter = useAppSelector(selectCounter);
    const dispatch = useAppDispatch();

    const handleIncrementState = () => setCount(prev => prev + 1);
    const handleIncrementRedux = () => dispatch(inc());

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
                <div className={styles.counterState}>
                    <h1 className={styles.value}>{count}</h1>
                    <button className={styles.button} onClick={handleIncrementState}>
                        counter state
                    </button>
                </div>
                <div className={styles.counterStore}>
                    <h1 className={styles.value}>{counter}</h1>
                    <button className={styles.button} onClick={handleIncrementRedux}>
                        counter redux
                    </button>
                </div>
            </div>
            <Content/>
            {/* <Outlet/> */}
        </div>
    );
}