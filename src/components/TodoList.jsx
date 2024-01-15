// TodoList.jsx
import React, { useEffect, useState } from "react";
import './TodoList.css';
import TodoModal from './TodoModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const localPort = process.env.REACT_APP_LOCAL_PORT;
    const uid = localStorage.getItem("uid");
    const today = new Date(); 
    const date = today.toISOString().split('T')[0];
    const getTodo = async () => {
      try {
        const response = await fetch(`${localPort}/todo?uid=${uid}&date=${date}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },

        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching access todo:", error);
      }
    }

    getTodo();
  });


  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

  const handleAddItem = (newItem) => {
    const maxId = todoItems.reduce((max, item) => Math.max(max, item.id), 0);
    const newItemWithId = { id: maxId + 1, ...newItem};

    const updatedItems = [...todoItems, newItemWithId];
    setTodoItems(updatedItems);

    // 새로운 아이템이 추가된 후의 투두리스트를 콘솔에 출력
    console.log('새로운 아이템이 추가된 투두리스트:', updatedItems);
  };

  return (
    <div className="container">
      <header className="header">
        <h2 className="title">{title}</h2>
        <button className="add-button" onClick={handleAddClick}>+</button>
      </header>
      <div className="items">
        {todoItems.map((item, index) => (
          <TodoItem key={index} item={item} onItemCheck={handleItemCheck} />
        ))}
      </div>
      {isModalOpen && (
        <TodoModal
        onClose={handleCloseModal}
        onAddItem={handleAddItem}
      >
          <p>모달 컨텐츠</p>
          {/* 기타 내용 */}
        </TodoModal>
      )}
    </div>
  );
};

export default TodoList;