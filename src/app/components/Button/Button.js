import React, { useState, useEffect } from "react";

const Button = (props) => {
    const { icon, label, onClickHandler, className, disabled, buttonComp } = props;

    return (
      <>
      {buttonComp == "pdfShare" ? 
        <button className={className} onClick={onClickHandler} disabled={disabled}>
          {icon} {disabled ? <i class="fa fa-refresh fa-spin"></i> : label}
        </button> : 
        <button className={className} onClick={onClickHandler} disabled={disabled}>
          {icon} {label}
        </button>
        }
      </>  
    );
};

export default Button;