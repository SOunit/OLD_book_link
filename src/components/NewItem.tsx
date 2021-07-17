import React, { useRef } from 'react';
import Item from '../models/item';
import UserInput from '../hooks/user-input';

import classes from './NewItem.module.css';

const NewItem: React.FC<{ onAddItem: (item: Item) => void }> = (props) => {
  const isNotEmpty = (value: string) => value.trim() !== '';

  const {
    enteredValue: enteredTitle,
    valueIsValid: enteredTitleIsValid,
    hasError: enteredTitleHasError,
    valueInputChangeHandler: titleInputChangeHandler,
    valueInputBlurHandler: titleInputBlurHandler,
    reset: titleInputReset,
  } = UserInput(isNotEmpty);

  // setup for useRef to avoid compile error
  // 1. set generics
  // 2. set null as initial value
  const categorySelectRef = useRef<HTMLSelectElement>(null);

  let formIsValid = false;
  if (enteredTitleIsValid) {
    formIsValid = true;
  }

  const titleInputClasses = enteredTitleHasError ? `${classes.invalid}` : '';

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // mark ! for guarantee no null
    // this submit function run after rendering, ref is linked, so no null value
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

    titleInputReset();
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        id='title'
        value={enteredTitle}
        onChange={titleInputChangeHandler}
        onBlur={titleInputBlurHandler}
        className={titleInputClasses}
      />
      {enteredTitleHasError && <p className='error-text'>title is invalid.</p>}
      {/* FIXME: get category dynamic */}
      <label htmlFor='category'>Category</label>
      <select id='category' ref={categorySelectRef}>
        <option>Novel</option>
        <option>Comic</option>
        <option>Movie</option>
      </select>
      <button disabled={!formIsValid}>Add New Item</button>
    </form>
  );
};

export default NewItem;
