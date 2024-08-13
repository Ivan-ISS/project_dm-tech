import * as styles from './singleMessage.module.scss';
import { IResultValidateCart } from '@/types/dataTypes';

export interface ISingleMessageProps {
    resValidate: IResultValidateCart;
    itemId: string;
}

export default function SingleMessage({ resValidate, itemId }: ISingleMessageProps) {

    return (
        <>
            {
                resValidate.warnQuantity.productId.find(id => id === itemId) &&
                <div className={styles.warningMessage}>
                    {resValidate.warnQuantity.warning}
                </div>
            }
            {
                resValidate.maxQuantity.productId.find(id => id === itemId) &&
                <div className={styles.errorMessage}>
                    {resValidate.maxQuantity.error}
                </div>
            }
        </>
    );
}