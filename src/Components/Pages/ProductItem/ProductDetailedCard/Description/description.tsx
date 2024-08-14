import * as styles from './description.module.scss';

export interface DescriptionProps {
    text: string;
}

export default function Description({ text }: DescriptionProps) {

    return (
        <div className={styles.description}>
            <h2 className={styles.title}>Описание</h2>
            <p className={styles.descriptionText} dangerouslySetInnerHTML={{ __html: text}}></p>
        </div>
    );
}