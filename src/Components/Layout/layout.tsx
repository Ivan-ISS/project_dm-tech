import * as styles from './layout.module.scss';
import { navigationItems } from '@/data';
import routes from '@/routes';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import Content from '../Content/content';
import Logo from '../Common/Logo/logo';
import Navigation from '../Common/Navigation/navigation';
import Cart from '../Cart/cart';

export default function Layout() {

    return (
        <div className={styles.layout}>
            <Header>
                <Logo pathLink={routes.products()}/>
                <Navigation navigationItems={navigationItems}/>
                <Cart/>
            </Header>
            <main className={styles.main}>
                <div className={styles.container}>
                    <Content/>
                    Main
                </div>
            </main>
            <Footer>
                Подвал
            </Footer>
        </div>
    );
}