import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    newTodoInput: {
      width: '100%',
    },
  }),
);
interface AddTodoProps {
  addTodo: (text: string) => void,
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
  const classes = useStyles();
  const [text, updateText] = React.useState<string>('');
  
  const changeText = React.useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    updateText(event.target.value);
  }, [updateText]);
  
  const handleSubmit = () => {
    const description = text.trim();
    if (description.length > 0) {
      addTodo(description);
      updateText('');
    }
  };

  return (
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
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add ToDo
        </Button>
      </Grid>
    </Grid>
  );
};

export default React.memo(AddTodo);
