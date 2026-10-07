import styles from './PayrollSectionComponent.module.css';
import { SliderComponent } from '../../components';

export function PayrollSectionComponent () {
    return (
        <div className={styles.payroll__section}>
            <div>Housing</div>
            <SliderComponent step={1}/>
        </div>
    )
}