import * as styles from './title.module.scss';

export interface TitleProps {
    text: string;
    view: 'full' | 'trancated';
}

export default function Title({ text, view }: TitleProps) {
    
    return (
        <div className={styles[view]}>
            {text}
        </div>
    );
}