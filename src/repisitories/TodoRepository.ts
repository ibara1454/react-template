import Todo from '@/models/Todo';

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

export default class TodoRepository {
  localStorage: Record<string, Todo> = {};

  add(todo: Todo): string {
    const id = uuid();
    this.localStorage[id] = todo;
    return id;
  }

  remove(id: string) {
    delete this.localStorage[id];
  }
}
