import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import theme from './ui/Theme';
import Header from './ui/Header';
import Footer from './ui/Footer';
import LandingPage from '../components/LandingPage';

import { ThemeProvider } from '@material-ui/styles';

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
          value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) =>
              <LandingPage
                {...props}
                setValue={setValue}
                setSelectedIndex={setSelectedIndex}
              />}
          />
          <Route path="/services" exact component={() => <div>Services</div>} />
          <Route
            path="/revolution"
            exact
            component={() => <div>Revolution</div>}
          />
          <Route path="/about" exact component={() => <div>About Us</div>} />
          <Route
            path="/contact"
            exact
            component={() => <div>Contact Us</div>}
          />
          <Route path="/estimate" exact component={() => <div>Estimate</div>} />
          <Route
            path="/customsoftware"
            exact
            component={() => <div>Custom Software</div>}
          />
          <Route
            path="/mobileapps"
            exact
            component={() => <div>Mobile Apps</div>}
          />
          <Route path="/websites" exact component={() => <div>Websites</div>} />
        </Switch>
        <Footer
          setValue={setValue}
          setSelectedIndex={setSelectedIndex}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;