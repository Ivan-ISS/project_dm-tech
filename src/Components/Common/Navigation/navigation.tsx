import * as styles from './navigation.module.scss';
import { INavigationItems } from '@/types/dataTypes';
import { Link, useLocation } from 'react-router-dom';
import Item from '../Item/item';

export interface NavigationProps {
    navigationItems: INavigationItems[];
}

export default function Navigation({ navigationItems }: NavigationProps) {
    const { pathname } = useLocation();

    return (
        <nav className={styles.navigation}>
            <ul className={styles.list}>
                {navigationItems.map((item, index) => (
                    <li key={index}>
                        <Link to={`${item.pathName}`} className={styles.link}>
                            <Item
                                text={item.fieldName}
                                isActive={pathname === item.pathName}
                                interactive={true}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}