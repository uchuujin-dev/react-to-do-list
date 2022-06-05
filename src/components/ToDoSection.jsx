import ToDoItem from "./ToDoItem.jsx";
import DeadlineHeading from "./DeadlineHeading";

function ToDoSection(props) {
  return (
    <div>
      <ul>
        {props.toDoList &&
          props.toDoList.map((obj) => {
            return (
              <section>
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
              </section>
            );
          })}
      </ul>
    </div>
  );
}

export default ToDoSection;
