// FollowingModal.jsx
import React, { useState } from 'react';
import ReactCalendar from './ReactCalendar';
import './FollowingModal.css';
import TodoList from './TodoList';
const items = [
    { id: 1, text: "물 마시기", checked: false, icon: "💧" },
    { id: 2, text: "비타민 먹기", checked: false, icon: "💊" },
];

const FollowingModal = ({ onClose, children, uid, name }) => {
    // 모달 내부 클릭 시 이벤트 전파 중지
    const handleModalClick = (e) => {
        e.stopPropagation();
    };


    return (
        <div className="following-modal-backdrop" onClick={onClose}>
            <div className="following-modal" onClick={handleModalClick}>
                <div className="modal-header">
                    <h2>{name}의 Home</h2>
                    <button className="close-button" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 100 100" fill="none">
                            <path d="M21.5 14.5L85.5 78.5L78.5 85.5L14.5 21.5L21.5 14.5Z" fill="#799E7D" />
                            <path d="M85.5 21.5L21.5 85.5L14.5 78.5L78.5 14.5L85.5 21.5Z" fill="#799E7D" />
                        </svg>
                    </button>
                </div>
                {children}
                <div className="calendar-todo-wrapper">
                    <ReactCalendar uid={uid} />
                    <TodoList title="오늘의 건강 관리" items={items} uid={uid} />
                </div>
            </div>
        </div>
    );
};


export default FollowingModal;
