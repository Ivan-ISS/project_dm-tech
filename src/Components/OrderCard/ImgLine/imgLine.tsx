import * as styles from './imgLine.module.scss';
import { useState, useEffect } from 'react';
import Picture from '../../Common/Picture/picture';
import useScreenSize from '@/hooks/useScreenSize';

export interface ImgLineProps {
    pictures: string[];
}

export default function ImgLine({ pictures }: ImgLineProps) {
    const [ numImg, setNumImg ] = useState<number>(8);
    const [ widthLine, setWidthLine ] = useState<number>(464);
    const [ screenWidth ] = useScreenSize();

    useEffect(() => {
        if (screenWidth > 900) {
            setWidthLine(464);
            setNumImg(8);
        }
        if (screenWidth > 600 && screenWidth < 900) {
            setWidthLine(264);
            setNumImg(4);
        }
        if (screenWidth < 600) {
            setWidthLine(124);
            setNumImg(2);
        }
    }, [screenWidth]);

    return (
        <div
            className={styles.imgLine}
            style={{
                minWidth: `${widthLine}`,
                maxWidth: `${widthLine}`
            }}
        >
            {pictures.map((picture, index) => (
                index < numImg
                ?
                <div key={index} className={styles.imgBlock}>
                    <Picture src={picture} alt={'product image'}/>
                </div>
                : 
                index === pictures.length - 1
                ?
                <div key={index} className={styles.ellipsis}>
                    ... 
                </div>
                :
                null
            ))}
        </div>
    );
}