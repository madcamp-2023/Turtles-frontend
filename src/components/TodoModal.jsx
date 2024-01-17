// TodoModal.jsx
import React, { useState } from 'react';
import './TodoModal.css';
import Picker from 'emoji-picker-react';

const TodoModal = ({ onClose, onAddItem }) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [inputText, setInputText] = useState('');

  const onEmojiClick = (event) => {
    setChosenEmoji(event);
  }


  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAdd = () => {
    if (inputText && chosenEmoji) {
      onAddItem({ text: inputText, checked: false, icon: chosenEmoji.emoji });
      onClose();
    }
  };

  return (
    <div className="todo-modal-backdrop">
      <div className="todo-modal">
        <div className="modal-content">
          <div className="emoji-picker-container">
            <Picker onEmojiClick={onEmojiClick} skinTonesDisabled={true} />
          </div>
          <div className="input-button-container">
            {chosenEmoji ?<h3>아이콘</h3>:<h3>아이콘을 선택해주세요</h3>}
            <div className='choose-emoji'>
              {chosenEmoji ? <span>{chosenEmoji.emoji}</span> : <span></span>}
            </div>
            <h3>내용</h3>
            <input type="text" value={inputText} onChange={handleInputChange} />
            <div className="buttons-container">
              <button className="btnClose" onClick={onClose}>취소</button>
              <button className="btnAdd" onClick={handleAdd}>확인</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;