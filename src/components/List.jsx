import './List.css';

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
