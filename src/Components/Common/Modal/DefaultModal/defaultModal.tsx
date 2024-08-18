import * as styles from './defaultModal.module.scss';
import { useState, useEffect, HTMLAttributes, ReactNode } from 'react';
import CloseButton from '../../Buttons/CloseButton/closeButton';

export interface DefaultModalProps extends HTMLAttributes<HTMLDivElement> {
    closeModal: () => void;
    insert: JSX.Element | ReactNode;
    overlay?: boolean;
}

export default function DefaultModal({ closeModal, insert, overlay, ...props }: DefaultModalProps) {
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
