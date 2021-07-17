import { useState } from 'react';
import ItemList from './components/ItemList';
import NewItem from './components/NewItem';
import Item from './models/item';

import './App.css';

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
      <ItemList items={items} />
    </div>
  );
}

export default App;
