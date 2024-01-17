// TodoList.jsx
import React, { useEffect, useState } from "react";
import "./TodoList.css";
import TodoModal from "./TodoModal";

const TodoItem = ({ item, onItemCheck, onItemDelete, isEditable }) => {
  const [isChecked, setIsChecked] = useState(item.checked);

  const handleCheck = () => {
    setIsChecked(!isChecked);
    console.log(
      `아이콘: ${item.icon}, 텍스트: ${item.text}, 체크여부: ${!isChecked}`
    );
    // 아이템의 체크 상태를 부모 컴포넌트로 전달
    onItemCheck(item.id, !isChecked);
  };

  const handleDelete = () => {
    onItemDelete(item.id);
  };

  const contextMenuHandler = (e) => {
    if (!isEditable) return;
    e.preventDefault(); // 기본 컨텍스트 메뉴 표시 방지
    // 컨텍스트 메뉴 생성
    const contextMenu = document.createElement("div");
    contextMenu.classList.add("context-menu");

    // "삭제" 메뉴 아이템 추가
    const deleteMenuItem = document.createElement("div");
    deleteMenuItem.textContent = "삭제";
    deleteMenuItem.classList.add("context-menu-item");
    deleteMenuItem.addEventListener("click", handleDelete);

    contextMenu.appendChild(deleteMenuItem);

    // 메뉴를 보여줄 위치 설정
    contextMenu.style.left = `${e.clientX}px`;
    contextMenu.style.top = `${e.clientY}px`;

    // body에 컨텍스트 메뉴 추가
    document.body.appendChild(contextMenu);

    // 화면을 클릭하면 컨텍스트 메뉴 숨김
    document.addEventListener("click", () => {
      contextMenu.remove();
    });
  };
  return (
    <div
      className={`item ${isChecked ? "checked" : ""}`}
      onContextMenu={contextMenuHandler}
    >
      <span className="icon">{item.icon}</span>
      <span className="text">{item.text}</span>
      <input type="checkbox" checked={isChecked} onChange={handleCheck} />
    </div>
  );
};

const TodoList = ({ title, items, uid: externalUid, date: externalDate }) => {
  const [todoItems, setTodoItems] = useState(items);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isEditable = !externalUid && !externalDate; 

  const uid = externalUid || localStorage.getItem("uid");
  const date = externalDate || new Date().toISOString().split("T")[0]; // 받은 날짜가 없으면 오늘 날짜 사용

  const handleItemDelete = async (itemId) => {
    if (!isEditable) return; // 편집 불가능한 경우 함수 실행 중단
    const localPort = process.env.REACT_APP_LOCAL_PORT;
    const uid = localStorage.getItem("uid");
    const today = new Date();
    const date = today.toISOString().split("T")[0];
    const updatedItems = todoItems.filter((item) => item.id !== itemId);
    setTodoItems(updatedItems);

    // 서버에 POST 요청을 보내기 위한 데이터 생성
    const requestBody = {
      uid: uid,
      date: date,
      todos: updatedItems.map((item) => ({
        todo_name: item.text,
        todo_complete: item.checked,
        todo_icon: item.icon,
      })),
    };

    try {
      const response = await fetch(`${localPort}/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("POST response:", data);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    const localPort = process.env.REACT_APP_LOCAL_PORT;
    const getTodo = async () => {
      try {
        const response = await fetch(
          `${localPort}/todo?uid=${uid}&date=${date.substring(0, 7)}`, // YYYY-MM 형식으로 요청
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        const data = await response.json();
        if (data.success && data.todos.length > 0) {
          // externalDate에 해당하는 날짜의 데이터만 필터링
          const relevantTodos = data.todos.filter(todo => 
            todo.date.split("T")[0] === date
          );
          console.log(relevantTodos);

          if (relevantTodos.length > 0) {
            const todos = relevantTodos[0].todos.map((todo, index) => ({
              id: index,
              icon: todo.todo_icon,
              text: todo.todo_name,
              checked: todo.todo_complete,
            }));
            console.log(todos);
            console.log(date);

            setTodoItems(todos);
          } else {
            // 해당 날짜에 할 일이 없는 경우
            setTodoItems([]);
          }
        }
      } catch (error) {
        console.error("Error fetching access todo:", error);
      }
    };
  
    getTodo();
  }, [date, externalDate, uid]); 
  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 아이템의 체크 상태가 변경될 때 실행되는 함수
  const handleItemCheck = async (itemId, isChecked) => {
    if (!isEditable) return; // 편집 불가능한 경우 함수 실행 중단
    const localPort = process.env.REACT_APP_LOCAL_PORT;
    const uid = localStorage.getItem("uid");
    const today = new Date();
    const date = today.toISOString().split("T")[0];
    const updatedItems = todoItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, checked: isChecked };
      }
      return item;
    });

    setTodoItems(updatedItems);

    // 서버에 POST 요청을 보내기 위한 데이터 생성
    const requestBody = {
      uid: uid,
      date: date,
      todos: updatedItems.map((item) => ({
        todo_name: item.text,
        todo_complete: item.checked,
        todo_icon: item.icon,
      })),
    };

    try {
      const response = await fetch(`${localPort}/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("POST response:", data);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleAddItem = async (newItem) => {
    if (!isEditable) return; // 편집 불가능한 경우 함수 실행 중단
    const localPort = process.env.REACT_APP_LOCAL_PORT;
    const uid = localStorage.getItem("uid");
    const today = new Date();
    const date = today.toISOString().split("T")[0];
    const maxId = todoItems.reduce((max, item) => Math.max(max, item.id), 0);
    const newItemWithId = { id: maxId + 1, ...newItem };

    const updatedItems = [...todoItems, newItemWithId];
    setTodoItems(updatedItems);

    // 서버에 POST 요청을 보내기 위한 데이터 생성
    const requestBody = {
      uid: uid,
      date: date,
      todos: updatedItems.map((item) => ({
        todo_name: item.text,
        todo_complete: item.checked,
        todo_icon: item.icon,
      })),
    };

    try {
      const response = await fetch(`${localPort}/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("POST response:", data);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (

    <div className="todo-container">
      <div className="todo-text-container">
        <header className="todo-header">
          <div className="todo-title">{title}</div>
          {isEditable && (
            <button className="add-button" onClick={handleAddClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="#799E7D" />
              </svg>
            </button>
          )}
        </header>
        <div className="items">
          {todoItems.map((item, index) => (
            <TodoItem
              key={index}
              item={item}
              onItemCheck={handleItemCheck}
              onItemDelete={handleItemDelete}
              isEditable={isEditable} // 아이템 삭제 핸들러 전달
            />
          ))}
        </div>
        {isModalOpen && (
          <TodoModal
            onClose={handleCloseModal}
            onAddItem={handleAddItem}
          ></TodoModal>
        )}
      </div>
    </div>
  );
};

export default TodoList;
