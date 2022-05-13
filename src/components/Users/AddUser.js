import React, { useState, useRef } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';
import Wrapper from '../Helpers/Wrapper';

const AddUser = props => {
  // useRef(): Takes a default value you want it to initialize to
  // nameInputRef: will later become a real DOM element
  // - The first time React reaches and renders the ref= code in the return statement,
  // - it will set the value stored in nameInputRef to the native DOM element that is rendered based on the input
  // In general
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  // const [enteredUsername, setEnteredUsername] = useState('');
  // const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState();

  const addUserHandler = event => {
    event.preventDefault();
    // What is being stored is the real DOM node
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    // Checks if either of the input fields are blank
    // if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: ' Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    // Checks if the age input field is a number thats less than 1
    if (+enteredUserAge < 1) {
      setError({
        title: 'Invalid input',
        message: ' Please enter a valid age (> 0).',
      });
      return;
    }
    // Executes the onAddUser property that was set for the <AddUser /> component in App
    props.onAddUser(enteredName, enteredUserAge);
    // Clears out the data from the input fields after submitting the data
    // setEnteredUsername('');
    // setEnteredAge('');
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  };

  // const usernameChangeHandler = event => {
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = event => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  return (
    // New Wrapper component only returns props.children - avoids an extra <div> in the rendered HTML
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              // value={enteredUsername}
              // onChange={usernameChangeHandler}
              ref={nameInputRef}
            ></input>
          </div>
          <div>
            <label htmlFor="age">Age (Years)</label>
            <input
              id="age"
              type="number"
              // value={enteredAge}
              // onChange={ageChangeHandler}
              ref={ageInputRef}
            ></input>
          </div>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
