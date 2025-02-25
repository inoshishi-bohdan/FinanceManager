import useModal from "../hooks/useModal";
import React, { createContext } from "react";

interface UserModalContextType {
   deleteModalIsOpen: boolean;
   handleOpenDeleteModal: () => void;
   handleCloseDeleteModal: () => void;
}

export const UserModalContext = createContext<UserModalContextType>({
   deleteModalIsOpen: false,
   handleOpenDeleteModal: () => { },
   handleCloseDeleteModal: () => { },
});

export default function UserModalContextProvider({ children }) {
   const { modalIsOpen: deleteModalIsOpen, handleOpenModal: handleOpenDeleteModal, handleCloseModal: handleCloseDeleteModal } = useModal();
   const ctxValue: UserModalContextType = {
      deleteModalIsOpen,
      handleOpenDeleteModal,
      handleCloseDeleteModal
   };

   return (
      <UserModalContext.Provider value={ctxValue}>
         {children}
      </UserModalContext.Provider>
   );
}