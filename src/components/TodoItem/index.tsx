import React from 'react';
import PropTypes from 'prop-types';

interface Props {
  title: string;
  isComplete: boolean;
}

const TodoItem: React.FC<Props> = ({ title, isComplete }) => (
  <div className="view">
    <label className={isComplete ? 'completed' : undefined}>
      <input className="toggle" type="checkbox" defaultChecked={isComplete} />
      {title}
    </label>
    <button className="destroy" type="button">
      ×
    </button>
    <input className="edit" type="text" defaultValue={title} />
  </div>
);

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
};

export default TodoItem;
