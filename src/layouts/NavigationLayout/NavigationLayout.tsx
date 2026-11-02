import styles from './NavigationLayout.module.css';
import Logo from '../../assets/LifMApp_Logo.svg?react';
import medical from '../../assets/Medical.svg?react';
import paysheet from '../../assets/Paysheet.svg?react';
import tracker from '../../assets/Tracker.svg?react';
import Logout from '../../assets/icons/Logout.svg?react';
import { ButtonComponent, NavigationItem } from '../../components';
import { useAuth } from '../../hooks';

export function NavigationLayout() {
  const { user, signOut } = useAuth();

  console.log(user);

  return (
    <section className={styles.app__navigation}>
      <div className={styles.navigation__header}>
        <Logo className={styles.header__logo} />
        <h1>LifMApp</h1>
      </div>
      <div className={styles.navigation__content}>
        <NavigationItem name='Paysheet Organizer' icon={paysheet} to='/paysheet-organizer' path='/paysheet-organizer' />
        <NavigationItem name='Medical Organizer' icon={medical} to='/medical-organizer' path='/medical-organizer' />
        <NavigationItem name='Habit Tracker' icon={tracker} to='/habit-tracker' path='/habit-tracker' />
      </div>
      <div className={styles.navigation__footer}>
        <div className={styles.user}>
          <span className={styles.user__name}>@{user?.email}</span>
          <span className={styles.user__google}>Google Account</span>
        </div>
        <ButtonComponent size='small' variant='ghost' color='neutral' leftIcon={<Logout/>} onClick={signOut} className={styles.logoutButton}>Sign out</ButtonComponent>
      </div>
    </section>
  )
}