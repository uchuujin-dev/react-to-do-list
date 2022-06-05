import Calendar from "react-calendar";
import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";

function CalendarModal(props) {
  const [date, setDate] = useState();

  function convertDate(date) {
    const formattedDate = new Date(date);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onHide={props.onHide}
    >
      <Modal.Header
        style={{ backgroundColor: "#eee" }}
        className="no-border"
        closeButton
      >
        <Modal.Title
          style={{ width: "100%" }}
          id="contained-modal-title-vcenter"
        >
          <h2
            className="title-color"
            data-name="title"
            value="Select deadline date"
            // onBlur={(event) => {
            //   props.saveNote(props.id, event);
            // }}
            // onClick={() => {
            //   setIsEditable(true);
            // }}
          >
            Select deadline date
          </h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          outline: "1px solid #cac2c0",
          height: "100%",
          padding: "0.5rem",
          backgroundColor: "#eee"
        }}
      >
        {/* <p
      style={{
        height: "100%",
        padding: "0.5rem"
      }}
      className="description-color"
      onClick={() => {
        setIsEditable(true);
      }}
      contentEditable={isEditable}
      data-name="content"
      onBlur={(event) => {
        props.saveNote(props.id, event);
      }}
      value={props.content}
    >
      {props.content} &nbsp;
    </p> */}
        <center>
          <Calendar
            minDetail="year"
            minDate={new Date()}
            // nextLabel="month>>"
            nextAriaLabel="Go to next month"
            // next2Label="year>>"
            next2AriaLabel="Go to next year"
            // prevLabel="<<month"
            prevAriaLabel="Go to prev month"
            // prev2Label="<<year"
            prev2AriaLabel="Go to prev year"
            value={date}
            onChange={setDate}
          />
        </center>
      </Modal.Body>

      <Modal.Footer style={{ backgroundColor: "#eee" }}>
        <p style={{ color: "#4d686e", textDecoration: "underline" }}>
          Deadlines should be adhered to!!! &nbsp;&nbsp;
        </p>
        <Button
          className="setDeadlineBtn"
          onClick={() => {
            props.setDate(convertDate(date));
            setDate(null);
            console.log(date);
            props.setModalShow(false);
          }}
        >
          Set deadline
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CalendarModal;
