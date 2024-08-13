import * as styles from './groupMessage.module.scss';
import { IResultValidateCart } from '@/types/dataTypes';

export interface IGroupMessageProps {
    resValidate: IResultValidateCart;
}

export default function GroupMessage({ resValidate }: IGroupMessageProps) {

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