import { useCallback } from 'react';
import Todo from '@/models/Todo';
import useList from './useList';

export default function useTodos() {
  const { replace } = useList<Todo>();

  const toggleAll = useCallback(
    (value: boolean) => replace((_, elem) => ({ ...elem, isComplete: value })),
    [replace],
  );

  return {
    toggleAll,
    toggle,
    remove,
    edit,
    save,
    cancel,
    clearCompleted,
  };
}
