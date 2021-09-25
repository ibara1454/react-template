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
import Todo from '@/models/entities/todo';
import Footer from '@/components/footer';
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
      add(Todo.create(title));
      // Clear the input field.
      target.value = '';
    },
    [add],
  );

  const toggled = isAllCompleted(todos);

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
    <div className={style.root}>
      <header className={style.header}>
        <input
          placeholder="What needs to be done?"
          className={style.newTodo}
          onKeyDown={handleNewTodoKeyDown}
        />
        <label
          className={classNames({
            [style.toggleAll]: true,
            [style.toggled]: toggled,
          })}
        >
          <input type="checkbox" checked={toggled} onChange={toggleAll} />
        </label>
      </header>

      <section className={style.main}>
        <ul className={style.todoList}>
          {filteredTodos.map((todo) => (
            <li key={todo.id}>
              <TodoItem
                todo={todo}
                onEdit={(title) => {
                  update(todo, title);
                }}
                onDestroy={() => destroy(todo)}
                onToggle={() => toggle(todo)}
              />
            </li>
          ))}
        </ul>
        <Footer />
      </section>
    </div>
  );
};

TodoList.propTypes = {
  showType: PropTypes.oneOf(['all', 'active', 'completed'] as const).isRequired,
};

export default TodoList;
