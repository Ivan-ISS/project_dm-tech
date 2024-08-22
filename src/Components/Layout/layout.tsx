import * as styles from './layout.module.scss';
import { navigationItems } from '@/data';
import { useEffect } from 'react';
import { useAppSelector } from '@/redux/store';
import { selectSingleOrder } from '@/redux/slices/ordersSlice/ordersSelector';
import usePortal from '@/hooks/usePortal';
import routes from '@/routes';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import Content from '../Content/content';
import Logo from '../Common/Logo/logo';
import Navigation from '../Common/Navigation/navigation';
import Cart from '../Cart/cart';
import BurgerButton from '../Common/Buttons/BurgerButton/burgerButton';
import DropdownMenu from '../Common/DropdownMenu/dropdownMenu';
import DefaultModal from '../Common/Modal/DefaultModal/defaultModal';

export default function Layout() {
    const singleOrder = useAppSelector(selectSingleOrder);
    const { isOpenPortal, openPortal, closePortal, Portal } = usePortal();

    useEffect(() => {
        if (singleOrder.length) {
            openPortal();
            setTimeout(closePortal, 1500);
        }
    }, [closePortal, openPortal, singleOrder]);

    return (
        <div className={styles.layout}>
            <Header>
                <BurgerButton>
                    <DropdownMenu itemsMenu={navigationItems} insert={'burgerMenu'} />
                </BurgerButton>
                <Logo pathLink={routes.products()} />
                <Navigation navigationItems={navigationItems} />
                <Cart />
            </Header>
            <main className={styles.main}>
                <div className={styles.container}>
                    <Content />
                </div>
            </main>
            <Footer></Footer>
            {isOpenPortal && (
                <Portal>
                    <DefaultModal
                        insert={<div style={{ textAlign: 'center' }}>Ваш заказ оформлен</div>}
                        overlay={true}
                        closeModal={closePortal}
                    />
                </Portal>
            )}
        </div>
    );
}
