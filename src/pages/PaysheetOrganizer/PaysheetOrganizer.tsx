import styles from './PaysheetOrganizer.module.css';
import { Outlet } from 'react-router'
import { TabsComponent, TabComponent } from '../../components';

export function PaysheetOrganizer() {
    return (
        <section className={styles.view}>
            <TabsComponent>
                <TabComponent to='distribution'>Distribution</TabComponent>
                <TabComponent to='new-report'>New Report</TabComponent>
                <TabComponent to='my-reports'>My Reports</TabComponent>
            </TabsComponent>
            <Outlet/>
        </section>
    )
}