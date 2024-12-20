import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { About } from './about/about';
import { Habits } from './habits/habits';
import { AuthState } from './login/authState';


export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
    return (
        <BrowserRouter>
      <div className='body bg-dark text-light'>
        <header className='container-fluid'>
                    <nav className='navbar fixed-top navbar-dark'>
            <div className='navbar-brand'>
                HabitApp<sup>&reg;</sup>
            </div>
            <menu className='navbar-nav'>
                <li className='nav-item'>
                <NavLink className='nav-link' to=''>
                    Login
                </NavLink>
                </li>
                <li className='nav-item'>
                <NavLink className='nav-link' to='habits'>
                    Habits
                </NavLink>
                </li>
                <li className='nav-item'>
                <NavLink className='nav-link' to='about'>
                    About
                </NavLink>
                </li>
            </menu>
            </nav>
        </header>
  
        <Routes>
        <Route
            path='/'
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
            exact
          />
            <Route path='/habits' element={<Habits />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
        <main className="container-fluid bg-secondary text-center">
            
        </main>

        <footer className='bg-dark text-white-50'>
          <div className='container-fluid'>
            <span className='text-reset'>Santiago Bolano</span>
            <a className='text-reset' href='https://github.com/santiago28b/startup1/tree/main'>
              Github
            </a>
          </div>
        </footer>
      </div>
      </BrowserRouter>
    );
  }
  function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }