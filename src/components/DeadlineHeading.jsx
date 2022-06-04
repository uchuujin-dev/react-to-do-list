import React from "react";

function DeadlineHeading(props) {
  return (
    <section
      className="deadline"
      onClick={() => {
        if (props.id === "noDeadlines") {
          props.toggleContent();
        } else {
          props.toggleContent(props.id);
        }
      }}
    >
      <h2 style={props.isShowContent ? {} : { backgroundColor: "#2d373a" }}>
        {props.heading}
      </h2>
    </section>
  );
}

export default DeadlineHeading;
