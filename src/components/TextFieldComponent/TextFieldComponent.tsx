import styles from './TextFieldComponent.module.css';
    
type TextFieldComponentProps = {
    className?: string;
    min?: number;
    max?: number;
    placeholder?: string;
    value?: string;
    prefix?: string;
};

export function TextFieldComponent({prefix, placeholder = "placeholder"}: TextFieldComponentProps) {
    return (
        <div className={styles.component}>
            {prefix && (
                <span className={styles.prefix}>{prefix}</span>
            )}
            <input className={styles.input} placeholder={placeholder}></input>
        </div>
    );
}