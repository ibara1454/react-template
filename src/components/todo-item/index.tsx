import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './style.module.css';

interface Props {
  title: string;
  isComplete: boolean;

  onEdit?: (title: string) => void;
  onDestroy?: () => void;
  onToggle?: () => void;
}

const TodoItem: React.FC<Props> = ({
  title,
  isComplete,
  onEdit,
  onDestroy,
  onToggle,
}) => {
  const editFieldRef = useRef<HTMLInputElement>(null);

  const [editing, setEditing] = useState(false);

  const handleShiftToEditMode = useCallback(() => {
    setEditing(true);
  }, []);

  const handleChange = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setEditing(false);
      const { value } = event.currentTarget;
      onEdit?.(value);
    },
    [onEdit],
  );

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

  return (
    <div className={style.root}>
      <input
        className={classNames({
          [style.toggle]: true,
          [style.editing]: editing,
        })}
        type="checkbox"
        checked={isComplete}
        onChange={onToggle}
      />
      <span
        className={classNames({
          [style.view]: true,
          [style.completed]: isComplete,
          [style.editing]: editing,
        })}
        onDoubleClick={handleShiftToEditMode}
      >
        {title}
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
        onBlur={handleChange}
        defaultValue={title}
      />
    </div>
  );
};

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onEdit: PropTypes.func,
  onDestroy: PropTypes.func,
  onToggle: PropTypes.func,
};

export default TodoItem;
