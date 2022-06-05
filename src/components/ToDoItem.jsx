import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckBoxOutlineBlankTwoToneIcon from "@mui/icons-material/CheckBoxOutlineBlankTwoTone";
import CheckBoxTwoToneIcon from "@mui/icons-material/CheckBoxTwoTone";

function ToDoItem(props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onClick={() => {
        props.setIsStriked(props.id, props.itemObject);
      }}
    >
      <article
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
      >
        <li
          style={
            props.isStriked
              ? { textDecoration: "line-through", color: "#7e8180" }
              : {}
          }
        >
          {props.isStriked ? (
            <CheckBoxTwoToneIcon fontSize="medium" className="checkBox" />
          ) : (
            <CheckBoxOutlineBlankTwoToneIcon
              fontSize="medium"
              className="checkBox"
            />
          )}
          {props.item}
          {isHover && (
            <button
              className="deleteBtn"
              onClick={(e) => {
                props.deleteItem(props.itemObject, props.id);
                e.stopPropagation();
              }}
            >
              <DeleteIcon fontSize="medium" />
            </button>
          )}
        </li>
      </article>
    </div>
  );
}
export default ToDoItem;
