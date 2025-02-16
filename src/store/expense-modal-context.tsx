import React, { createContext, useState } from "react"; // Add this line
import useModal from "../hooks/useModal";
import { Expense } from '../models/Expense'

interface ExpenseModalContextType {
   createModalIsOpen: boolean;
   handleOpenCreateModal: () => void;
   handleCloseCreateModal: () => void;
   editModalIsOpen: boolean;
   handleOpenEditModal: () => void;
   handleCloseEditModal: () => void;
   deleteModalIsOpen: boolean;
   handleOpenDeleteModal: () => void;
   handleCloseDeleteModal: () => void;
   selectedRecord: Expense | null; // Use the Expense type here
   setSelectedRecord: (record: Expense | null) => void;
}

export const ExpenseModalContext = createContext<ExpenseModalContextType>({
   createModalIsOpen: false,
   handleOpenCreateModal: () => { },
   handleCloseCreateModal: () => { },
   editModalIsOpen: false,
   handleOpenEditModal: () => { },
   handleCloseEditModal: () => { },
   deleteModalIsOpen: false,
   handleOpenDeleteModal: () => { },
   handleCloseDeleteModal: () => { },
   selectedRecord: null,
   setSelectedRecord: (record) => { }
});


export default function ExpenseModalContextProvider({ children }) {
   const { modalIsOpen: editModalIsOpen, handleOpenModal: handleOpenEditModal, handleCloseModal: handleCloseEditModal } = useModal();
   const { modalIsOpen: deleteModalIsOpen, handleOpenModal: handleOpenDeleteModal, handleCloseModal: handleCloseDeleteModal } = useModal();
   const { modalIsOpen: createModalIsOpen, handleOpenModal: handleOpenCreateModal, handleCloseModal: handleCloseCreateModal } = useModal();
   const [selectedRecord, setSelectedRecord] = useState<Expense | null>(null);

   const ctxValue: ExpenseModalContextType = {
      createModalIsOpen,
      handleOpenCreateModal,
      handleCloseCreateModal,
      editModalIsOpen,
      handleOpenEditModal,
      handleCloseEditModal,
      deleteModalIsOpen,
      handleOpenDeleteModal,
      handleCloseDeleteModal,
      selectedRecord,
      setSelectedRecord
   };

   return (
      <ExpenseModalContext.Provider value={ctxValue}>
         {children}
      </ExpenseModalContext.Provider>
   );
}