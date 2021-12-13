import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Footer from '.';

describe('Footer', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Footer />,
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
