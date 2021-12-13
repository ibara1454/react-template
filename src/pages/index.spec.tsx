import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Index from '.';

describe('TodoItem', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Index />
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
