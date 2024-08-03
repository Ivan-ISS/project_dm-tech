import * as styles from './cartModal.module.scss';
import { HTMLAttributes, useState, useEffect, ReactNode } from 'react';

export interface ModalProps extends HTMLAttributes<HTMLDivElement>{
    insert: JSX.Element | ReactNode;
}

export default function Modal({ insert, ...props }: ModalProps) {
    const [ show, setShow ] = useState<boolean>(false);

    useEffect(() => {
        setShow(v => !v);
    }, []);

    return (
        <>
            <div {...props} className={`${styles.modal} ${show ? styles.modalShow : null}`}>
                {insert}
            </div>
        </>
    );
}