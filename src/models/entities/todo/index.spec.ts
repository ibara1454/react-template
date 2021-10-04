import { create } from '.';

describe('create', () => {
  it('should return new todo item with the same title when title is passed', () => {
    const title = 'any title';
    const actual = create(title);
    expect(actual.title).toEqual(title);
  });
});
