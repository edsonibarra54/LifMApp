import { useState } from 'react';
import { IconButtonComponent } from '../IconButtonComponent';
import Edit from '../../assets/icons/Edit.svg?react';
import Close from '../../assets/icons/Close.svg?react';
import Check from '../../assets/icons/Check.svg?react';
import styles from './EditableLabelComponent.module.css';
    
type EditableLabelComponentProps = {
    className?: string;
    value?: string,
    minLength?: number,
    maxLength?: number,
    onChange?: (value: string) => void;
};

export function EditableLabelComponent({className, value = "new", minLength, maxLength, onChange}: EditableLabelComponentProps) {
    const [open, setOpen] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    const confirmChange = () => {
        setOpen(false);
        onChange?.(tempValue);
    };
    
    return (
        <div className={`${styles.component} ${className ?? ''}`}>
            { !open ? (
                <>
                    <span className={styles.label}>{ value }</span>
                    <IconButtonComponent variant="ghost" color='neutral' size='small' onClick={() => {setTempValue(value); setOpen(true);}}><Edit/></IconButtonComponent>
                </>
            ) : (
                <>
                    <input value={tempValue} onChange={(e) => setTempValue(e.target.value)} className={`${styles.input} ${styles.label}`} minLength={minLength} maxLength={maxLength}></input>
                    <IconButtonComponent variant="ghost" color='neutral' size='small' onClick={() => setOpen(false)}><Close/></IconButtonComponent>
                    <IconButtonComponent variant="ghost" color='neutral' size='small' onClick={confirmChange}><Check/></IconButtonComponent>
                </>
            )}
        </div>
    );
}