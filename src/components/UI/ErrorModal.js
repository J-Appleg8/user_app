// react library has the react features
// doesnt care if its run in an environment that has a DOM etc
// react-dom uses React to bring that logic and those features into the
// web browser and makes them compatible with working in the DOM
// - adapter for react to the browser
import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';
import Button from './Button';
import classes from './ErrorModal.module.css';

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

// createPortal()
// - First argument: React node that should be rendered (expects JSX)
// - Second argument: A pointer to the container in the real DOM where this element should be rendered in

// We are not rendering an element in the root tags that we created in index.html
// instead, inside an existing application thats already being rendered by React
// we portal/move the HTML content about to be rendered into a different place

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

/////////////////////////////////////////////////////////////////////////////
// Before using a Portal:
//
// const ErrorModal = props => {
//   return (
//     <>
//       <div className={classes.backdrop} onClick={props.onConfirm} />
//       <Card className={classes.modal}>
//         <header className={classes.header}>
//           <h2>{props.title}</h2>
//         </header>
//         <div className={classes.content}>
//           <p>{props.message}</p>
//         </div>
//         <footer className={classes.actions}>
//           <Button onClick={props.onConfirm}>Okay</Button>
//         </footer>
//       </Card>
//     </>
//   );
// };
//
// export default ErrorModal;
