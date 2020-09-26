import React, { useRef } from 'react';
import './Modal.css';

function Modal(props) {
  // Variables for props objects
  const { image, setShowModal } = props.props;
  // Hooks for refering to DOM nodes
  const modalContentRef = useRef();
  const modalBackRef = useRef();
  // Event handler for removing modal
  function handleClick(event) {
    const { className } = event.target;
    if (className === 'modal-background') {
      setShowModal(false);
    }
  }
  // Render Modal
  return (
    <section className='modal-background' onClick={handleClick} ref={modalBackRef}>
      <article className='modal-content' ref={modalContentRef}>
        <img src={image} alt='description'/>
      </article>
    </section>
  );
}

export default Modal;