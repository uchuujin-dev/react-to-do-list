import React, { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem.jsx";
import DeadlineHeading from "./DeadlineHeading";

function ToDoSection(props) {
  const [displayNoDeadlines, setDisplayNoDeadlines] = useState(true);
  function toggleContent() {
    setDisplayNoDeadlines(!displayNoDeadlines);
  }

  return (
    <div>
      <ul>
        {props.deadlines &&
          props.deadlines.map((deadline) => {
            return (
              <div>
                <DeadlineHeading
                  id={props.deadlines.indexOf(deadline)}
                  heading={deadline.deadline}
                  toggleContent={props.toggleContent}
                  isShowContent={deadline.displayContent}
                />
                {deadline.displayContent &&
                  props.toDoList
                    .filter((item) => {
                      return item.deadline === deadline.deadline.toString();
                    })
                    .map((item, index) => {
                      return (
                        <ToDoItem
                          key={item.item}
                          item={item.item}
                          id={props.toDoList.indexOf(item)}
                          deleteItem={props.deleteItem}
                          setIsStriked={props.setIsStriked}
                          isStriked={item.isStriked}
                        />
                      );
                    })}
              </div>
            );
          })}
        <DeadlineHeading
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
            })}
      </ul>
    </div>
  );
}

export default ToDoSection;
