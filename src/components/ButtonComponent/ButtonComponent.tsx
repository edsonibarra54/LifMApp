import styles from './ButtonComponent.module.css';
import { type ReactNode } from 'react';

type ButtonVariant = 'fill' | 'outlined' | 'ghost';
type ButtonSize = 'small' | 'medium';
type ButtonColor = 'default' | 'neutral' | 'danger';

type ButtonComponentProps = {
    className?: string;
    children?: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    color?: ButtonColor;
    disabled?: boolean;
    onClick?: () => void;
};

export function ButtonComponent({ className, children, variant = "fill", color = 'default', size='medium', disabled = false, onClick}: ButtonComponentProps) {
    return (
        <button disabled={disabled} className={`${styles.button} ${styles[size]} ${styles[variant]} ${styles[color]} ${className ?? ''}`} onClick={onClick}>
            {children}
        </button>
    )
}