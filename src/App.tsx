import './App.css'
import Logo from './assets/LifMApp_Logo.svg?react';
import medical from './assets/Medical.svg?react';
import paysheet from './assets/Paysheet.svg?react';
import tracker from './assets/Tracker.svg?react';
import { NavigationItem } from './components';
import { ButtonComponent } from './components';
import { useTheme, ThemeToggle } from './theme';
import { Outlet, useMatches } from 'react-router'

type RouteHandle = {
  title: string;
  subtitle: string;
};

function App() {
  const matches = useMatches();
  const { theme, toggleTheme } = useTheme();

  const currentPage = matches.find(
    (match) => match.handle
  )?.handle as RouteHandle | undefined;

  return (
    <div className='app'>
      <section className='app__navigation'>
        <div className='navigation__header'>
          <Logo className="header__logo"/>
          <h1>LifMApp</h1>
        </div>
        <div className='navigation__content'>
          <NavigationItem name='Paysheet Organizer' icon={paysheet} path='/paysheet-organizer'/>
          <NavigationItem name='Medical Organizer' icon={medical} path='/medical-organizer'/>
          <NavigationItem name='Habit Tracker' icon={tracker} path='/habit-tracker'/>
        </div>
      </section>
      <section className='app__content'>
        <header className='content__header'>
          <section className='header-title'>
            <h1>{currentPage?.title}</h1>
            <span>{currentPage?.subtitle}</span>
          </section>
          <div onClick={toggleTheme}>
            <ThemeToggle theme={theme} className='toggle'/>
          </div>
        </header>
        <Outlet/>
      </section>
    </div>
  )
}

export default App