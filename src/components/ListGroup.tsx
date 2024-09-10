// list group component to display the menu with the list of topics that gets passed from the HomeView
import { useState } from "react";
interface ListGroupProps {
  items: any[];
  onSelectedItem: (item: any) => void;
}
function ListGroup({ items, onSelectedItem }: ListGroupProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      {items.length === 0 && <p>No item found</p>}
      <ul
        className="list-group card p-2 rounded-0 shadow-sm"
        style={{ width: "250px" }}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className={
              selectedIndex === index
                ? "list-group-item active rounded-0"
                : "list-group-item rounded-0"
            }
            onClick={() => {
              setSelectedIndex(index);
              onSelectedItem(item);
            }}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
