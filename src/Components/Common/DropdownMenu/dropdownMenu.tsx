import * as styles from './dropdownMenu.module.scss';
import { INavigationItems } from '@/types/dataTypes';
import { HTMLAttributes } from 'react';
import BurgerMenuItems from './BurgerMenuItems/burgerMenuItems';

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
    itemsMenu: INavigationItems[];
    insert: 'burgerMenu' | 'profileMenu';
}

export default function DropdownMenu({ itemsMenu, insert, ...props }: DropdownMenuProps) {

    return (
        <div {...props} className={styles.dropdownMenu}>
            <ul className={styles.itemsList}>
                {itemsMenu.map((item, index) => (
                    <li key={index} className={styles.item}>
                        { insert === 'burgerMenu' && <BurgerMenuItems itemMenu={item.fieldName} path={item.pathName}/> }
                    </li>
                ))}
            </ul>
        </div>
    );
}
