import styles from './AppLayout.module.css';
import Menu from '../../assets/icons/Menu.svg?react';
import { IconButtonComponent, DrawerComponent } from '../../components';
import { NavigationLayout } from '../../layouts';
import { useTheme, ThemeToggle } from '../../theme';
import { useMediaQuery } from '../../hooks';
import { Outlet, useMatches } from 'react-router'

type RouteHandle = {
  title: string;
  subtitle: string;
};

export function AppLayout() {
  const matches = useMatches();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const { theme, toggleTheme } = useTheme();

  const currentPage = matches.find(
    (match) => match.handle
  )?.handle as RouteHandle | undefined;

  return (
    <div className={styles.app}>
      {isDesktop && (
        <NavigationLayout/>
      )}
      
      <section className={styles.app__content}>
        <header className={styles.content__header}>
          <div className={styles.header__left}>
            {isMobile && (
              <DrawerComponent placement='left'>
                <DrawerComponent.Trigger>
                  <IconButtonComponent variant='ghost' color='neutral'><Menu/></IconButtonComponent>
                </DrawerComponent.Trigger>
                <NavigationLayout/>
              </DrawerComponent>
            )}
            <section className={styles.headerTitle}>
              <h1>{currentPage?.title}</h1>
              <span>{currentPage?.subtitle}</span>
          </section>
          </div>
          <div onClick={toggleTheme}>
            <ThemeToggle theme={theme} className={styles.toggle}/>
          </div>
        </header>
        <Outlet/>
      </section>
    </div>
  )
}