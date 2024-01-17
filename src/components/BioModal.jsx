// BioModal.jsx
import React, { useState } from 'react';
import './BioModal.css';

const BioModal = ({ onClose, onUpdateBio, children }) => {
    const [newBio, setNewBio] = useState('');

    const handleSave = () => {
        onUpdateBio(newBio);
        onClose();
    };

    const handleTextareaChange = (e) => {
        const inputText = e.target.value;

        // 최대 30자로 제한
        if (inputText.length <= 30) {
            setNewBio(inputText);
        }
    };

    return (
        <div className="bio-modal-backdrop">
            <div className="bio-modal">
                {children}
                <div style={{ position: 'relative' }}>
                    <textarea
                        value={newBio}
                        onChange={handleTextareaChange}
                        style={{
                            resize: 'none', 
                        height: '100px', 
                        width: '400px',
                        padding: '10px', 
                        fontSize: '16px', 
                        border: '1px solid #bdbdbd', 
                        borderRadius: '5px' 
                        }}
                    />
                    <div style={{ position: 'absolute', bottom: '12px', right: '10px', color: 'gray' }}>
                        {newBio.length}/30
                    </div>
                </div>
                <div className="button-container">
                    <button className="btnClose" onClick={onClose}>취소</button>
                    <button className="btnAdd" onClick={handleSave}>확인</button>
                </div>
            </div>
        </div>
    );
};

export default BioModal;
