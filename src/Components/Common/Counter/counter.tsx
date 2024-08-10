import * as styles from './counter.module.scss';
import { ButtonHTMLAttributes, useState, useEffect } from 'react';
import SecondaryButton from '../Buttons/SecondaryButton/secondaryButton';
import CounterInput from '../Input/CounterInput/counterInput';
import IconPlus from '@/assets/images/svg/plus.svg';
import IconMinus from '@/assets/images/svg/minus.svg';

export interface CounterProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    idEntity: string;
    value: number;
    canBeDisabled?: boolean;
    indicatorOfChange?: number;
    handleClickCounter: (id: string, quantity: number) => void;
}

export default function Counter({ idEntity, value, canBeDisabled=false, indicatorOfChange, handleClickCounter, ...props }: CounterProps) {
    let [ count, setCount ] = useState(value);

    useEffect(() => {
        setCount(value);
    }, [value, indicatorOfChange]);

    const handleClickPlus = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (props.onClick) {
            props.onClick(e);
        }
        setCount(count += 1);
        handleClickCounter(idEntity, count);
    };

    const handleClickMinus = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (props.onClick) {
            props.onClick(e);
        }
        setCount(count -= 1);
        handleClickCounter(idEntity, count);
    };

    const handleChangeInput = (count: number) => {
        setCount(count);
        handleClickCounter(idEntity, count);
    };

    return (
        <div className={styles.counter}>
            <SecondaryButton
                segment={'counter'}
                edges={'leftRounded'}
                adaptive={false}
                onClick={handleClickMinus}
                isDisabled={canBeDisabled && count < 1}
            >
                <IconMinus width={20} height={20}/>
            </SecondaryButton>
            <CounterInput value={count} handleChangeInput={(count) => handleChangeInput(count)}/>
            <SecondaryButton
                segment={'counter'}
                edges={'rightRounded'}
                adaptive={false}
                onClick={handleClickPlus}
                isDisabled={count > 9}
            >
                <IconPlus width={20} height={20}/>
            </SecondaryButton>
        </div>
    );
}