# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\

### Todos

- Use contenteditable innerHTML to manage its content instead of working with the whole textContent
- use styled Components or similar for the styling
- list:
  - possibility to close the popup list (click outside, esc...)
  - possibility to use arrow keys, enter, etc
- styling
  - highlight usernames in the text
  - highlight the part of the name on the list of users obtained
- useFakeData hook:
  - use status (for loading animation)
- check npm build is working
- improve the indexes when using maps on JSX

### Bugs

- As we use @ to tag users, this will give problems if user types an email, twitter user, etc
- line breaks give problems
