import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Todo from '@/models/entities/todo';
import style from './style.module.css';

interface Props {
  todo: Todo;

  onEdit?: (title: string) => void;
  onDestroy?: () => void;
  onToggle?: () => void;
}

const TodoItem: React.FC<Props> = ({ todo, onEdit, onDestroy, onToggle }) => {
  const editFieldRef = useRef<HTMLInputElement>(null);

  const [editing, setEditing] = useState(false);

  const shiftToEditMode = useCallback(() => {
    setEditing(true);
  }, []);

  /**
   * Safely manipulate the DOM after `editing` state changed.
   * Or you will focus on a DOM which is not displayed yet.
   */
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
      const title = event.currentTarget.value;
      onEdit?.(title);
    },
    [onEdit],
  );

  return (
    <div className={style.root}>
      <input
        className={classNames({
          [style.toggle]: true,
          [style.editing]: editing,
        })}
        type="checkbox"
        checked={todo.isComplete}
        onChange={onToggle}
      />
      <span
        className={classNames({
          [style.view]: true,
          [style.completed]: todo.isComplete,
          [style.editing]: editing,
        })}
        onDoubleClick={shiftToEditMode}
      >
        {todo.title}
        <button className={style.destroy} type="button" onClick={onDestroy}>
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
        defaultValue={todo.title}
      />
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.instanceOf(Todo).isRequired,
  onEdit: PropTypes.func,
  onDestroy: PropTypes.func,
  onToggle: PropTypes.func,
};

export default TodoItem;
