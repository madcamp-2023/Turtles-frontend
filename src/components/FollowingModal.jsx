// FollowingModal.jsx
import React, { useState } from 'react';
import ReactCalendar from './ReactCalendar';
import './TodoModal.css';

const FollowingModal = ({ onClose, children, uid }) => {
    
    return (
        <div className="modal-backdrop">
            <div className="modal">
                {children}
                <div>UID: {uid}</div>
                <ReactCalendar uid={uid}/>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default FollowingModal;
