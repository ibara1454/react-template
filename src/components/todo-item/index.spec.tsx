import React from 'react';
import renderer from 'react-test-renderer';
import TodoItem from '.';

describe('TodoItem', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(<TodoItem title="title" isComplete={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
