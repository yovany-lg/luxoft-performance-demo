import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createStyles, Theme, makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    newTodoInput: {
      width: '100%',
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

interface ToDo {
  id: string;
  description: string;
  completed: boolean;
}

const initialTodos: ToDo[] = [
  {
    id: uuidv4(),
    description: 'Watch YouTube videos',
    completed: false
  },
  {
    id: uuidv4(),
    description: 'Netflix?... why not?',
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
  const [text, updateText] = React.useState<string>('');
  const [todos, updateTodos] = React.useState<ToDo[]>(initialTodos);
  const [searchText, updateSearchText] = React.useState<string>('');

  const toggleTodo = (id: string) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    const updatedTodo: ToDo = {
      ...todos[todoIndex],
      completed: !todos[todoIndex].completed,
    };
    const newTodos = [...todos.slice(0, todoIndex), updatedTodo, ...todos.slice(todoIndex + 1)];
    updateTodos(newTodos);
  };

  const addTodo = () => {
    const description = text.trim();
    if (description.length > 0) {
      updateTodos(todos.concat({
        id: uuidv4(),
        description,
        completed: false,
      }));
      updateText('');
    }
  };

  const changeText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    updateText(event.target.value);
  }

  const changeSearchText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const search = event.target.value;
    updateSearchText(search);
  }
  const filteredTodos = searchText.length > 0 ? todos.filter(todo => todo.description.toLowerCase().includes(searchText)) : todos;
  console.log({filteredTodos});
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Performance Demo
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={searchText}
              onChange={changeSearchText}
            />

          </div>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <Toolbar />
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item xs={4}>
            <TextField
              id="standard-full-width"
              className={classes.newTodoInput}
              placeholder="New Todo"
              value={text}
              onChange={changeText}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={addTodo}>
              Add ToDo
            </Button>
          </Grid>
        </Grid>
        <div className={classes.listRoot}>
          <List className={classes.list}>
            {filteredTodos.map((todo) => {
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
            })}
          </List>
        </div>
      </main>
    </div>
  );
}
