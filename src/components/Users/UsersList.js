import React from 'react';
import Card from '../UI/Card';
import classes from './UsersList.module.css';

// Set up so that we expect an array of user objects where they all
// have a name property and an age property
const UsersList = props => {
  return (
    <Card className={classes.users}>
      <ul>
        {props.users.map(user => (
          <li key={user.id}>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UsersList;
