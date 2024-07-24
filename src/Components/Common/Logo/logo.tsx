import * as styles from './logo.module.scss';
import { Link } from 'react-router-dom';
import LogoIcon from '@/assets/images/svg/logo.svg';

export interface LogoProps {
    pathLink: string;
}

export default function Logo({ pathLink, ...props }: LogoProps) {

    return (
        <>
            <Link to={pathLink} className={styles.link}>
                <LogoIcon {...props} className={styles.logo}/>
            </Link>
        </>
    );
}