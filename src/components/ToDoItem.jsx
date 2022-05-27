import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckBoxOutlineBlankTwoToneIcon from "@mui/icons-material/CheckBoxOutlineBlankTwoTone";
import CheckBoxTwoToneIcon from "@mui/icons-material/CheckBoxTwoTone";

function ToDoItem(props) {
  const [isStriked, setIsStriked] = useState(false);
  const [isHover, setIsHover] = useState(false);

  function handleClick() {
    setIsStriked((prev) => !prev);
  }
  return (
    <div onClick={handleClick}>
      <li
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        style={{
          textDecoration: isStriked && "line-through",
          color: isStriked && "#7e8180"
        }}
      >
        {isStriked ? (
          <CheckBoxTwoToneIcon fontSize="medium" className="checkBox" />
        ) : (
          <CheckBoxOutlineBlankTwoToneIcon
            fontSize="medium"
            className="checkBox"
          />
        )}
        &nbsp;&nbsp;{props.item}
        {isHover && (
          <button
            className="deleteBtn"
            onClick={(e) => {
              props.deleteItem(props.id);
              e.stopPropagation();
            }}
          >
            <DeleteIcon fontSize="medium" />
          </button>
        )}
      </li>
    </div>
  );
}
export default ToDoItem;
