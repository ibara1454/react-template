import { useCallback, useState } from 'react';
import type { Todo } from '@/models/entities/todo';
import { copy } from '@/models/entities';

/**
 * This custom hook returns the current state of todo items and provides
 * manipulations of them.
 * @param initState - The initial todo items.
 * @example Example for toggle all todo items:
 * ```tsx
 * export function TodoComponent() {
 *   const { todos, toggleAll } useTodo();
 *
 *   return <div>
 *     <button onClick={toggleAll} />
 *     <TodoList data={todos} />
 *   </div>;
 * }
 * ```
 */
export const useTodo = (initState: Todo[] = []) => {
  const [todos, setTodos] = useState<Todo[]>(initState);

  /**
   * Append the given todo item to current todo item array.
   * @param todo - The todo item to insert.
   */
  const add = useCallback((todo: Todo) => {
    setTodos((prev) => [...prev, todo]);
  }, []);

  /**
   * Toggle the `isComplete` value of the specified todo item.
   * @param todo - The specified todo item.
   */
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

  /**
   * Toggle the `isComplete` value for all todo items.
   */
  const toggleAll = useCallback(() => {
    setTodos((prev) => {
      const toggled = prev.every(({ isComplete }) => isComplete);
      return prev.map((todo) => copy(todo, { isComplete: !toggled }));
    });
  }, []);

  /**
   * Remove all todo items which are completed.
   */
  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.isComplete));
  }, []);

  /**
   * Remove the specific todo item from current todo item array.
   * @param todo - The todo item to remove.
   */
  const destroy = useCallback((todo: Todo) => {
    setTodos((prev) => prev.filter((value) => value !== todo));
  }, []);

  /**
   * Update the specific todo item by the given title.
   * @param todo - The specific todo item.
   * @param title - The title to overwrite.
   */
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
