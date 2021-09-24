import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import TodoList from '@/components/todo-list';
import ShowType from '@/models/show-type';
import style from './style.module.css';

interface Props {}

interface Params {
  path?: string;
}

const Root: React.FC<Props> = () => {
  const { path } = useParams<Params>();

  const showType: ShowType | undefined = (() => {
    if (path === undefined) {
      return 'all';
    }
    if (path === 'active') {
      return 'active';
    }
    if (path === 'completed') {
      return 'completed';
    }
    return undefined;
  })();

  if (showType === undefined) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1 className={style.title}>todos</h1>
      <TodoList showType={showType} />
    </div>
  );
};

export default Root;
