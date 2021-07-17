import React from 'react';
import Item from '../models/item';

import classes from './ItemList.module.css';

const ItemList: React.FC<{ items: Item[] }> = (props) => {
  const items = props.items.map((item) => (
    <li className={classes.item} key={item.id}>
      {item.title} / {item.category}
    </li>
  ));

  return <ul className={classes.items}>{items}</ul>;
};

export default ItemList;
