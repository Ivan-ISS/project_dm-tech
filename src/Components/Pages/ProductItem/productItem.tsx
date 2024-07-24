import * as styles from './productItem.module.scss';
import { useParams } from 'react-router-dom';

export default function ProductItem() {
    const { id } = useParams();
    // const product = products.find(product => product.id === id);
    console.log(useParams());

    return (
        <div className={styles.productItem}>
            {id}
        </div>
    );
}