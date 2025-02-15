import { useState } from "react";

export default function useModal() {
   const [modalIsOpen, setModalIsOpen] = useState(false);

   function handleCloseModal() {
      setModalIsOpen(false);
   }

   function handleOpenModal() {
      setModalIsOpen(true);
   }

   return {
      modalIsOpen,
      handleCloseModal,
      handleOpenModal
   };
}