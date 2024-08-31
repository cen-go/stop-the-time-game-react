import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { targetTime, timeRemaining, onReset },
  ref
) {
  const dialog = useRef();
  const formattedTimeRemaining = (timeRemaining / 1000).toFixed(2);

  const userLost = timeRemaining <= 0;
  const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog className="result-modal" ref={dialog} onClose={onReset}>
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was {" "}
        <strong>
          {targetTime} second{targetTime > 1 && "s"}
        </strong>
      </p>
      <p>
        You stopped the timer with <strong>{formattedTimeRemaining} seconds left</strong>
      </p>
      <form method="dialog" onSubmit={onReset} >
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;

// you can use useImperativeHandle hook in this function to define
// properties and methods that should be accessible on this component here
// from outside this component

// useImperativeHandle works wirh the ref forwarded from parent component


// with createPortal we can inject the component in places in html 
// we choose different than the place we used the componenet in
// jsx code. create portal takes jsx element as the first argument
// and target dom node as the second argument.