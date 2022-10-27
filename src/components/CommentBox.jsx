import { useEffect } from 'react';
import { useState } from 'react';
import './CommentBox.css';
import EditableDiv from './EditableDiv';
import List from './List';
import useFakeData from '../hooks/useFakeData';

const CommentBox = () => {
  const [text, setText] = useState('');
  const [updatedText, setUpdatedText] = useState('');
  const [textPos, setTextPos] = useState(null);
  const [userQuery, setUserQuery] = useState('');
  const [users, setUsers] = useState([]);
  const { setQuery, data, error } = useFakeData();

  useEffect(() => {
    // Simple debounce function to avoid hitting the service too much
    const debounceSetQuery = setTimeout(() => {
      setQuery(userQuery);
    }, 100);

    return () => {
      clearTimeout(debounceSetQuery);
      setUsers([]);
    };
  }, [userQuery, setQuery]);

  useEffect(() => {
    const userList = data.map(item => `${item.username} (${item.name})`);
    setUsers(userList);
  }, [data]);

  useEffect(() => {
    if (error.length > 0) console.log(error);
  }, [error]);

  useEffect(() => {
    // User can tag another's by typing @ first
    if (text.includes('@')) {
      const userQuery = text.split('@').pop();
      setUserQuery(userQuery);
    } else setUserQuery('');
  }, [text]);

  const updateDivData = element => {
    // Get the text
    setText(element.textContent);

    // Get the position of the cursor
    const cursorRange = document.getSelection().getRangeAt(0);
    const cursorRect = cursorRange.getBoundingClientRect();
    setTextPos({ left: cursorRect.left, top: cursorRect.top });
  };

  const selectUserFromList = selectedText => {
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
          items={users}
          onSelectedItemChange={selectUserFromList}
        />
      )}
    </>
  );
};

export default CommentBox;
