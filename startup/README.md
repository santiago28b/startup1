# startup
startup app for BYU CS260
[Link to Notes](notes.md)

### Elevator Pitch
it is a web app that you can use to manage and track your goal and habits. In this app you will
be able to create a new goal and track them, you can see how other people makes new goals and you can set a time to complete them days or weeks. The reason I want to build this app is that I want to have a place where I can see how I am doing with my goals and how I am improving.

### key features
1. Create account
2. add and remove habits
3.  add a counter to see how good you are doing
4.  see others people goals and get inspiration

### what tech will be used and how?
I will use basic HTML&CSS to make the website and then add JavaScript to add the functionality of calculations and manage goals.
I will also need the use of database, possibly MongoDB to store the information that needs to be saved.
I will also add API to display inspirational quotes so people can find support
I will use Websocket so the data of the new goals being created can be shared to the world

### rough Sketch of the app
<img width="931" alt="Screenshot 2024-09-14 at 8 27 02 PM" src="https://github.com/user-attachments/assets/124f540d-7948-4986-83e8-50c51779a332">

## HTML deliverable

➡️ information for the `Startup HTML` deliverable

For this deliverable I built out the structure of my application using HTML.

- [x] **HTML pages** - three HTML page that represent the home page, habits page, and about page.
- [x] **Links** - The login page automatically links to the habits page. all home pages contain links to the other pages.
- [x] **Text** - Each pages has information about habits and puroise of the webiste depending on what page you are on.
-  [x] **Images** - I added a basic image that shows the ability to include images and modify its size
- [x] **DB/Login** - Input box and submit button for login and the the current habits that stores the habits.
- [x]  **WebSocket** - The count of habits is being generated online as a placeholder.

## CSS deliverable
➡️ information for the `Startup CSS` deliverable

For this deliverable I built out the style of my application using CSS and Boostrap framework.

- [x] - done - Prerequisite: Simon CSS deployed to your production environment
- [x] - done - Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page
- [x] - done - Prerequisite: Notes in your startup Git repository README.md file
- [x] - done -  Header, footer, and main content body. Used flex to layout sections.
- [x] - done -  Navigation elements. Links highlight on hover.
- [x] - done -  Responsive to window resizing. Looks great on iPad, desktop, and iPhone.
- [x] - done -  Application elements. Buttons are using bootstrap

## CSS React Deliverable
➡️ information for the `Startup React` deliverable

For this deliverable I built out the style of my application using CSS and Boostrap framework.

- [x] - done - Prerequisite: Simon React deployed to your production environment
- [x] - done - Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page
- [x] - done - Prerequisite: Notes in your startup Git repository README.md file
- [x] - done -  React components for habits,login and about done. logic is in habits
- [x] - done -  Use of hooks to update the state of the table, bright it up or down
- [x] - done - Correct login and authentication
- [x] - done - Use of React router during login and when using navbar

##  Service Deliverable
➡️ information for the `Startup Service` deliverable

For this deliverable I added backend endpoints that receives habits and stores them in the server and makes api calls to third partys.

- [x] - done - Prerequisite: Simon Service deployed to your production environment
- [x] - done - Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page
- [x] - done - Prerequisite: Notes in your startup Git repository README.md file
- [x] - done -   Node.js/Express HTTP service
- [x] - done -  Static middleware for frontend
- [x] - done - Calls to third party endpoints
- [x] - done - Backend service endpoints
- [x] - done - Frontend calls service endpoints using fecth
- [x] - done - login also uses api calls and is handled in the backend

##  DB/Login Deliverable
➡️ information for the `Startup DB/login` deliverable

For this deliverable I stored the habits in the database and the login information as well

- [x] - done - Prerequisite: Simon DB/login deployed to your production environment
- [x] - done - Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page
- [x] - done - Prerequisite: Notes in your startup Git repository README.md file
- [x] - done -   Node.js/Express HTTP service
- [x] - MongoDB Atlas database created - done!
- [x] - Stores data in MongoDB - done!
- [x] - User registration - Creates a new account in the database.
- [x] - existing user - Stores the habits under the same user if the user already exists.
- [x] - Use MongoDB to store credentials - Stores both user and habits
- [x] - Bcrypt is used to hash password and protect users.  


