import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import background from '../assets/background.jpg';
import phoneIcon from '../assets/phone.svg';
import emailIcon from '../assets/email.svg';

const useStyles = makeStyles(theme => ({
  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '60em',
  },
}));

export default function Contact() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid container direction='row'>
      <Grid item container direction='column' justify='center' lg={3}>
        <Grid item>
          <Typography variant='h2' style={{lineHeight: 1}}>Contact Us</Typography>
          <Typography variant='body1' style={{color: theme.palette.common.blue}}>We're waiting.</Typography>
        </Grid>
        <Grid item container>
          <Grid item>
            <img
              src={phoneIcon}
              alt="phone"
              style={{marginRight: '0.5em', verticalAlign: 'bottom'}}
            />
          </Grid>
          <Grid item>
            <Typography
              variant="body1"
              style={{color: theme.palette.common.blue, fontSize: '1rem'}}
            >
              (555) 555-5555
            </Typography>
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item>
            <img
              src={emailIcon}
              alt="envelope"
              style={{marginRight: '0.5em', verticalAlign: 'bottom'}}
            />
          </Grid>
          <Grid item>
            <Typography
              variant="body1"
              style={{color: theme.palette.common.blue, fontSize: '1rem'}}
            >
              sagnikghoshmandra@gmail.com
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container className={classes.background} lg={9}></Grid>
    </Grid>
  );
}
