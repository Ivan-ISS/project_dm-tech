import * as styles from './loaderAddOn.module.scss';
import Loader from '@/Components/Common/Loader/loader';

export interface LoaderAddOnProps {
    status: string;
    productsLength: number;
    isPagination: boolean;
}

export default function LoaderAddOn({ status, productsLength, isPagination }: LoaderAddOnProps) {

    return (
        <>
            { status === 'in progress' && 
                (!productsLength || isPagination) ? (
                    <div className={styles.elLoader}>
                        <Loader/>
                    </div>
                ) : (
                    null
                )
            }
        </>
    );
}