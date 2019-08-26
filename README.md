# Dashb - dashboard test implementation

## Technical Stack  - (MERN stack: MongoDB - Express - React - Nodejs);

#### Frontend
- [React](https://github.com/facebook/react) - JS framework
- [Blueprint JS](https://blueprintjs.com/docs/#core) - UI framework
- [styled-components](https://www.styled-components.com/) - styling
- [Formik](https://jaredpalmer.com/formik/) - Form validation
- [lscache](https://github.com/pamelafox/lscache) - local storage management

#### Backend 
- [Docker](https://www.docker.com/)
- [MongoDB](https://www.mongodb.com/jp)
- [Mongoose](https://github.com/Automattic/mongoose)
- [NodeJS](https://nodejs.org/ja/)
- [express](https://expressjs.com/ja/api.html)

---
## Steps to start local development 

### 1 - Prerequisites 
- You need to have [Docker](https://www.docker.com/) installed on your machine.
- You need to have [MongoDB](https://www.mongodb.com/jp) installed on your machine - [OSX](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
- You need to have [NodeJS](https://nodejs.org/ja/) installed on yout machine.

### 2 - Getting the files 
- Just clone the `master` branch of this repository to a local folder on your machine. 
- Get into the folder `.../dashb-mongo-ts` 

### 3 - npm scripts 
- You need to install dependencies with npm 
```
$ npm install
```

- Once everything is installed , you need to setup the mongodb image and the mongodb container on Docker, just type: 
```
$ npm run docker:mongo
```

- Once the image has been setup you can check the local mongodb database on your machine by typing: 
```
$ docker exec -it mongodb bash
``` 
and then typing 
```
$ mongo 
``` 
this will grant you access to the mongodb bash commands. 


- Now let's seed the database with fake generated users, just type:
```
$ npm run server:seed
```
- Once the server is seeded and ready just type: 
```
$ npm run dev 
```
This will run the Mongodb backend server on `http://localhost:3333/` and start the frontend application on `http://localhost:3000/`
Sometimes this process may take a while, please wait. 

The seed function has only one `admin` user , only `admin` users can see the `actions` columns on the `/dashboard`, the credentials for each user are:

```
email: ${name}@email.com
password:  password-${name}
```

the main admin account is:
```
email: admin@email.com
password: password-admin
```
This should grant you access to the `/dashboard` and the `actions` columns. 

### 4 - problems?
Please always be aware that the Server must be running in order for the app to work. 
All configurations related to the mongodb server are in the `/backend` folder. 
If you encounter any issue just let a message on the `issues` section of this repostory or send me an email: `irvingarmentajd@email.com`

---

## TODO - 2019/18/26
- Animations with React-Pose (editing and removing users from table should be animated)
- More functionality and options
- Improve security of API and stronger schema for forms (password) 

---

# Create React App original readme

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
