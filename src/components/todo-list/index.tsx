import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TodoItem from '@/components/todo-item';
import {
  useTodo,
  isAllCompleted,
  filterActive,
  filterCompleted,
} from '@/models/todo';
import ShowType from '@/models/entities/show-type';
import { create } from '@/models/entities/todo';
import style from './style.module.css';

interface Props {
  showType: ShowType;
}

const TodoList: React.FC<Props> = ({ showType }) => {
  const { todos, add, toggle, toggleAll, destroy, update } = useTodo();

  const handleNewTodoKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') {
        return;
      }
      const target = event.currentTarget;
      const title = target.value;
      // Create new todo item and append it to the end of list.
      add(create(title));
      // Clear the input field.
      target.value = '';
    },
    [add],
  );

  const allCompleted = isAllCompleted(todos);

  const filteredTodos = (() => {
    if (showType === 'active') {
      return filterActive(todos);
    }
    if (showType === 'completed') {
      return filterCompleted(todos);
    }
    return todos;
  })();

  return (
    <div>
      <header className={style.header}>
        <input
          placeholder="What needs to be done?"
          className={style.newTodo}
          onKeyDown={handleNewTodoKeyDown}
        />
        <label
          className={classNames({
            [style.toggleAll]: true,
            [style.toggled]: allCompleted,
          })}
        >
          <input type="checkbox" checked={allCompleted} onChange={toggleAll} />
        </label>
      </header>

      <section className={style.main}>
        <ul className={style.todoList}>
          {filteredTodos.map((todo) => (
            <li key={todo.id}>
              <TodoItem
                title={todo.title}
                isComplete={todo.isComplete}
                onEdit={(title) => {
                  update(todo, title);
                }}
                onDestroy={() => destroy(todo)}
                onToggle={() => toggle(todo)}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

TodoList.propTypes = {
  showType: PropTypes.oneOf(['all', 'active', 'completed'] as const).isRequired,
};

export default TodoList;
