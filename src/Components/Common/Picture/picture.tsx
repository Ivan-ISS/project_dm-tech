import * as styles from './picture.module.scss';
import { useState, useEffect, HTMLAttributes } from 'react';
import placeholderImg from '@/assets/images/png/placeholderImg.png';

export interface PictureProps extends HTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
}

export default function Picture({ src, alt, ...props }: PictureProps) {
    const [imageUrl, setImageUrl] = useState(placeholderImg);

    useEffect(() => {
        if (src) {
            const img = new Image();
            img.src = src;
            img.onload = () => setImageUrl(src);
            img.onerror = () => setImageUrl(placeholderImg);
        }
    }, [src]);

    return <img {...props} className={styles.image} src={imageUrl} alt={alt} />;
}
