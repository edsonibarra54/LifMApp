import type { ReactNode } from 'react';
import { ButtonComponent } from '../ButtonComponent';
import styles from './ModalComponent.module.css';
import Close from '@mui/icons-material/Close';
import { IconButtonComponent } from '../IconButtonComponent';
    
type ModalVariant = 'default' | 'danger' | 'acknowledgment';

type ModalComponentProps = {
    className?: string;
    isOpen?: boolean,
    closable?: boolean,
    variant?: ModalVariant,
    title?: string,
    message?: string,
    primaryButtonText?: string,
    secondaryButtonText?: string,
    icon?: ReactNode;
    onClose?: () => void;
    onConfirmation?: () => void;
};

export function ModalComponent({ 
    className,
    isOpen = false,
    closable = false,
    variant = "default",
    title = "Modal title", 
    message, 
    primaryButtonText = "Ok", 
    secondaryButtonText = "Cancel",
    icon,
    onClose,
    onConfirmation }: ModalComponentProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.component}>
            <div className={`${styles.modal} ${styles[variant]} ${className ?? ''}`}>
                <div className={styles.modal__header}>
                    {icon && (
                        <div className={styles.modal__icon}>{icon}</div>
                    )}
                    {closable && (
                        <IconButtonComponent variant="ghost" color='neutral' size='small' onClick={onClose} className={styles.modal__closeIcon}>
                            <Close/>
                        </IconButtonComponent>
                    )}
                </div>
                <div className={styles.modal__content}>
                    <span className={styles.modal__title}>{title}</span>
                    {message && (
                        <p className={styles.modal__message}>{message}</p>
                    )}
                </div>
                <div className={styles.modelControls}>
                    <ButtonComponent size="small" color="neutral" onClick={onClose}>{secondaryButtonText}</ButtonComponent>
                    <ButtonComponent size="small" color={variant == "danger" ? "danger" : "default"} onClick={onConfirmation}>{primaryButtonText}</ButtonComponent>
                </div>
            </div>
        </div>
    );
}