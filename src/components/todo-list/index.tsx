import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import TodoItem from '@/components/todo-item';
import ShowType from '@/models/show-type';
import Todo from '@/models/todo';
import Footer from '@/components/footer';
import style from './style.module.css';

interface Props {
  showType: ShowType;
}

const TodoList: React.FC<Props> = () => {
  const [todos, setTodos] = useState([
    new Todo('0', false),
    new Todo('1', true),
  ]);

  const toggleAll = useCallback(() => {
    setTodos((prev) => {
      const toggled = prev.every(({ isComplete }) => isComplete);
      return prev.map((todo) => ({ ...todo, isComplete: !toggled }));
    });
  }, []);

  const updateList = useCallback((index: number, todo: Todo) => {
    setTodos((prev) => {
      const init = prev.slice(0, index);
      const tail = prev.slice(index + 1, prev.length);
      const list = [...init, todo, ...tail];
      return list;
    });
  }, []);

  const toggled = todos.every(({ isComplete }) => isComplete);

  return (
    <div className={style.root}>
      <header className={style.header}>
        <input placeholder="What needs to be done?" className={style.newTodo} />
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
          {todos.map((todo, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <TodoItem
                todo={todo}
                onChange={(newTodo) => {
                  updateList(index, newTodo);
                }}
              />
            </li>
          ))}
        </ul>
        <Footer />
      </section>
    </div>
  );
};

export default TodoList;
