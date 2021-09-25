import { v4 as uuidv4 } from 'uuid';

interface Properties {
  readonly id: string;
  readonly title: string;
  readonly isComplete: boolean;
}

export default class Todo implements Properties {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly isComplete: boolean,
  ) {}

  copy(param: Partial<Properties>): Todo {
    const { id, title, isComplete } = this;
    return new Todo(
      param.id ?? id,
      param.title ?? title,
      param.isComplete ?? isComplete,
    );
  }

  static create(title: string): Todo {
    // Generate an unique uuid for this new todo item.
    const id = uuidv4();
    return new Todo(id, title, false);
  }
}
