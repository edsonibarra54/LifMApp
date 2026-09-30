import styles from './ButtonComponent.module.css';
import { type ReactNode } from 'react';

type ButtonComponentProps = {
    className?: string;
    children?: ReactNode;
    variant?: string;
    size?: string;
    disabled?: boolean;
    onClick?: () => void;
};

export function ButtonComponent({ className, children, variant = 'default', size='medium', disabled = false, onClick}: ButtonComponentProps) {
    return (
        <button disabled={disabled} className={`${styles.button} ${styles[size]} ${styles[variant]} ${className ?? ''}`} onClick={onClick}>
            {children}
        </button>
    )
}