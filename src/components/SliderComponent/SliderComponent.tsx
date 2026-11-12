import styles from './SliderComponent.module.css';

type SliderComponentProps = {
    className?: string;
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    onChange?: (value: number) => void;
}

export function SliderComponent({ className, min = 0, max = 100, step = 10, value = 0, onChange } : SliderComponentProps) {
    return (
        <div className={`${styles.slider} ${className ?? ''}`}>
            <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange?.(Number(e.target.value))}/>
        </div>
    )
}