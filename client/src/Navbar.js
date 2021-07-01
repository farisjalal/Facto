import React from "react";
import "./facts.css";

function formatDate(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var formattedDate = date.getDate() + " " + months[date.getMonth()];
  return formattedDate;
}

function Navbar(props) {
  return (
    <nav>
      <div class="topnav">
        <button class="ARROW_BUTTON" onClick={props.dateDecr}>
          &lt;
        </button>
        <a class="active">{formatDate(props.displayDate)}</a>
        <button class="ARROW_BUTTON" onClick={props.dateIncr}>
          &gt;
        </button>
        <a href="#news">Notable events in history</a>
      </div>
    </nav>
  );
}

export default Navbar;
