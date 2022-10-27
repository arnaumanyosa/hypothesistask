import './List.css';

// List elements related to another component
// (like a dropdown button, etc)
const List = ({ pos, items, onSelectedItemChange }) => {
  const clickHandler = event => {
    onSelectedItemChange(event.target.textContent.split(' ')[0]);
  };

  return (
    <ul
      id="list"
      className="without-bullets"
      style={{
        left: pos.left,
        top: pos.top
      }}
    >
      {items.map(item => (
        <li key={item} onClick={clickHandler}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default List;
