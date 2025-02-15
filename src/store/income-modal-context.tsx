import React, { createContext, useState } from "react"; // Add this line
import useModal from "../hooks/useModal";
import { Income } from '../models/Income'

interface IncomeModalContextType {
   createModalIsOpen: boolean;
   handleOpenCreateModal: () => void;
   handleCloseCreateModal: () => void;
   editModalIsOpen: boolean;
   handleOpenEditModal: () => void;
   handleCloseEditModal: () => void;
   deleteModalIsOpen: boolean;
   handleOpenDeleteModal: () => void;
   handleCloseDeleteModal: () => void;
   selectedRecord: Income | null; // Use the Income type here
   setSelectedRecord: (record: Income | null) => void;
}

export const IncomeModalContext = createContext<IncomeModalContextType>({
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


export default function IncomeModalContextProvider({ children }) {
   const { modalIsOpen: editModalIsOpen, handleOpenModal: handleOpenEditModal, handleCloseModal: handleCloseEditModal } = useModal();
   const { modalIsOpen: deleteModalIsOpen, handleOpenModal: handleOpenDeleteModal, handleCloseModal: handleCloseDeleteModal } = useModal();
   const { modalIsOpen: createModalIsOpen, handleOpenModal: handleOpenCreateModal, handleCloseModal: handleCloseCreateModal } = useModal();
   const [selectedRecord, setSelectedRecord] = useState<Income | null>(null);

   const ctxValue: IncomeModalContextType = {
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
      <IncomeModalContext.Provider value={ctxValue}>
         {children}
      </IncomeModalContext.Provider>
   );
}