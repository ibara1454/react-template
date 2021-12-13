import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import TodoTable from '.';

describe('TodoTable', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <TodoTable showType="all" />,
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
