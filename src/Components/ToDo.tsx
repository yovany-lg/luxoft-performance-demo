import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { ToDo } from '../types';

interface ToDoProps {
  todo: ToDo;
  toggleTodo: (id: string) => void;
}

const ToDoComponent: React.FC<ToDoProps> = ({ todo, toggleTodo }) => {
  const labelId = `todo-list-label-${todo.id}`;
 
  return (
    <ListItem key={todo.id} role={undefined} dense button onClick={() => toggleTodo(todo.id)}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={todo.completed}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </ListItemIcon>
      <ListItemText id={labelId} primary={todo.description} />
    </ListItem>
  );
};

export default React.memo(ToDoComponent);
