import * as styles from './notFound.module.scss';
import { useNavigate } from 'react-router-dom';
import routes from '@/routes';
import PrimaryButton from '../../Common/Buttons/PrimaryButton/primaryButton';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <section className={styles.notFound}>
            <h1 className={styles.title}>404</h1>
            <div className={styles.shadow}></div>
            <p className={styles.text}>Такой страницы не существует</p>
            <div className={styles.elButton}>
                <PrimaryButton
                    text={'На страницу товаров'}
                    onClick={() => navigate(routes.products())}
                />
            </div>
        </section>
    );
}
