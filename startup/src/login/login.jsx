import React from 'react';

export function Login() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <p className="lead">
        Here you will be able to manage and track your progress. This app is here to help you be better with anything you commit to.
      </p>

      <form method="get" action="habits.html">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">User</span>
          <input className="form-control" type="text" placeholder="JohnDoe28" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Password🔒</span>
          <input className="form-control" type="password" placeholder="1234" />
        </div>
        <button type="button" className="btn btn-dark">Login</button>
        <button type="button" className="btn btn-dark">New User</button>
      </form>
    </main>
  );
}
