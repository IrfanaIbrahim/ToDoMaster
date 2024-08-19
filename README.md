# TodoMaster

## Overview

TodoMaster is a web application designed for managing personal projects and todos. Each user can access their own projects with features including secure user login, project creation, and comprehensive todo management. Todos display creation and updated dates for better tracking.

## Features

- **User Authentication:** Secure login for personalized access.
- **Project Management:** Create, view, and list projects. Edit project details.
- **Todo Management:** 
  - Add, edit, delete, and mark todos as complete or pending.
  - Display created and updated dates for each todo.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MySQL

## Getting Started

1.Clone the repository:
```bash 
git clone https://github.com/Yadhu2K1/ToDo-Manager.git
```
2.Go to Server Folder:
```
cd todoserver
```
3.Run these commands for setting the server:
```
npm install
node server.js
```
4.Now Go to Frontend folder
```
cd todoclient
```
5.Run the following commands to view the app at http://localhost:3000/:
```
npm install
npm start
```
## Note Behind

In this project I have set the Environment variables as my own local host MySQL Workbench. You can either use Online databases from Aiven console or Console Clever Cloud etc. And make sure to insert tables in database(user,project,todo).
