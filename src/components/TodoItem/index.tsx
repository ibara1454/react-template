import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Todo from '@/models/Todo';
import style from './style.module.css';

interface Props {
  todo: Todo;
  onChange?: (todo: Todo) => void;
  onDestroy?: () => void;
}

const TodoItem: React.FC<Props> = ({ todo, onChange }) => {
  const { title, isComplete } = todo;

  const onIsCompleteChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      const newTodo = new Todo(title, checked);
      onChange?.(newTodo);
    },
    [title, onChange],
  );

  const editFieldRef = useRef<HTMLInputElement>(null);

  const [editing, setEditing] = useState(false);

  const shiftToEditMode = useCallback(() => {
    setEditing(true);
  }, []);

  useEffect(() => {
    if (editing) {
      const element = editFieldRef.current;
      if (element === null) {
        return;
      }
      element.focus();
      element.setSelectionRange(element.value.length, element.value.length);
    }
  }, [editing]);

  const commitChange = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setEditing(false);
      const { value } = event.currentTarget;
      const newTodo = new Todo(value, isComplete);
      onChange?.(newTodo);
    },
    [isComplete, onChange],
  );

  return (
    <div className={style.root}>
      <input
        className={classNames({
          [style.toggle]: true,
          [style.editing]: editing,
        })}
        type="checkbox"
        checked={isComplete}
        onChange={onIsCompleteChange}
      />
      <span
        className={classNames({
          [style.view]: true,
          [style.completed]: isComplete,
          [style.editing]: editing,
        })}
        onDoubleClick={shiftToEditMode}
      >
        {title}
        <button className={style.destroy} type="button">
          ×
        </button>
      </span>
      <input
        ref={editFieldRef}
        className={classNames({
          [style.edit]: true,
          [style.editing]: editing,
        })}
        type="text"
        onBlur={commitChange}
        defaultValue={title}
      />
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.instanceOf(Todo).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TodoItem;
