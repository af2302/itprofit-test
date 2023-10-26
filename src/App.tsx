import React, { useState } from 'react';
import Modal from './components/Modal/Modal'
import FeedbackForm from "./components/FeedbackForm/FeedbackForm";

const App: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        document.body.classList.add('modal-open');
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        document.body.classList.remove('modal-open');
        setModalOpen(false);
    }

    return (
        <div className="app">
            <FeedbackForm />
                <div className="button">
                    <button onClick={handleOpenModal}>Открыть модальное окно</button>
                </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
}

export default App;
