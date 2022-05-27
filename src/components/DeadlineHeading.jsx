import React from "react";

function DeadlineHeading(props) {
  return (
    <section className="deadline">
      <h2 style={{ backgroundColor: "#4d686e" }}>{props.heading}</h2>
    </section>
  );
}

export default DeadlineHeading;
