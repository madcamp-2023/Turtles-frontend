// BioModal.jsx
import React, { useState } from 'react';
import './TodoModal.css';

const BioModal = ({ onClose, onUpdateBio, children }) => {
    const [newBio, setNewBio] = useState('');

    const handleSave = () => {
        onUpdateBio(newBio);
        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                {children}
                <textarea value={newBio} onChange={e => setNewBio(e.target.value)} />
                <button onClick={handleSave}>추가</button>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default BioModal;
