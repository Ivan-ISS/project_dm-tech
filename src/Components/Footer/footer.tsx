import * as styles from './footer.module.scss';
import { PropsWithChildren } from 'react';

export default function Footer({ children }: PropsWithChildren) {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>{children}</div>
        </footer>
    );
}
