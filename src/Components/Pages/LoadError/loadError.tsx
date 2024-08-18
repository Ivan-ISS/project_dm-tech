import * as styles from './loadError.module.scss';
import { useNavigate } from 'react-router-dom';
import routes from '@/routes';
import PrimaryButton from '../../Common/Buttons/PrimaryButton/primaryButton';

export interface LoadErrorProps {
    text: string;
}

export default function LoadError({ text }: LoadErrorProps) {
    const navigate = useNavigate();

    return (
        <section className={styles.error}>
            <h1 className={styles.titleError}>404</h1>
            <div className={styles.shadow}></div>
            <p className={styles.textError}>{text}</p>
            <PrimaryButton
                text={'На страницу товаров'}
                onClick={() => navigate(routes.products())}
            />
        </section>
    );
}
