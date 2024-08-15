import * as styles from './groupMessage.module.scss';
import { IResultValidateCart } from '@/types/dataTypes';

export interface GroupMessageProps {
    resValidate: IResultValidateCart;
}

export default function GroupMessage({ resValidate }: GroupMessageProps) {

    return (
        <>
            {
                !resValidate.maxPrice.isValid &&
                <div className={styles.errorMessage}>
                    {resValidate.maxPrice.error}
                </div>
            }
            {
                !resValidate.maxQuantity.isValid &&
                <div className={styles.errorMessage}>
                    {resValidate.maxQuantity.error}
                </div>
            }
        </>
    );
}