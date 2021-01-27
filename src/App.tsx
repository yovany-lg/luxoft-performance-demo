import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import { ToDo } from './types';
import ToDoComponent from './Components/ToDo';
import AddTodo from './Components/AddTodo';
import AppBarComponent from './Components/AppBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    listRoot: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
    },
    list: {
      width: '100%',
      maxWidth: 600,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

const initialTodos: ToDo[] = [
  {
    id: uuidv4(),
    description: 'Watch YouTube videos',
    completed: false
  },
  {
    id: uuidv4(),
    description: 'Watch Game of Thrones',
    completed: false
  },
  {
    id: uuidv4(),
    description: 'NVM... Breaking Bad is the best',
    completed: false
  },
  {
    id: uuidv4(),
    description: 'Work on Unit Tests... what a fun!!',
    completed: false
  },
  {
    id: uuidv4(),
    description: 'Improve App performance... yeah right!!',
    completed: false
  },
  {
    id: uuidv4(),
    description: 'Watch Netflix now?... why not?',
    completed: false
  },
  {
    id: uuidv4(),
    description: 'Need to watch Disney movies now... I love you Elsa!',
    completed: false
  },
  {
    id: uuidv4(),
    description: 'Complete my assignments',
    completed: false
  },
]

export default function ClippedDrawer() {
  const classes = useStyles();
  const [todos, updateTodos] = React.useState<ToDo[]>(initialTodos);
  const [search, handleSearch] = React.useState<string>('');

  const toggleTodo = React.useCallback((id: string) => {
    updateTodos(todos => {
      const todoIndex = todos.findIndex(todo => todo.id === id);
      const updatedTodo: ToDo = {
        ...todos[todoIndex],
        completed: !todos[todoIndex].completed,
      };
      const newTodos = [...todos.slice(0, todoIndex), updatedTodo, ...todos.slice(todoIndex + 1)];
      return newTodos;
    });
  }, [updateTodos]);

  const addTodo = React.useCallback((text: string) => {
    updateTodos(todos => todos.concat({
      id: uuidv4(),
      description: text,
      completed: false,
    }));
  }, []);

  const filteredTodos = React.useMemo(
    () => search.length > 0 ? todos.filter(todo => todo.description.toLowerCase().includes(search)) : todos,
    [todos, search]
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBarComponent handleSearch={handleSearch} />
      <main className={classes.content}>
        <Toolbar />
        <AddTodo addTodo={addTodo} />
        <div className={classes.listRoot}>
          <List className={classes.list}>
            {filteredTodos.map((todo) => <ToDoComponent key={todo.id} todo={todo} toggleTodo={toggleTodo} />)}
          </List>
        </div>
      </main>
    </div>
  );
}
