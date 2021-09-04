import React from 'react';
import TodoItem from '@/components/TodoItem';
import Footer from '@/components/Footer';

interface Props {
  showType: 'all' | 'active' | 'completed';
}

const TodoList: React.FC<Props> = ({ showType }) => {
  const todos = [
    { id: 0, title: '0', isComplete: false },
    { id: 1, title: '1', isComplete: false },
  ];

  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <input placeholder="What needs to be done?" className="new-todo" />
      </header>
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id}>
              <TodoItem title={todo.title} isComplete={todo.isComplete} />
            </li>
          ))}
        </ul>
        <Footer />
      </section>
    </div>
  );
};

export default TodoList;
