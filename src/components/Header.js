import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import {
  Home as HomeIcon,
  PersonAdd as PersonAddIcon,
  ExitToApp as ExitToAppIcon,
  Note as NoteIcon,
} from '@material-ui/icons';

import { selectUser } from '../slices/auth';
import { auth } from '../services/firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const history = useHistory();

  const handleLogoutClick = async () => {
    await auth.signOut();
    history.push('/');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Notes App
          </Typography>
          <Button
            component={Link}
            to={'/'}
            startIcon={<HomeIcon />}
            color="inherit"
            size="small"
          >
            Home
          </Button>
          {user ? (
            <>
              <Button
                component={Link}
                to={'/notes'}
                startIcon={<NoteIcon />}
                color="inherit"
                size="small"
              >
                Notes
              </Button>
              <Button
                startIcon={<ExitToAppIcon />}
                color="inherit"
                size="small"
                onClick={handleLogoutClick}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to={'/signin'}
                startIcon={<ExitToAppIcon />}
                color="inherit"
                size="small"
              >
                Sign In
              </Button>
              <Button
                component={Link}
                to={'/signup'}
                startIcon={<PersonAddIcon />}
                color="inherit"
                size="small"
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
