import * as styles from './defaultModal.module.scss';
import { HTMLAttributes, ReactNode } from 'react';
import CloseButton from '../../Buttons/CloseButton/closeButton';

export interface DefaultModalProps extends HTMLAttributes<HTMLDivElement> {
    closeModal: () => void;
    insert: JSX.Element | ReactNode;
    overlay?: boolean;
}

export default function DefaultModal({ closeModal, insert, overlay, ...props }: DefaultModalProps) {
    return (
        <>
            {overlay ? <div className={styles.overlay} /> : null}
            <div {...props} className={styles.modal}>
                <div className={styles.topPanel}>
                    <CloseButton show={true} onClick={closeModal}></CloseButton>
                </div>
                {insert}
            </div>
        </>
    );
}
