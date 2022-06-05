import React, { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem.jsx";
import DeadlineHeading from "./DeadlineHeading";

function ToDoSection(props) {
  // const [displayNoDeadlines, setDisplayNoDeadlines] = useState(true);
  // function toggleContent() {
  //   setDisplayNoDeadlines(!displayNoDeadlines);
  // }

  return (
    <div>
      <ul>
        {props.toDoList &&
          props.toDoList.map((obj) => {
            return (
              <div>
                <DeadlineHeading
                  id={obj.id}
                  heading={obj.deadline}
                  setDisplayToDo={props.setDisplayToDo}
                  isShowContent={obj.displayToDo}
                />
                {obj.displayToDo &&
                  obj.toDo.map((itemObject) => {
                    return (
                      <ToDoItem
                        key={itemObject.item}
                        item={itemObject.item}
                        itemObject={itemObject}
                        id={obj.id}
                        deleteItem={props.deleteItem}
                        setIsStriked={props.setIsStriked}
                        isStriked={itemObject.isStriked}
                      />
                    );
                  })}
              </div>
            );
          })}
        {/* <DeadlineHeading
          heading="No deadlines"
          id="noDeadlines"
          toggleContent={toggleContent}
          isShowContent={displayNoDeadlines}
        />
        {displayNoDeadlines &&
          props.toDoList
            .filter((item) => {
              return !item.deadline;
            })
            .map((item, index) => {
              return (
                <ToDoItem
                  key={item.item}
                  item={item.item}
                  id={props.toDoList.indexOf(item)}
                  deleteItem={props.deleteItem}
                  isStriked={item.isStriked}
                  setIsStriked={props.setIsStriked}
                />
              );
            })} */}
      </ul>
    </div>
  );
}

export default ToDoSection;
