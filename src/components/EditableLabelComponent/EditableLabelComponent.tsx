import { useState } from 'react';
import { IconButtonComponent } from '../IconButtonComponent';
import Edit from '../../assets/icons/Edit.svg?react';
import Close from '../../assets/icons/Close.svg?react';
import Check from '../../assets/icons/Check.svg?react';
import styles from './EditableLabelComponent.module.css';
    
type EditableLabelComponentProps = {
    value?: string,
};

export function EditableLabelComponent({value = "new"}: EditableLabelComponentProps) {
    const [open, setOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
    const [tempValue, setTempValue] = useState(value);
    
    return (
        <div className={styles.component}>
            { !open ? (
                <>
                    <span className={styles.label}>{ currentValue }</span>
                    <IconButtonComponent variant="ghost" color='neutral' size='small' onClick={() => {setTempValue(currentValue); setOpen(true);}}><Edit/></IconButtonComponent>
                </>
            ) : (
                <>
                    <input defaultValue={tempValue} onChange={(e) => setTempValue(e.target.value)} className={`${styles.input} ${styles.label}`} maxLength={30}></input>
                    <IconButtonComponent variant="ghost" color='neutral' size='small' onClick={() => setOpen(false)}><Close/></IconButtonComponent>
                    <IconButtonComponent variant="ghost" color='neutral' size='small' onClick={() => {setCurrentValue(tempValue); setOpen(false);}}><Check/></IconButtonComponent>
                </>
            )}
        </div>
    );
}