import { v4 as uuidv4 } from 'uuid';

export interface Todo {
  id: string;
  title: string;
  isComplete: boolean;
}

/**
 * The factory method.
 * Create new todo item with the given title.
 *
 * @param title - The content of todo item.
 * @returns New todo item with the given title.
 */
export function create(title: string): Todo {
  // Generate an unique uuid for this new todo item.
  const id = uuidv4();
  return { id, title, isComplete: false };
}
