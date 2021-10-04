import { copy } from '.';

describe('copy', () => {
  const origin = {
    foo: 123,
    bar: 'any title',
  };

  it('should return new object', () => {
    const actual = copy(origin);
    expect(actual).not.toBe(origin);
  });

  it('should return a object with the given parameters', () => {
    const foo = 456;
    const bar = 'bar';
    const params = { foo, bar };
    const actual = copy(origin, params);
    const expected = {
      foo,
      bar,
    };
    expect(actual).toEqual(expected);
  });
});
