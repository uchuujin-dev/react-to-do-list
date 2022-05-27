import React, { useState } from "react";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

function InputArea(props) {
  const [toDo, setToDo] = useState({});

  function handleChange(event) {
    const currentToDo = event.target.value;
    setToDo(() => {
      return {
        item: currentToDo
      };
    });
  }

  return (
    <div className="form">
      <form
        onSubmit={(e) => {
          props.handleAdd(toDo);
          setToDo({
            item: ""
          });
          console.log(toDo);
          e.preventDefault();
        }}
      >
        <input
          maxLength="36"
          onChange={handleChange}
          type="text"
          value={toDo.item}
        />
        <button type="submit" disabled={toDo ? false : true}>
          <AddBoxRoundedIcon fontSize="large" />
        </button>
      </form>
    </div>
  );
}
/// { item: "I'm first", deadline: "2022-01-02" },

export default InputArea;
