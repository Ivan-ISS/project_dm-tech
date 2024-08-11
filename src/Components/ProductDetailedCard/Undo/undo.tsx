import * as styles from './undo.module.scss';
import ArrowUndo from '@/assets/images/svg/arrowUndo.svg';
import Item from '../../Common/Item/item';

export default function IconButton() {

    return (
        <div className={styles.undo}>
            <ArrowUndo className={styles.arrowUndo} width={20} height={20}/>
            <Item text={'Условия возврата'}/>
        </div>
    );
}