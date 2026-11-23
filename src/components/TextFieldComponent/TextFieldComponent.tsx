import styles from './TextFieldComponent.module.css';
    
type TextFieldComponentProps = {
    className?: string;
    minLength?: number;
    maxLength?: number;
    placeholder?: string;
    value?: string;
    prefix?: string;
    onChange?: (value: string) => void;
};

export function TextFieldComponent({prefix, placeholder = "placeholder", value, minLength, maxLength, onChange}: TextFieldComponentProps) {
    return (
        <div className={styles.component}>
            {prefix && (
                <span className={styles.prefix}>{prefix}</span>
            )}
            <input className={styles.input} placeholder={placeholder} value={value} minLength={minLength} maxLength={maxLength} onChange={(e) => onChange?.(e.target.value)}></input>
        </div>
    );
}