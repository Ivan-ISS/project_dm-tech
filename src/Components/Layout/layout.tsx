import * as styles from './layout.module.scss';
import { navigationItems } from '@/data';
import { useEffect } from 'react';
import { useAppSelector } from '@/redux/store';
import { selectSingleOrder } from '@/redux/slices/ordersSlice/ordersSelector';
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
import CartModal from '../Common/Modal/CartModal/cartModal';
import CartWidget from '../CartWidget/cartWidget';
import usePortal from '@/hooks/usePortal';

export default function Layout() {
    const singleOrder = useAppSelector(selectSingleOrder);
    const { isOpenPortal, openPortal, closePortal, Portal } = usePortal();
    const {
        isOpenPortal: isOpenOrder,
        openPortal: openOrder,
        closePortal: closeOrder,
        Portal: Order
    } = usePortal();

    useEffect(() => {
        if (singleOrder.length) {
            openOrder();
            setTimeout(closeOrder, 3000);
        }
    }, [singleOrder]);
    
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
            { isOpenPortal && <Portal><CartModal insert={<CartWidget handleClickProduct={closePortal}/>}/></Portal> }
            { isOpenOrder && <Order><DefaultModal insert={<div style={{ textAlign: 'center' }}>Ваш заказ оформлен</div>} closeModal={closeOrder}/></Order> }
        </div>
    );
}