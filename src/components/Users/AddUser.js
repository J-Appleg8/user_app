import React from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button';
import classes from './AddUser.module.css';

const AddUser = props => {
  const addUserHandler = event => {
    event.preventDefault();
  };

  return (
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" type="text"></input>
        </div>
        <div>
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number"></input>
        </div>
        <Button type="submit">Add User</Button>
      </form>
    </Card>
  );
};

export default AddUser;
