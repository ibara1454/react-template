import { string } from 'prop-types';
import { useCallback, useState } from 'react';

const uuid = () => {
  /* jshint bitwise:false */
  let i;
  let random;
  let id = '';

  for (i = 0; i < 32; i += 1) {
    random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      id += '-';
    }
    id += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }

  return id;
};

export default function useList<T>() {
  const [elements, setElements] = useState<Array<[string, T]>>([]);

  const add = useCallback((elem: T) => {
    const id = uuid();
    const newItem: [string, T] = [id, elem];
    setElements((prevState) => [...prevState, newItem]);
    return id;
  }, []);

  const remove = useCallback((id: string) => {
    setElements((prevState) => prevState.filter(([elemId]) => elemId !== id));
  }, []);

  const replace = (f: (id: string, elem: T) => T) => {
    setElements((prevState) =>
      prevState.map(([id, elem]) => [id, f(id, elem)]),
    );
  };

  const map = <R>(f: (id: string, elem: T) => R) =>
    elements.map(([id, elem]) => f(id, elem));

  const filter = useCallback(
    (func: (id: string, elem: T) => boolean) =>
      elements.filter(([id, elem]) => func(id, elem)).map(([_, elem]) => elem),
    [elements],
  );

  return { add, remove, replace, map, filter };
}
