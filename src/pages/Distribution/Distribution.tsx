import styles from './Distribution.module.css';
import Add from '../../assets/icons/Add.svg?react';
import { ButtonComponent, PayrollSectionComponent } from '../../components'; 

export function Distribution() {
    return (
        <section className={styles.view}>
            <PayrollSectionComponent></PayrollSectionComponent>
            <PayrollSectionComponent icon='home' color='#ff9500'></PayrollSectionComponent>
            <PayrollSectionComponent icon='fuel' color='#0400ff'></PayrollSectionComponent>
            <PayrollSectionComponent icon='drink' color='#00ff9d'></PayrollSectionComponent>
            <PayrollSectionComponent icon='fitness' color='#ff0088'></PayrollSectionComponent>
            <ButtonComponent variant='outlined' color='neutral' leftIcon={<Add/>} className={styles.addSection}>Add Section</ButtonComponent>
        </section>
    )
}