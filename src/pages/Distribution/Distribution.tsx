import styles from './Distribution.module.css';
import { PayrollSectionComponent } from '../../components'; 

export function Distribution() {
    return (
        <section className={styles.view}>
            <PayrollSectionComponent></PayrollSectionComponent>
            <PayrollSectionComponent></PayrollSectionComponent>
        </section>
    )
}