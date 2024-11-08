import React from 'react';

export function Habits() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <h1>Current Goals</h1>

      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Goal</th>
            <th scope="col">Progress</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.25 6.75H6.75C5.64543 6.75 4.75 7.64543 4.75 8.75V15.25C4.75 16.3546 5.64543 17.25 6.75 17.25H7.25M14.75 6.75H15.25C16.3546 6.75 17.25 7.64543 17.25 8.75V15.25C17.25 16.3546 16.3546 17.25 15.25 17.25H13.75"></path>
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.75 10.75H18C18.6904 10.75 19.25 11.3096 19.25 12V12C19.25 12.6904 18.6904 13.25 18 13.25H17.75"></path>
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.75 6.75L8.75 12H13.25L10.25 17.25"></path>
              </svg>
              Exercise for 30 days
            </td>
            <td>
              <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar" style={{ width: '25%' }}>25%</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <br />

      <div>
        <button type="button" className="btn btn-secondary">Delete Goal</button>
        <button type="button" className="btn btn-primary">Add Goal</button>
        <button type="button" className="btn btn-primary">Complete Goal</button>
      </div>

      <section>
        <h2>New goals being created</h2>
        <ul>
          <li>Guzaboo just created a new goal</li>
          <li>CyberDragon just created a new goal</li>
          <li>Santi just created a new goal</li>
        </ul>
      </section>
    </main>
  );
}
