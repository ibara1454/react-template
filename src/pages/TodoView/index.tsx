import React from 'react';
import PropTypes from 'prop-types';
import TodoList from '@/pages/TodoList';
import style from './style.module.css';

interface Props {
  showType: 'all' | 'active' | 'completed';
}

const TodoView: React.FC<Props> = ({ showType }) => (
  <div>
    <h1 className={style.title}>todos</h1>
    <TodoList showType={showType} />
  </div>
);

TodoView.propTypes = {
  showType: PropTypes.oneOf(['all', 'active', 'completed'] as const).isRequired,
};

export default TodoView;
