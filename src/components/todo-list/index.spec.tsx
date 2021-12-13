import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoTable from '.';

jest.mock('@/models/todo', () => {
  const originalModule = jest.requireActual('@/models/todo');

  return {
    ...originalModule,
    useTodo: jest.fn(() => ({
      todos: [
        {
          id: 'id-1',
          title: 'Todo item 1',
          isComplete: false,
        },
        {
          id: 'id-2',
          title: 'Todo item 2',
          isComplete: true,
        },
      ],

      add: jest.fn(),

      remove: jest.fn(),

      toggle: jest.fn(),

      toggleAll: jest.fn(),

      clearCompleted: jest.fn(),

      update: jest.fn(),
    })),
  };
});

beforeEach(() => {
  // Unmounts React trees that were mounted with render.
  cleanup();
});

describe('TodoTable', () => {
  it('should renders all todo items when `showType` is `all`', () => {
    const showType = 'all';
    render(<TodoTable showType={showType} />);

    const todos = screen.getAllByRole('listitem');
    expect(todos).toHaveLength(2);
    expect(todos[0]).toHaveTextContent('Todo item 1');
    expect(todos[1]).toHaveTextContent('Todo item 2');
  });

  it('should renders active items when `showType` is `active`', () => {
    const showType = 'active';
    render(<TodoTable showType={showType} />);

    const todos = screen.getAllByRole('listitem');
    expect(todos).toHaveLength(1);
    expect(todos[0]).toHaveTextContent('Todo item 1');
  });

  it('should renders completed items when `showType` is `completed`', () => {
    const showType = 'completed';
    render(<TodoTable showType={showType} />);

    const todos = screen.getAllByRole('listitem');
    expect(todos).toHaveLength(1);
    expect(todos[0]).toHaveTextContent('Todo item 2');
  });
});
