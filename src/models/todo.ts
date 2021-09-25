import { useCallback, useState } from 'react';
import Todo from '@/models/entities/todo';

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const add = useCallback((todo: Todo) => {
    setTodos((prev) => [...prev, todo]);
  }, []);

  const toggle = useCallback((todo: Todo) => {
    setTodos((prev) =>
      prev.map((value) => {
        if (value !== todo) {
          return value;
        }
        return todo.copy({ isComplete: !todo.isComplete });
      }),
    );
  }, []);

  const toggleAll = useCallback(() => {
    setTodos((prev) => {
      const toggled = prev.every(({ isComplete }) => isComplete);
      return prev.map((todo) => todo.copy({ isComplete: !toggled }));
    });
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.isComplete));
  }, []);

  const destroy = useCallback((todo: Todo) => {
    setTodos((prev) => prev.filter((value) => value !== todo));
  }, []);

  const update = useCallback((todo: Todo, title: string) => {
    setTodos((prev) =>
      prev.map((value) => {
        if (value !== todo) {
          return value;
        }
        return todo.copy({ title });
      }),
    );
  }, []);

  return { todos, add, toggle, toggleAll, clearCompleted, destroy, update };
};

export function isAllCompleted(todos: Todo[]): boolean {
  return todos.every(({ isComplete }) => isComplete);
}

export function filterActive(todos: Todo[]): Todo[] {
  return todos.filter((todo) => !todo.isComplete);
}

export function filterCompleted(todos: Todo[]): Todo[] {
  return todos.filter((todo) => todo.isComplete);
}
