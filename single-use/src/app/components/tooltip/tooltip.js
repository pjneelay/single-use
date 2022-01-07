import React, { useState, useEffect } from "react";
import "./tooltip.css"

const Tooltip = (props) => {
    const {message, left, top, backgroundColor} = props;
    return (
      <div className = 'su-tooltip' style={{left: left, top: top, backgroundColor: backgroundColor}}>
          <span>{message}</span>
      </div>
    );
};

export default Tooltip;