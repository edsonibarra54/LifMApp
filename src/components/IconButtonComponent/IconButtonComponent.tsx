import styles from './IconButtonComponent.module.css';
import { type ReactNode } from 'react';

type ButtonVariant = 'fill' | 'outlined' | 'ghost';
type ButtonSize = 'small' | 'medium';
type ButtonColor = 'default' | 'neutral' | 'danger';


type IconButtonComponentProps = {
    className?: string;
    children?: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    color?: ButtonColor;
    disabled?: boolean;
    onClick?: () => void;
};

export function IconButtonComponent({ className, children, variant = 'fill', size='small', color = "default", disabled = false, onClick}: IconButtonComponentProps) {
    return (
        <button disabled={disabled} className={`${styles.button} ${styles[size]} ${styles[variant]} ${styles[color]} ${className ?? ''}`} onClick={onClick}>
            <div
                className={
                size === 'small'
                    ? `${styles.icon} ${styles.icon__small}`
                    : `${styles.icon} ${styles.icon__medium}`
            }>
                {children}
            </div>
        </button>
    )
}