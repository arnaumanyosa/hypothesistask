import { useEffect } from 'react';
import { useState } from 'react';
import './CommentBox.css';
import EditableDiv from './EditableDiv';
import List from './List';
import useFakeData from '../hooks/useFakeData';

// This component includes a form with an input box and a button,
// and a list of the comments done
const CommentBox = () => {
  const [text, setText] = useState('');
  const [textPos, setTextPos] = useState(null);
  const [userQuery, setUserQuery] = useState('');
  const [users, setUsers] = useState([]);
  const { setQuery, data, error } = useFakeData();
  const [messages, setMessages] = useState([]);

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
    setText(newText);
    setUsers([]);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setMessages(prevState => [...prevState, text]);
    setText('');
  };

  return (
    <>
      <form id="comment-box-form" onSubmit={handleSubmit}>
        <EditableDiv text={text} onDivContentChange={updateDivData} />
        <input id="comment-box-form-btn" type="submit" value="Add Comment" />
      </form>

      {textPos && users.length > 0 && (
        <List
          pos={textPos}
          items={users}
          onSelectedItemChange={selectUserFromList}
        />
      )}

      <div id="comments">
        {messages.length === 0 ? (
          <div className="comments-info">No messages yet</div>
        ) : (
          <ul id="comments-list">
            {messages.map((message, index) => (
              <li key={`${index}${message}`}>{message}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default CommentBox;
