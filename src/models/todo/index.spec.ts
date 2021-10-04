import { isAllCompleted, filterActive, filterCompleted } from '.';
import type { Todo } from '../entities/todo';

describe('isAllCompleted', () => {
  it('should return true when the given array is empty', () => {
    const todos: Todo[] = [];
    const result = isAllCompleted(todos);
    expect(result).toBe(true);
  });

  it('should return true if all the given elements in array are completed', () => {
    const todos: Todo[] = [
      { id: '1', title: 'todo 1', isComplete: true },
      { id: '2', title: 'todo 2', isComplete: true },
    ];
    const result = isAllCompleted(todos);
    expect(result).toBe(true);
  });

  it('should return false if one of the given elements in array is not completed', () => {
    const todos: Todo[] = [
      { id: '1', title: 'todo 1', isComplete: true },
      { id: '2', title: 'todo 2', isComplete: false },
    ];
    const result = isAllCompleted(todos);
    expect(result).toBe(false);
  });
});

describe('filterActive', () => {
  it('should return a array contains all non-completed todos', () => {
    const todos: Todo[] = [
      { id: '1', title: 'todo 1', isComplete: true },
      { id: '2', title: 'todo 2', isComplete: false },
    ];
    const result = filterActive(todos);
    expect(result).toEqual([{ id: '2', title: 'todo 2', isComplete: false }]);
  });
});

describe('filterCompleted', () => {
  it('should return a array contains all completed todos', () => {
    const todos: Todo[] = [
      { id: '1', title: 'todo 1', isComplete: true },
      { id: '2', title: 'todo 2', isComplete: false },
    ];
    const result = filterCompleted(todos);
    expect(result).toEqual([{ id: '1', title: 'todo 1', isComplete: true }]);
  });
});
