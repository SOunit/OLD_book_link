import { useState } from 'react';
import NewItem from './components/NewItem';
import Item from './models/item';

function App() {
  const [items, setItems] = useState<Item[]>([]);

  const addItemHandler = (item: Item) => {
    setItems((prevItems) => {
      return prevItems.concat(item);
    });
  };

  return (
    <div>
      <NewItem onAddItem={addItemHandler} />
    </div>
  );
}

export default App;
