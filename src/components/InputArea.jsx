import React, { useState, useEffect } from "react";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

import { Button } from "react-bootstrap";

import CalendarModal from "./CalendarModal";

function InputArea(props) {
  const [toDo, setToDo] = useState({});
  const [date, setDate] = useState();

  useEffect(() => {
    setToDo(() => {
      if (date) {
        return {
          ...toDo,
          deadline: date
        };
      } else {
        return {
          ...toDo
        };
      }
    });
  }, [date]);

  function handleChange(event) {
    const currentToDo = event.target.value;
    setToDo(() => {
      console.log("inputArea", date);
      console.log("todo", toDo);

      if (date) {
        return {
          item: currentToDo,
          deadline: date,
          isStriked: false
        };
      } else {
        return {
          item: currentToDo,
          isStriked: false
        };
      }
    });
  }

  const [modalShow, setModalShow] = React.useState(false);

  function showCal() {
    setModalShow(true);
  }

  return (
    <div className="form">
      <form
        onSubmit={(e) => {
          props.handleAdd(toDo);
          setToDo({
            item: "",
            deadline: null,
            isStriked: false
          });
          setDate(null);
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
        <button
          className="addBtn"
          type="submit"
          disabled={toDo.item ? false : true}
        >
          <AddBoxRoundedIcon fontSize="large" />
        </button>
        <section>
          <div className="d-grid gap-2" style={{ rowGap: 0 }}>
            <Button
              className="deadlineBtn"
              variant="outline-info"
              onClick={() => showCal()}
            >
              {date ? `current deadline: ${date}` : "Add deadline"}
            </Button>
            {date && (
              <Button
                className="deadlineBtn clearBtn"
                variant="outline-info"
                onClick={() => setDate(null)}
              >
                clear deadline
              </Button>
            )}
          </div>
        </section>
      </form>

      <CalendarModal
        show={modalShow}
        setModalShow={setModalShow}
        onHide={() => setModalShow(false)}
        setDate={setDate}
        date={date}
      />
    </div>
  );
}
/// { item: "I'm first", deadline: "2022-01-02" },

export default InputArea;
