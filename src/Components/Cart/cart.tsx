import * as styles from './cart.module.scss';
import CartIcon from '@/assets/images/svg/cart.svg';
import Item from '../Common/Item/item';

export default function Cart() {

    return (
        <div className={styles.cart}>
            <CartIcon width={20} height={20}/>
            <Item text={'Корзина'} value={5}/>
        </div>
    );
}