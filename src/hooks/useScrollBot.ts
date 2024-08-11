import { /* useState,  */useEffect, useRef } from 'react';

export interface IUseScrollBot {
    func: () => void;
}

export default function useCloseOut({ func }: IUseScrollBot) {
    const targetElement = useRef<HTMLDivElement>(null);
    /* const [ check, setCheck ] = useState<boolean>(true); */

    useEffect(() => {
        const root = document.getElementById('root');
        const window = document.documentElement;

        /* if (check && window.clientHeight > 1259) {
            func();
            setCheck(false);
        } */

        const handleScroll = () => {

            if (root && targetElement.current) {
                if (window.clientHeight + root.scrollTop - 121 >= targetElement.current.clientHeight) {
                    func();
                }
            }
        };
    
        root?.addEventListener('scroll', handleScroll);
    
        return () => {
            root?.removeEventListener('scroll', handleScroll);
        };
    }, [func]);

    return { targetElement };
}