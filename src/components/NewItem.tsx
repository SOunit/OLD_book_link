import React, { useRef } from 'react';
import Item from '../models/item';

import classes from './NewItem.module.css';

const NewItem: React.FC<{ onAddItem: (item: Item) => void }> = (props) => {
  // setup for useRef to avoid compile error
  // 1. set generics
  // 2. set null as initial value
  const titleInputRef = useRef<HTMLInputElement>(null);
  const categorySelectRef = useRef<HTMLSelectElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // mark ! for guarantee no null
    // this submit function run after rendering, ref is linked, so no null value

    const enteredTitle = titleInputRef.current!.value;
    const enteredCategory = categorySelectRef.current!.value;

    if (!enteredTitle || !enteredCategory) {
      // FIXME: show something
      return;
    }

    props.onAddItem({
      id: Math.random().toString(),
      title: enteredTitle,
      category: enteredCategory,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <label htmlFor='title'>Title</label>
      <input type='text' id='title' ref={titleInputRef} />
      {/* FIXME: get category dynamic */}
      <label htmlFor='category'>Category</label>
      <select id='category' ref={categorySelectRef}>
        <option>Novel</option>
        <option>Comic</option>
        <option>Movie</option>
      </select>
      <button>Add New Item</button>
    </form>
  );
};

export default NewItem;
