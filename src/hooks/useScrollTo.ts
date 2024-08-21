import { useEffect } from 'react';

export interface IUseScrollTo {
    startScroll: number;
    func: (currentScroll: number) => void;
}

export default function useScrollTo({ startScroll, func }: IUseScrollTo) {
    const root = document.getElementById('root');

    useEffect(() => {
        if (startScroll) {
            root?.scrollTo(0, startScroll);
        }
    }, [startScroll, root]);

    useEffect(() => {
        const handleScroll = () => {
            if (root) {
                func(root.scrollTop);
            }
        };

        root?.addEventListener('scroll', handleScroll);

        return () => {
            root?.removeEventListener('scroll', handleScroll);
        };
    }, [func, root]);
}
