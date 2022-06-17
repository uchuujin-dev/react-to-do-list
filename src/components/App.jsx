import React, { useState } from "react";
import uuid from "react-uuid";
import InputArea from "./InputArea.jsx";
import ToDoSection from "./ToDoSection";

function App() {
  const [toDoList, setToDoList] = useState([
    {
      id: uuid(),
      deadline: "2022-06-12",
      displayToDo: true,
      toDo: [{ item: "I am sorted by date", isStriked: true }]
    },
    {
      id: uuid(),
      deadline: "2022-06-13",
      displayToDo: true,
      toDo: [
        { item: "I can be collapsed by date", isStriked: false },
        { item: "Click on me to strikeout", isStriked: false }
      ]
    },

    {
      id: uuid(),
      deadline: "No deadline",
      displayToDo: true,
      toDo: [{ item: "I'm an item without deadline", isStriked: true }]
    }
  ]);

  function handleAdd(newToDo, deadline = null) {
    if (!deadline) {
      setToDoList((prev) => {
        let toDoObj;
        let toDoArray = [...prev]
          .find((obj) => obj.deadline === "No deadline")
          .toDo.filter((obj) => obj.item !== newToDo);
        toDoArray.push({ item: newToDo, isStriked: false });
        toDoObj = [...prev].find((obj) => obj.deadline === "No deadline");
        let newToDoList = prev.filter((obj) => obj !== toDoObj);
        toDoObj = { ...toDoObj, toDo: toDoArray };
        newToDoList = [...newToDoList, toDoObj];
        newToDoList = [...newToDoList].sort(sortDate);
        return newToDoList;
      });
    } else if (toDoList.some((obj) => obj.deadline === deadline)) {
      setToDoList((prev) => {
        let toDoObj;
        let toDoArray = [...prev]
          .find((obj) => {
            return obj.deadline === deadline;
          })
          .toDo.filter((obj) => obj.item !== newToDo);
        toDoArray.push({ item: newToDo, isStriked: false });
        toDoObj = [...prev].find((obj) => obj.deadline === deadline);
        toDoObj = { ...toDoObj, toDo: toDoArray };
        let newToDoList = prev.filter((obj) => obj.id !== toDoObj.id);
        newToDoList = [...newToDoList, toDoObj];
        newToDoList = [...newToDoList].sort(sortDate);
        return newToDoList;
      });
    } else {
      setToDoList((prev) => {
        return [
          ...prev,
          {
            id: uuid(),
            deadline: deadline,
            displayToDo: true,
            toDo: [
              {
                item: newToDo,
                isStriked: false
              }
            ]
          }
        ].sort(sortDate);
      });
    }
  }

  function sortDate(a, b) {
    if (b.deadline) {
      return a.deadline > b.deadline ? 1 : a.deadline < b.deadline ? -1 : 0;
    } else {
      return 0;
    }
  }

  function deleteItem(oldToDo, objectId) {
    setToDoList((prev) => {
      let found = false;
      let newToDoList = prev.filter((obj) => {
        if (obj.id === objectId) {
          if (obj.toDo.filter((toDo) => toDo !== oldToDo).length === 0) {
            if (obj.deadline !== "No deadline") {
              found = true;
              return false;
            }
          }
        }
        return true;
      });
      if (found === true) {
        return newToDoList;
      } else {
        return prev.map((obj) => {
          if (obj.id === objectId) {
            const newToDoArray = obj.toDo.filter((toDo) => toDo !== oldToDo);
            return {
              ...obj,
              toDo: newToDoArray
            };
          } else {
            return obj;
          }
        });
      }
    });
  }

  function setIsStriked(objectId, editToDo) {
    setToDoList((prev) => {
      return [...prev].map((obj) => {
        if (obj.id === objectId) {
          const toDoItem = {
            item: editToDo.item,
            isStriked: !editToDo.isStriked
          };
          let index = obj.toDo.indexOf(editToDo);
          let newToDoArray = obj.toDo;
          if (index !== -1) {
            newToDoArray[index] = toDoItem;
          }
          return {
            ...obj,
            toDo: newToDoArray
          };
        }
        return obj;
      });
    });
  }

  function setDisplayToDo(objectId, deadline) {
    setToDoList((prev) => {
      return [...prev].map((obj) => {
        if (obj.id === objectId) {
          return {
            ...obj,
            displayToDo: !obj.displayToDo
          };
        }
        return obj;
      });
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea handleAdd={handleAdd} />
      <ToDoSection
        toDoList={toDoList}
        deleteItem={deleteItem}
        setDisplayToDo={setDisplayToDo}
        setIsStriked={setIsStriked}
      />
    </div>
  );
}

export default App;
