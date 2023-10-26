import React from 'react';
import '../../styles/Modal.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
            <div className="modal">
                <button className="close-btn" onClick={onClose}>X</button>
                <div className="modal-content">
                    <p>Текст вашего модального окна.</p>
                </div>
            </div>
        </div>
    );
}

export default Modal;
