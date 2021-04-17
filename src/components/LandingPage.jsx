import React from 'react';
import Lottie from 'react-lottie';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonArrow from '../components/ui/ButtonArrow';
import animationData from '../animations/landinganimation/data';

const useStyles = makeStyles(theme => ({
  animation: {
    maxWidth: '50em',
    minWidth: '21em',
    marginTop: '2em',
    marginLeft: '10%'
  }
}));

export default function LandingPage() {
  const classes = useStyles();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <Grid container direction='column'>
      <Grid item>
        <Grid container justify='flex-end' alignItems='center' direction='row'>
          <Grid sm item>
            <Typography variant='h2' align='center'>
              Bringing West Coast Technology
              <br />
              to the Midwest
            </Typography>
            <Grid container>
              <Grid item>
                <Button variant='contained'>Free Estimate</Button>
              </Grid>
              <Grid item>
                <Button variant='outlined'>
                  Learn More
                  <ButtonArrow width={15} height={15} fill='red' />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid sm item className={classes.animation}>
            <Lottie
              options={defaultOptions}
              height={'100%'}
              width={'100%'}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
