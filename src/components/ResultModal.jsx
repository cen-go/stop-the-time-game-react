import { forwardRef, useImperativeHandle, useRef } from "react";

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

  return (
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
    </dialog>
  );
});

export default ResultModal;

// you can use useImperativeHandle hook in this function to define
// properties and methods that should be accessible on this component here
// from outside this component

// useImperativeHandle works wirh the ref forwarded from parent component
