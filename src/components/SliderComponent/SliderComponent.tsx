import styles from './SliderComponent.module.css';

type SliderComponentProps = {
    className?: string;
    min?: number;
    max?: number;
    step?: number;
}

export function SliderComponent({ className, min = 0, max = 100, step = 10 } : SliderComponentProps) {
    return (
        <div className={`${styles.slider} ${className ?? ''}`}>
            <input type="range" min={min} max={max} step={step}/>
        </div>
    )
}