import React from 'react';
import PropTypes from 'prop-types';
import Footer from '@/components/footer';
import ShowType from '@/models/entities/show-type';
import TodoList from '../todo-list';
import style from './style.module.css';

interface Props {
  showType: ShowType;
}

const TodoTable: React.FC<Props> = ({ showType }) => (
  <div className={style.root}>
    <TodoList showType={showType} />
    <Footer />
  </div>
);

TodoTable.propTypes = {
  showType: PropTypes.oneOf(['all', 'active', 'completed'] as const).isRequired,
};

export default TodoTable;
