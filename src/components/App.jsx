import React, { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem.jsx";
import InputArea from "./InputArea.jsx";
import DeadlineHeading from "./DeadlineHeading";
import ToDoSection from "./ToDoSection";

function App() {
  const [toDoList, setToDoList] = useState([
    { item: "hello", deadline: "2022-06-01", isStriked: false },
    { item: "I'm here", deadline: "2022-05-30", isStriked: true },
    { item: "repeated", deadline: "2022-06-02", isStriked: false },
    { item: "repeat", deadline: "2022-06-02", isStriked: false },
    { item: "I'm first", deadline: "2022-05-29", isStriked: false },
    { item: "notenote notenote notenote notenote", isStriked: false }
  ]);

  const [deadlines, setDeadlines] = useState([]);

  function handleAdd(toDo) {
    setToDoList((prev) => {
      return [...prev, toDo].filter(
        (element, index, array) => array.indexOf(element) === index
      );
    });

    setDeadlines((prev) => {
      // const dl = toDoList.map((toDo) => {
      //   if (toDo.deadline && !prev.includes(toDo.deadline)) {
      //     return toDo.deadline;
      //   } else {
      //     return null;
      //   }
      if (toDo.deadline)
        return [...prev, { deadline: toDo.deadline, displayContent: true }]
          .filter((element, index, array) => array.indexOf(element) === index)
          .sort(sortDate)
          .filter((toDo) => toDo);
      return [...prev];
    });
  }

  function toggleContent(id) {
    console.log("toggle content");
    setDeadlines((prev) => {
      return prev.map((deadline, index) => {
        if (index === id) {
          deadline = {
            ...deadline,
            displayContent: !deadline.displayContent
          };
        }
        return deadline;
      });
    });
  }

  function sortDate(a, b) {
    if (b.deadline) {
      return new Date(a.deadline) - new Date(b.deadline);
    }
    if (b) {
      return new Date(a) - new Date(b);
    } else {
      return 0;
    }
  }

  function deleteItem(id) {
    console.log("in deleteItem", id, toDoList[id]);
    console.log(deadlines[0], deadlines[1]);

    setToDoList((prev) => {
      return prev.filter((item, index) => {
        return index !== id;
      });
    });
  }

  function setIsStriked(id) {
    setToDoList((prev) => {
      return prev.map((item, index) => {
        if (index === id) {
          return {
            ...item,
            isStriked: !item.isStriked
          };
        }
        return item;
      });
    });
  }

  useEffect(() => {
    setDeadlines(() => {
      const tempArray = toDoList
        .map((toDo) => {
          if (toDo.deadline) {
            console.log(toDo.deadline);
            return toDo.deadline;
          } else {
            return null;
          }
        })
        .filter((element, index, array) => array.indexOf(element) === index)
        .sort(sortDate)
        .filter((toDo) => toDo)
        .map((item) => ({
          deadline: item,
          displayContent: true
        }));
      return tempArray;
    });
    setTimeout(() => console.log(deadlines), 1000);
  }, []);

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea handleAdd={handleAdd} />
      <ToDoSection
        deadlines={deadlines}
        toDoList={toDoList}
        deleteItem={deleteItem}
        toggleContent={toggleContent}
        setIsStriked={setIsStriked}
      />
    </div>
  );
}

export default App;

// const state = [
//   {
//     id: "asdfs-121-sfaf",
//     deadline: "2022-06-10",
//     toDo: [
//       { item: "shopping: get eggs", isStriked: true },
//       { item: "write essay", isStriked: false }
//     ]
//   },
//   {
//     id: "sdfds-12321-fdsfs",
//     deadline: "2022-06-12",
//     toDo: [
//       { item: "Meet friends", isStriked: false }
//     ]
//   },
//   {
//     id: "sfsas-1657-asfsa",
//     deadline: "No deadline",
//     toDo: [
//       { item: "Order book", isStriked: true }
//     ]
//   }
// ];
