import React, { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem.jsx";
import InputArea from "./InputArea.jsx";
import DeadlineHeading from "./DeadlineHeading";

function App() {
  const [toDoList, setToDoList] = useState([
    { item: "hello", deadline: "2022-06-01" },
    { item: "I'm here", deadline: "2022-05-30" },
    { item: "repeated", deadline: "2022-06-02" },
    { item: "repeat", deadline: "2022-06-02" },
    { item: "I'm first", deadline: "2022-05-29" },
    { item: "notenote notenote notenote notenote" }
  ]);

  const [deadlines, setDeadlines] = useState([]);

  function handleAdd(toDo) {
    setToDoList((prev) => {
      return [...prev, toDo].filter(
        (element, index, array) => array.indexOf(element) === index
      );
    });

    setDeadlines((prev) => {
      return toDoList
        .map((toDo) => {
          if (toDo.deadline) {
            return toDo.deadline;
          } else {
            return null;
          }
        })
        .filter((element, index, array) => array.indexOf(element) === index)
        .sort(sortDate)
        .filter((toDo) => toDo);
    });
  }

  function sortDate(a, b) {
    if (b) {
      console.log("sorting", new Date(a), new Date(b));
      return new Date(a) - new Date(b);
    } else {
      return 0;
    }
  }

  function deleteItem(id) {
    setToDoList((prev) => {
      return prev.filter((item, index) => {
        return index !== id;
      });
    });
  }

  useEffect(() => {
    setDeadlines((prev) => {
      return toDoList
        .map((toDo) => {
          if (toDo.deadline) {
            return toDo.deadline;
          } else {
            return null;
          }
        })
        .filter((element, index, array) => array.indexOf(element) === index)
        .sort(sortDate)
        .filter((toDo) => toDo);
    });
  }, []);

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea handleAdd={handleAdd} />
      <div>
        <ul>
          {deadlines.map((deadline) => {
            return (
              <div>
                <DeadlineHeading heading={deadline} />
                {toDoList
                  .filter((item) => {
                    return item.deadline === deadline.toString();
                  })
                  .map((item, index) => {
                    return (
                      <ToDoItem
                        key={item.item}
                        item={item.item}
                        id={index}
                        deleteItem={deleteItem}
                      />
                    );
                  })}
              </div>
            );
          })}
          <DeadlineHeading heading="No deadlines" />
          {toDoList
            .filter((item) => {
              return !item.deadline;
            })
            .map((item, index) => {
              return (
                <ToDoItem
                  key={item.item}
                  item={item.item}
                  id={index}
                  deleteItem={deleteItem}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default App;
