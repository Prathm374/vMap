import React from "react";
import "./Sidebar.css";
import {
  faPlus,
  faMinus,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar() {
  return (
    <div className="sidebr">
      <div className="zoom">
        <button className="zommIn">
          <FontAwesomeIcon icon={faPlus} size="2x" />
        </button>
        <button className="zoomOut">
          <FontAwesomeIcon icon={faMinus} size="2x" />
        </button>
        <button className="layers">
        <FontAwesomeIcon icon={faLayerGroup} size="2x" />
      </button>
      </div>
      {/* <button className="layers">
        <FontAwesomeIcon icon={faLayerGroup} size="2x" />
      </button> */}
    </div>
  );
}
