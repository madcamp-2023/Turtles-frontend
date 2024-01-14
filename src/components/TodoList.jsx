import React, { useState } from 'react';
import './TodoList.css';

const TodoItem = ({ item, onItemCheck }) => {
  const [isChecked, setIsChecked] = useState(item.checked);

  const handleCheck = () => {
    setIsChecked(!isChecked);
    // 아이템의 상태를 콘솔에 출력
    console.log(`아이콘: ${item.icon}, 텍스트: ${item.text}, 체크여부: ${!isChecked}`);
    
    // 아이템의 체크 상태를 부모 컴포넌트로 전달
    onItemCheck(item.id, !isChecked);
  };

  return (
    <div className={`item ${isChecked ? 'checked' : ''}`}>
      <span className="icon">{item.icon}</span>
      <span className="text">{item.text}</span>
      <input type="checkbox" checked={isChecked} onChange={handleCheck} />
    </div>
  );
};

const TodoList = ({ title, items }) => {
  const [todoItems, setTodoItems] = useState(items);

  // 아이템의 체크 상태가 변경될 때 실행되는 함수
  const handleItemCheck = (itemId, isChecked) => {
    const updatedItems = todoItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, checked: isChecked };
      }
      return item;
    });

    // 전체 투두리스트를 업데이트하고 콘솔에 출력
    setTodoItems(updatedItems);
    console.log('투두리스트 전체 상태:', updatedItems);
  };

  return (
    <div className="container">
      <header className="header">
        <h2 className="title">{title}</h2>
        <button className="add-button">+</button>
      </header>
      <div className="items">
        {todoItems.map((item, index) => (
          <TodoItem key={index} item={item} onItemCheck={handleItemCheck} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
