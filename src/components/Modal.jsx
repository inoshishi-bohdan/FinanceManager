import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import classes from './Modal.module.css'

export default function Modal({ open, children, onClose }) {
   const dialog = useRef();

   useEffect(() => {
      const modal = dialog.current;

      if (open) {
         modal.showModal();
         console.log('modal open'); 
      }

      return () => {
         modal.close();
         console.log('modal closed');
      }
   }, [open]);

   return createPortal(
      <dialog className={classes['modal']} ref={dialog} onClose={onClose}>
         {open ? children : null}
      </dialog>,
      document.getElementById('modal')
   );
}

