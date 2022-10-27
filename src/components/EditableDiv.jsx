import React, { useRef } from 'react';
import { useEffect } from 'react';
import './EditableDiv.css';

const EditableDiv = ({ text, onDivContentChange }) => {
  const editableDivRef = useRef();

  useEffect(() => {
    //When the user selects another one from the list
    //the text needs to be updated correctly
    editableDivRef.current.textContent = text;
  }, [text]);

  const inputHandler = event => {
    onDivContentChange(event.target);
  };
  return (
    <div
      id="editable-div-box"
      contentEditable
      suppressContentEditableWarning
      onInput={inputHandler}
      ref={editableDivRef}
    ></div>
  );
};

export default EditableDiv;
