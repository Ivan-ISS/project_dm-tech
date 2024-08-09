import * as styles from './orderModal.module.scss';
import { HTMLAttributes, useState, useEffect, ReactNode } from 'react';
import CloseButton from '../../CloseButton/closeButton';

export interface DefaultModalProps extends HTMLAttributes<HTMLDivElement>{
    closeModal: () => void;
    insert: JSX.Element | ReactNode;
    overlay?: boolean;
}

export default function DefaultModal({ closeModal, insert, overlay, ...props }: DefaultModalProps) {
    const [ show, setShow ] = useState<boolean>(false);

    useEffect(() => {
        setShow(v => !v);
    }, []);

    const handleClick = () => {
        setShow(v => !v);
        setTimeout(closeModal, 300);
    };

    return (
        <>
            {
                overlay ?
                <div className={`${styles.overlay} ${show ? styles.overlayShow : null}`}/> :
                null 
            }
            <div {...props} className={`${styles.modal} ${show ? styles.modalShow : null}`}>
                <div className={styles.topPanel}>
                    <CloseButton show={show} onClick={handleClick}></CloseButton>
                </div>
                {insert}
            </div>
        </>
    );
}