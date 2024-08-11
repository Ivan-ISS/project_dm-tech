import { useState, useEffect, useRef, useCallback, ReactNode, HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export default function usePortal() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const elRef = useRef<HTMLDivElement | null>(document.createElement('div'));

    const openPortal = useCallback(() => {
        setIsOpen(true);
        //setTimeout(() => document.addEventListener('click', handleClickOutside), 200);
    }, []);

    const closePortal = useCallback(() => {
        setIsOpen(false);
        //document.removeEventListener('click', handleClickOutside);
    }, []);
    
    useEffect(() => {
        const modalRoot = document.getElementById('modal');
        if (modalRoot && elRef.current) {
            modalRoot.appendChild(elRef.current);
        }

        const currentEl = elRef.current;

        return () => {
            if (currentEl) {
                modalRoot?.removeChild(currentEl);
            }
        };
    }, []);

    function Portal({ children }: PortalProps) {
        if (elRef.current) {
            return createPortal(children, elRef.current);
        }
    }

    /* const handleClickOutside = (event: MouseEvent) => {
        if (elRef.current && !elRef.current.contains(event.target as Node)) {
            closePortal();
        }
    }; */

    return (
        {
            isOpenPortal: isOpen,
            openPortal,
            closePortal,
            Portal
        }
    );
}