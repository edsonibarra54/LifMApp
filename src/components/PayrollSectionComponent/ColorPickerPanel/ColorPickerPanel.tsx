import styles from './ColorPickerPanel.module.css';
    
type ColorPickerPanelProps = {
    colors: string[],
    value?: string;
    onChange?: (value: string) => void;
};

export function ColorPickerPanel({colors, value, onChange}: ColorPickerPanelProps) {
    return (
        <div className={styles.component}>
            <div className={styles.defaultColors}>
                {Object.entries(colors).map(
                    ([key, Color]) => (
                        <div className={styles.colorButton}>
                            <div className={`${styles.color} ${value == Color ? styles.selected : null }`} style={{ backgroundColor: Color }} key={key} onClick={() => onChange?.(Color)}></div>
                        </div>
                    )
                )}
            </div>
            <div className={styles.line}></div>
            <div className={styles.customColor}>
                <input type='color' value={value} onChange={(e) => onChange?.(e.target.value)} className={styles.colorPicker}/>
                <span>Custom</span>
                <span className={styles.colorPciker__value}>{value}</span>
            </div>
        </div>
    );
}