import { useEffect, useRef } from 'react';

export interface IUseScrollBot {
    func: () => void;
}

export default function useCloseOut({ func }: IUseScrollBot) {
    const targetElement = useRef<HTMLDivElement>(null);
    let check = true;

    useEffect(() => {
        const root = document.getElementById('root');
        const window = document.documentElement;

        const handleScroll = () => {

            if (root && targetElement.current && check && (window.clientHeight + root.scrollTop - 121 >= targetElement.current.clientHeight)) {
                func();
                check = false;
            }
        };
    
        root?.addEventListener('scroll', handleScroll);
    
        return () => {
            root?.removeEventListener('scroll', handleScroll);
        };
    }, [func]);

    return { targetElement };
}