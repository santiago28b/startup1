import React from 'react';

export function About() {
  return (
    <main className='container-fluid bg-secondary text-center'>
        <p className="lead" style={{color:"black"}} > 
        Habit App is a web app that you can use to manage and track your goal and habits. In this app you will be able to create a new goal and track them, you can see how other people makes new goals and you can set a time to complete them days or weeks.
        </p>
        <p className="h1" style={{color:"black"}}>Motivational quote of the day</p>
        
        <hr></hr>
        <img src="https://www.campervannewzealand.co.nz/assets/img/blog/444/Mount_Taranaki.jpg" className="img-fluid" alt="landscape"></img>
        <br></br>
        <figure className="text-center">
            <blockquote className="blockquote">
              <p style={{color:"black"}}>"Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful."</p>
            </blockquote>
            <figcaption className="blockquote-footer">
                Albert Schweitzer
            </figcaption>
          </figure>
    </main>
  );
}