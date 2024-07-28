import * as styles from './cart.module.scss';
import CartIcon from '@/assets/images/svg/cart.svg';
import Item from '../Common/Item/item';
import useScreenSize from '@/hooks/useScreenSize';

export default function Cart() {
    const [ screenWidth ] = useScreenSize();

    return (
        <div className={styles.cart}>
            <CartIcon width={20} height={20}/>
            <Item text={screenWidth > 560 ? 'Корзина' : ''} value={5}/>
        </div>
    );
}