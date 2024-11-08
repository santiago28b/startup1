import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return (
      <div className='body bg-dark text-light'>
        <header className='container-fluid'>
          <nav className='navbar fixed-top navbar-dark'>
            <div className='navbar-brand'>
              HabitApp<sup>&reg;</sup>
            </div>
            <menu className='navbar-nav'>
              <li className='nav-item'>
                <a className='nav-link' href='index.html'>
                  Home
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='habits.html'>
                  Habits
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='about.html'>
                  About
                </a>
              </li>
            </menu>
          </nav>
        </header>
  
        <main>App components go here</main>
        
        <footer className='bg-dark text-white-50'>
          <div className='container-fluid'>
            <span className='text-reset'>Santiago Bolano</span>
            <a className='text-reset' href='https://github.com/santiago28b/startup1/tree/main'>
              Source
            </a>
          </div>
        </footer>
      </div>
    );
  }