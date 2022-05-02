Steps to setting up:

1. Started by planning out the components that we will need

2. Started setting up the AddUser component

   - Set up the form to enter a new user into
   - set up the addUserHandler function for the onSubmit property in the <form>
   - Then added the AddUser component to the App component
   <p>

3. Set up the Card wrapper and set up the Button UI component

4. Set up the User Input state

   - Set up state variables for [enteredUsername, setEnteredUsername]
   - Set up usernameChangeHandler and set the onChange property of the username input field
   - Testing with console log on the enteredUsername and enteredAge values
   - Set up check to make sure that data is provided in the input fields
   <p>

5. Next, set up the UsersList component

```javascript
// Set up so that we expect an array of user objects where they all have a name property and an age property
const UsersList = props => {
  return (
    <ul>
      {props.users.map(user => (
        <li>
          {user.name} ({user.age} years old)
        </li>
      ))}
    </ul>
  );
};
```

6. Configure App component to manage state for the users list and add user

```javascript
function App() {
  const [usersList, setUsersList] = useState([]);

  // Taking old list and appending a new element to it
  // Have to use the function method inside the setState function
  const addUserHandler = (uName, uAge) => {
    setUsersList(prevUsersList => {
      return [...prevUsersList, { name: uName, age: uAge }];
    });
  };

  return (
    <div>
      <section>
        <AddUser onAddUser={addUserHandler} />
        <UsersList users={usersList} />
      </section>
    </div>
  );
}
```

7. Set up the Error Modal component
