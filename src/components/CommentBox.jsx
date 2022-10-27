import { useEffect } from 'react';
import { useState } from 'react';
import './CommentBox.css';
import EditableDiv from './EditableDiv';
import List from './List';

const userList = ['Cristina', 'Christina', 'Cristiano', 'Cristian'];

const CommentBox = () => {
  const [text, setText] = useState('');
  const [updatedText, setUpdatedText] = useState('');
  const [textPos, setTextPos] = useState(null);
  const [userQuery, setUserQuery] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (userQuery.length > 2) setUsers(userList);
    else setUsers([]);
  }, [userQuery]);

  useEffect(() => {
    if (text.includes('@')) {
      const userQuery = text.split('@').pop();
      setUserQuery(userQuery);
    } else setUserQuery('');
  }, [text]);

  const updateDivData = element => {
    // Get the text
    setText(element.textContent);

    // Get the rect
    const cursorRange = document.getSelection().getRangeAt(0);
    const cursorRect = cursorRange.getBoundingClientRect();
    setTextPos({ left: cursorRect.left, top: cursorRect.top });
  };

  const updateText = selectedText => {
    const newText = text
      .split('@')
      .slice(0, -1)
      .concat([selectedText])
      .join(' ');
    setUpdatedText(newText);
    setUsers([]);
  };

  return (
    <>
      <form className="comment-box-form">
        <EditableDiv text={updatedText} onDivContentChange={updateDivData} />
        <input type="submit" value="Add Comment" />
      </form>

      {textPos && users.length > 0 && (
        <List
          pos={textPos}
          items={userList}
          onSelectedItemChange={updateText}
        />
      )}
    </>
  );
};

export default CommentBox;
