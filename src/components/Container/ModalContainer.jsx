import React from 'react'
import { createPortal } from 'react-dom'

const ModalContainer = ({ children }) => {

    const modalRoot = document.getElementById('modal-root')

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            {children}
        </div>,
        modalRoot
    )
}

export default ModalContainer