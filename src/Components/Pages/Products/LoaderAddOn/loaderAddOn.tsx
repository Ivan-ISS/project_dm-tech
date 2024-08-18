import * as styles from './loaderAddOn.module.scss';
import WheelLoader from '@/Components/Common/Loader/WheelLoader/wheelLoader';

export interface LoaderAddOnProps {
    status: string;
    productsLength: number;
    isPagination: boolean;
}

export default function LoaderAddOn({ status, productsLength, isPagination }: LoaderAddOnProps) {
    return (
        <>
            {status === 'in progress' && (!productsLength || isPagination) ? (
                <div className={styles.elLoader}>
                    <WheelLoader />
                </div>
            ) : null}
        </>
    );
}
