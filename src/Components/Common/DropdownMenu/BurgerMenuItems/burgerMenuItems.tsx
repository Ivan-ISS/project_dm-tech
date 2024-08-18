import * as styles from './burgerMenuItems.module.scss';
import { Link, useLocation } from 'react-router-dom';

export interface BurgerMenuItemsProps {
    itemMenu: string;
    path: string;
}

export default function BurgerMenuItems({ itemMenu, path }: BurgerMenuItemsProps) {
    const { pathname } = useLocation();

    return (
        <Link to={path} className={`${styles.link} ${pathname === path && styles.active}`}>
            {itemMenu}
        </Link>
    );
}
