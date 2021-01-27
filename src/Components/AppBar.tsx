import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import { createStyles, Theme, makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  }),
);

interface AppBarProps {
  handleSearch: (text: string) => void;
}

const AppBarComponent: React.FC<AppBarProps> = ({ handleSearch }) => {
  const classes = useStyles();
  const [searchText, updateSearchText] = React.useState<string>('');
  const timer = React.useRef<any>(undefined);
  React.useEffect(() => {
    timer.current = setTimeout(() => {
      handleSearch(searchText);
    }, 400);
    return () => {
      clearTimeout(timer.current);
    }
  }, [searchText, handleSearch]);

  const changeSearchText = React.useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    updateSearchText(event.target.value);
  }, [updateSearchText]);
  return (
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
  )
};

export default React.memo(AppBarComponent);
