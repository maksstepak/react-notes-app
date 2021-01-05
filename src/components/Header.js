import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectUser } from '../slices/auth';
import { auth } from '../services/firebase';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NoteIcon from '@material-ui/icons/Note';

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
