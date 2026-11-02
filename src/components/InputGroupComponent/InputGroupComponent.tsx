import type { ReactNode } from 'react';
import styles from './InputGroupComponent.module.css';
    
type InputGroupComponentProps = {
    className?: string;
    label?: string;
    helper?: string;
    children?: ReactNode;
};

export function InputGroupComponent({children, label = "Label text", helper = "Helper text"}: InputGroupComponentProps) {
    return (
        <div className={styles.component}>
            <span className={styles.label}>{label}</span>
            {children}
            <span className={styles.helper}>{helper}</span>
        </div>
    );
}