import { renderHook, act } from '@testing-library/react-hooks';
import { useTodo, isAllCompleted, filterActive, filterCompleted } from '.';
import type { Todo } from '../entities/todo';

describe('useTodo', () => {
  it("should have a empty array for default state if we didn't pass any argument", () => {
    const { result } = renderHook(() => useTodo());

    expect(result.current.todos).toEqual([]);
  });

  describe('add', () => {
    it('should return the array with the same item appended when new item is passed', () => {
      const initState: Todo[] = [
        { id: '123-456', title: 'todo 1', isComplete: false },
        { id: '456-789', title: 'todo 2', isComplete: false },
      ];
      const { result } = renderHook(() => useTodo(initState));
      const todo = { id: '789-012', title: 'todo 3', isComplete: false };

      act(() => {
        result.current.add(todo);
      });

      expect(result.current.todos).toEqual([...initState, todo]);
    });
  });

  describe('toggle', () => {
    it('should toggle the `isComplete` value of the specified todo item', () => {
      const target: Todo = {
        id: '456-789',
        title: 'todo 2',
        isComplete: false,
      };
      const initState: Todo[] = [
        { id: '123-456', title: 'todo 1', isComplete: false },
        target,
      ];
      const { result } = renderHook(() => useTodo(initState));
      act(() => {
        result.current.toggle(target);
      });

      expect(result.current.todos).toEqual([
        { id: '123-456', title: 'todo 1', isComplete: false },
        { id: '456-789', title: 'todo 2', isComplete: true },
      ]);
    });
  });

  describe('toggleAll', () => {
    it('should toggle the `isComplete` value for all todo items', () => {
      const initState: Todo[] = [
        { id: '123-456', title: 'todo 1', isComplete: false },
        { id: '456-789', title: 'todo 2', isComplete: false },
      ];
      const { result } = renderHook(() => useTodo(initState));
      act(() => {
        result.current.toggleAll();
      });
      expect(result.current.todos).toEqual([
        { id: '123-456', title: 'todo 1', isComplete: true },
        { id: '456-789', title: 'todo 2', isComplete: true },
      ]);
    });
  });

  describe('clearCompleted', () => {
    it('should remove all todo items which are completed', () => {
      const initState: Todo[] = [
        { id: '123-456', title: 'todo 1', isComplete: true },
        { id: '456-789', title: 'todo 2', isComplete: false },
      ];
      const { result } = renderHook(() => useTodo(initState));
      act(() => {
        result.current.clearCompleted();
      });
      expect(result.current.todos).toEqual([
        { id: '456-789', title: 'todo 2', isComplete: false },
      ]);
    });
  });

  describe('destroy', () => {
    it('should remove the specific todo item from current state', () => {
      const target: Todo = {
        id: '456-789',
        title: 'todo 2',
        isComplete: false,
      };
      const initState: Todo[] = [
        { id: '123-456', title: 'todo 1', isComplete: false },
        target,
      ];
      const { result } = renderHook(() => useTodo(initState));
      act(() => {
        result.current.destroy(target);
      });

      expect(result.current.todos).toEqual([
        { id: '123-456', title: 'todo 1', isComplete: false },
      ]);
    });
  });

  describe('update', () => {
    it('should update the specific todo item by the given title', () => {
      const target: Todo = {
        id: '456-789',
        title: 'todo 2',
        isComplete: false,
      };
      const initState: Todo[] = [
        { id: '123-456', title: 'todo 1', isComplete: false },
        target,
      ];
      const { result } = renderHook(() => useTodo(initState));
      act(() => {
        result.current.update(target, 'new title');
      });

      expect(result.current.todos).toEqual([
        { id: '123-456', title: 'todo 1', isComplete: false },
        { id: '456-789', title: 'new title', isComplete: false },
      ]);
    });
  });
});

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
