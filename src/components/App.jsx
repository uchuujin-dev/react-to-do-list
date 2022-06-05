import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import ToDoItem from "./ToDoItem.jsx";
import InputArea from "./InputArea.jsx";
import DeadlineHeading from "./DeadlineHeading";
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
    // console.log("in handleAdd, newToDo, deadline", newToDo, deadline);
    if (!deadline) {
      // console.log("in !deadline");
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
        // console.log("newTDList", newToDoList);
        newToDoList = [...newToDoList].sort(sortDate);
        return newToDoList;
      });
    } else if (toDoList.some((obj) => obj.deadline === deadline)) {
      // console.log("in deadline");
      setToDoList((prev) => {
        let toDoObj;
        let toDoArray = [...prev]
          .find((obj) => {
            // console.log("obj dl", obj.deadline);
            return obj.deadline === deadline;
          })
          .toDo.filter((obj) => obj.item !== newToDo);
        // console.log("toDoArray", toDoArray);
        toDoArray.push({ item: newToDo, isStriked: false });
        // console.log("toDoArray after push", toDoArray);
        toDoObj = [...prev].find((obj) => obj.deadline === deadline);
        // console.log("toDoObj", toDoObj);
        toDoObj = { ...toDoObj, toDo: toDoArray };
        let newToDoList = prev.filter((obj) => obj.id !== toDoObj.id);

        newToDoList = [...newToDoList, toDoObj];
        // console.log("newTDList", newToDoList);
        newToDoList = [...newToDoList].sort(sortDate);
        // console.log("newToDoList after sorting", newToDoList.sort(sortDate));
        // console.log(new Date("2022-06-13"));
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

  // setToDoList((prev) => {
  //   return [...prev, toDo].filter(
  //     (element, index, array) => array.indexOf(element) === index
  //   );
  // });

  // setDeadlines((prev) => {
  //   // const dl = toDoList.map((toDo) => {
  //   //   if (toDo.deadline && !prev.includes(toDo.deadline)) {
  //   //     return toDo.deadline;
  //   //   } else {
  //   //     return null;
  //   //   }
  //   if (toDo.deadline)
  //     return [...prev, { deadline: toDo.deadline, displayContent: true }]
  //       .filter((element, index, array) => array.indexOf(element) === index)
  //       .sort(sortDate)
  //       .filter((toDo) => toDo);
  //   return [...prev];
  // });

  function sortDate(a, b) {
    if (b.deadline) {
      return a.deadline > b.deadline ? 1 : a.deadline < b.deadline ? -1 : 0;
      // return new Date(a.deadline) < new Date(b.deadline);
    }
    // if (b) {
    //   console.log(b);
    //   return new Date(a) - new Date(b);
    // }
    else {
      return 0;
    }
  }
  function deleteItem(oldToDo, objectId) {
    // oldToDo {item: "something", isStriked: false}
    setToDoList((prev) => {
      // return prev.filter((item, index) => {
      //   return index !== id;
      // });
      console.log("in deleteItem", oldToDo, objectId);
      let found = false;
      let newToDoList = prev.filter((obj) => {
        if (obj.id === objectId) {
          // find obj that matches
          if (obj.toDo.filter((toDo) => toDo !== oldToDo).length === 0) {
            // if removing the toDo from toDo array results in empty array, remove obj
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
    //editToDo {item: "something", isStriked: false}
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
    // console.log("toggle content");
    // setDeadlines((prev) => {
    //   return prev.map((deadline, index) => {
    //     if (index === id) {
    //       deadline = {
    //         ...deadline,
    //         displayContent: !deadline.displayContent
    //       };
    //     }
    //     return deadline;
    //   });
    // });
  }

  // useEffect(() => {
  //   setToDoList((prev) => {
  //     console.log(prev.sort(sortDate));
  //     return prev.sort(sortDate);
  //   });
  //   setTimeout(() => console.log("toDoList", toDoList), 1000);
  // }, []);

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
