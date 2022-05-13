## <u>JSX Limitations:</u>

<p></p>

1.) if we have adjacent root level elements it will cause an error

```javascript
  return (
    <AddUser onAddUser={addUserHandler} />
    <UsersList users={usersList} />
  );
```

You can't return more than one "root" JSX element (you also can't store more than one "root" JSX element in a variable)

- The top level element can have children but it must only be one element

Reason for this is the same as in regular JavaScript:

- You can only return one thing from a function
- Ex: you cant return two numbers, strings etc
  - You can return an array of numbers or string, but that is now a different value (and is now returning one array)

Solution:

- You can just wrap the adjacent elements in a `<div>` or any element
- Main thing that matters is that there is a single value returned

Another work around is to wrap everything in a Javascript array []

- Whenever you are working with an array though, React will throw an error if you do not have a key

<br>

---

## <u>Creating a Wrapper Component:</u>

<p></p>

Wrapping adjacent elements with a `<div>` tag all the time can create a new problem, '`<div>` Soup' where there are many unnecessary `<div>` tags rendered in the HTML

Solution 1:

- Create a wrapper component that just returns props.children
- Avoids an extra `<div>` created

```javascript
const Wrapper = props => {
  return props.children;
};

export default Wrapper;
```

Then import it and use it in place of a `<div>`:

```javascript
return (
  // New Wrapper component only returns props.children - avoids an extra <div> in the rendered HTML
  <Wrapper>
    <form onSubmit={addUserHandler}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={enteredUsername}
          onChange={usernameChangeHandler}
        ></input>
      </div>
      <Button type="submit">Add User</Button>
    </form>
  </Wrapper>
);
```

<br>

---

## <u>React Fragments:</u>

<p></p>

Fragments render an empty wrapper, which dont actually render any HTML element to the DOM

- Allow us to write cleaner code, and avoid unnecessary HTML elements

```javascript
return (
  <React.Fragment>
    <h2>Hi There!</h2>
    <p>This does not work</p>
  </React.Fragment>
);
```

OR

```javascript
return (
  <>
    <h2>Hi There!</h2>
    <p>This does not work</p>
  </>
);
```

<br>

---

## <u>React Portals:</u>

<p></p>

Portals are another useful feature that do something similar to fragments

```javascript
return (
  <>
    <MyModal />
    <MyInputForm />
  </>
);
```

Gets rendered as this in the DOM:

```html
<section>
  <div class="my-modal">
    <h2>A Modal Title!</h2>
  </div>
  <form>
    <label>Username</label>
    <input type="text" />
  </form>
</section>
```

This will technically work if you get the styling correct, but this is not ideal because a Modal is an overlay to the entire page

- Logically its above everything else, but if its nested inside some other HTML code then its not good structure

We can use a Portal to keep the structure we in the first code block, but still render it differently in the real DOM (second code block)

```javascript
return (
  <>
    <MyModal />
    <MyInputForm />
  </>
);
```

renders as (with Portal):

```html
<div class="my-modal">
  <h2>A Modal Title!</h2>
</div>
<section>
  <h2>Some other content</h2>
  <form>
    <label>Username</label>
    <input type="text" />
  </form>
</section>
```

<br>

---

## <u>Creating a Portal:</u>

<p></p>

### react-dom:

<p></p>

Think of the React library as having the react features (state management, endsOn etc) but it doesnt care if its run in an environment that has a DOM etc

```javascript
import React from 'react';
```

react-dom uses React to bring that logic, and those features, into the web browser and makes them compatible with working in the DOM

- Think of it like an adapter for react to the browser

```javascript
import ReactDOM from 'react-dom';
```

### createPortal():

<p></p>

After importing react-dom, we can use a function from react-dom called createPortal():

- First argument: React node that should be rendered (expects JSX)
- Second argument: A pointer to the container in the real DOM where this element should be rendered in

We are not rendering an element in the root tags that we created in index.html, but instead inside an existing application thats already being rendered by React we portal/move the HTML content about to be rendered into a different place

Note: createPortal() can be used anywhere where you would normally render JSX code

<br>

Before using a Portal:

```javascript
const ErrorModal = props => {
  return (
    <>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <Button onClick={props.onConfirm}>Okay</Button>
        </footer>
      </Card>
    </>
  );
};

export default ErrorModal;
```

<br>

After using a Portal:

```javascript
const Backdrop = props => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = props => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>
    </Card>
  );
};

const ErrorModal = props => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById('overlay-root')
      )}
    </>
  );
};

export default ErrorModal;
```

<br>

---

## <u>Using ref's:</u>

<p></p>

In the most basic form, they allow us to get access to other DOM elements and work with them

useRef(): Takes a default value you want it to initialize to
nameInputRef: will later become a real DOM element

- The first time React reaches and renders the ref= code in the return statement,
- it will set the value stored in nameInputRef to the native DOM element that is rendered based on the input

```javascript
import React, { useState, useRef } from 'react';

const AddUser = props => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const [error, setError] = useState();

  const addUserHandler = event => {
    event.preventDefault();
    // What is being stored is the real DOM node
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: ' Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: 'Invalid input',
        message: ' Please enter a valid age (> 0).',
      });
      return;
    }
    props.onAddUser(enteredName, enteredUserAge);
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef}></input>
        </div>
        <div>
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={ageInputRef}></input>
        </div>
        <Button type="submit">Add User</Button>
      </form>
    </Card>
  );
};

export default AddUser;
```

In general, useRef(): If you are only looking to read a value and not change anything
