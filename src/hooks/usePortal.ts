import { useState, useEffect, useRef, ReactNode, HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export default function usePortal() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const elRef = useRef<HTMLDivElement | null>(document.createElement('div'));

    const openPortal = () => {
        setIsOpen(true);
        //setTimeout(() => document.addEventListener('click', handleClickOutside), 200);
    };

    const closePortal = () => {
        setIsOpen(false);
        //document.removeEventListener('click', handleClickOutside);
    };
    
    useEffect(() => {
        const modalRoot = document.getElementById('modal');
        if (modalRoot && elRef.current) {
            modalRoot.appendChild(elRef.current);
        }

        return () => {
            if (elRef.current) {
                modalRoot?.removeChild(elRef.current);
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