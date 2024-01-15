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
      onAddItem({ text: inputText, checked: false,  icon: chosenEmoji.emoji });
      onClose();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {chosenEmoji ? <span>{chosenEmoji.emoji}</span> : <p>이모지를 선택하세요.</p>}
        <Picker onEmojiClick={onEmojiClick} />
        <input type="text" value={inputText} onChange={handleInputChange} />
        <button onClick={handleAdd}>추가</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default TodoModal;