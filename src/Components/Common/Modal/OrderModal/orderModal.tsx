import * as styles from './orderModal.module.scss';
import { useState, useEffect, HTMLAttributes, ReactNode } from 'react';
import CloseButton from '../../Buttons/CloseButton/closeButton';

export interface OrderModalProps extends HTMLAttributes<HTMLDivElement> {
    closeModal: () => void;
    insert: JSX.Element | ReactNode;
    overlay?: boolean;
}

export default function OrderModal({ closeModal, insert, overlay, ...props }: OrderModalProps) {
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        setShow((v) => !v);
    }, []);

    const handleClickBtn = () => {
        setShow((v) => !v);
        setTimeout(closeModal, 300);
    };

    return (
        <>
            {overlay ? (
                <div className={`${styles.overlay} ${show ? styles.overlayShow : null}`} />
            ) : null}
            <div {...props} className={`${styles.modal} ${show ? styles.modalShow : null}`}>
                <div className={styles.topPanel}>
                    <CloseButton show={show} onClick={handleClickBtn}></CloseButton>
                </div>
                {insert}
            </div>
        </>
    );
}
