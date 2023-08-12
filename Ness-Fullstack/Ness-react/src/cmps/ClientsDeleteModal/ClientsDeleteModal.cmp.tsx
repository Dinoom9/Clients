import React from 'react'
import './ClientsDeleteModal.scss'
import ModalButtons from '../ModalButtons/ModalButtons.cmp';

interface ClientDeleteModalProps {
    openDeleteModalState: () => void;
    deleteClientsFunc: () => void;
}

export default function ClientsDeleteModal({ openDeleteModalState, deleteClientsFunc }: ClientDeleteModalProps) {

    // Function that deletes the chosen clients and closes the modal.
    const deleteClientsAndCloseModal = () => {
        openDeleteModalState()
        deleteClientsFunc()
    }
    return (
        <div className='DeleteClientsModalBackDrop' onClick={openDeleteModalState}>
            <div className='DeleteClientsModal' onClick={(e) => e.stopPropagation()}>
                <span>CAUTION!</span>
                <span>This step is irreversible</span>
                <ModalButtons firstButtonFunc={deleteClientsAndCloseModal} secondButtonFunc={openDeleteModalState} firstButtonTitle={"DELETE"} secondButtonTitle={"Cancel"} />
            </div>
        </div>
    )
}
