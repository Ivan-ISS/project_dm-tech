import * as styles from './layout.module.scss';
import { navigationItems } from '@/data';
import routes from '@/routes';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import Content from '../Content/content';
import Logo from '../Common/Logo/logo';
import Navigation from '../Common/Navigation/navigation';
import Cart from '../Cart/cart';
import BurgerButton from '../Common/BurgerButton/burgerButton';
import DropdownMenu from '../Common/DropdownMenu/dropdownMenu';
import CartModal from '../Common/Modal/CartModal/cartModal';
import CartWidget from '../CartWidget/cartWidget';
import usePortal from '@/hooks/usePortal';

export default function Layout() {
    const { isOpenPortal, openPortal, closePortal, Portal } = usePortal();
    
    return (
        <div className={styles.layout}>
            <Header>
                <BurgerButton>
                    <DropdownMenu itemsMenu={navigationItems} insert={'burgerMenu'}/>
                </BurgerButton>
                <Logo pathLink={routes.products()}/>
                <Navigation navigationItems={navigationItems}/>
                <Cart onClick={!isOpenPortal ? openPortal : closePortal}/>
            </Header>
            <main className={styles.main}>
                <div className={styles.container}>
                    <Content/>
                </div>
            </main>
            <Footer>
                Подвал
            </Footer>
            { isOpenPortal && <Portal><CartModal insert={<CartWidget/>}/></Portal> }
        </div>
    );
}