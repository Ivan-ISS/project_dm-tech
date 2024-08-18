import { useState, useEffect, useRef } from 'react';

export default function useCloseOut() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const targetElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (targetElement.current && !targetElement.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleClick = () => {
        setIsOpen((v) => !v);
    };

    return { isOpen, handleClick, targetElement };
}
