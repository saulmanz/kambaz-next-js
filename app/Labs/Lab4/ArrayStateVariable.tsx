import { useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((_, i) => i !== index));
  };

  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>

      <ListGroup>
        {array.map((item, index) => (
          <ListGroupItem key={index}>
            {item}
          </ListGroupItem>
        ))}
      </ListGroup>

      <hr />
      <button onClick={addElement}>Add Element</button>

      <ul>
        {array.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => deleteElement(index)}>Delete</button>
          </li>
        ))}
      </ul>

      <hr />
    </div>
  );
}
