import { useCallback, useState } from 'react';
import type { Todo } from '@/models/entities/todo';
import { copy } from '@/models/entities';

export const useTodo = (initState: Todo[] = []) => {
  const [todos, setTodos] = useState<Todo[]>(initState);

  const add = useCallback((todo: Todo) => {
    setTodos((prev) => [...prev, todo]);
  }, []);

  const toggle = useCallback((todo: Todo) => {
    setTodos((prev) =>
      prev.map((value) => {
        if (value !== todo) {
          return value;
        }
        return copy(todo, { isComplete: !todo.isComplete });
      }),
    );
  }, []);

  const toggleAll = useCallback(() => {
    setTodos((prev) => {
      const toggled = prev.every(({ isComplete }) => isComplete);
      return prev.map((todo) => copy(todo, { isComplete: !toggled }));
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
        return copy(todo, { title });
      }),
    );
  }, []);

  return { todos, add, toggle, toggleAll, clearCompleted, destroy, update };
};

/**
 * Determine whether the elements in the given todo items are all completed.
 * @param todos - The array contains todo items.
 * @returns `true` if all todo items are completed, otherwise it returns `false`.
 */
export function isAllCompleted(todos: Todo[]): boolean {
  return todos.every(({ isComplete }) => isComplete);
}

/**
 * This function returns a new array with all elements are not completed.
 * @param todos - The array contains todo items.
 * @returns A new array with all elements are not completed.
 */
export function filterActive(todos: Todo[]): Todo[] {
  return todos.filter((todo) => !todo.isComplete);
}

/**
 * This function returns a new array with all elements are completed.
 * @param todos - The array contains todo items.
 * @returns A new array with all elements are completed.
 */
export function filterCompleted(todos: Todo[]): Todo[] {
  return todos.filter((todo) => todo.isComplete);
}
