import { useEffect } from 'react';
import { useState } from 'react';
import './CommentBox.css';
import List from './List';

const userList = ['Cristina', 'Christina', 'Cristiano', 'Cristian'];

const CommentBox = () => {
  const [value, setValue] = useState('');
  const [userQuery, setUserQuery] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('userQuery', userQuery);
    if (userQuery.length > 2) setUsers(userList);
  }, [userQuery]);

  const handleTextareaChange = event => {
    const textareaValue = event.target.value;
    if (textareaValue.includes('@')) {
      const userQuery = textareaValue.split(' ').pop().slice(1);
      setUserQuery(userQuery);
    }

    setValue(textareaValue);
  };

  return (
    <>
      <form className="comment-box-form">
        <textarea
          className="comment-box"
          placeholder="Add your comment..."
          value={value}
          onChange={handleTextareaChange}
        />
        <input type="submit" value="Add Comment" />
      </form>
      {users.length > 0 && <List items={users} />}
    </>
  );
};

export default CommentBox;
