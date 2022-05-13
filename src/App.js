import React, { useState } from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {
  const [usersList, setUsersList] = useState([]);

  // Taking old list and appending a new element to it
  // Have to use the function method inside the setState function
  const addUserHandler = (uName, uAge) => {
    setUsersList(prevUsersList => {
      return [
        ...prevUsersList,
        { name: uName, age: uAge, id: Math.random().toString() },
      ];
    });
  };

  return (
    <>
      <section>
        <AddUser onAddUser={addUserHandler} />
        <UsersList users={usersList} />
      </section>
    </>
  );
}

export default App;
