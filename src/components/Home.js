import React from 'react';
import Notes from './Notes';

import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';

defineElement(lottie.loadAnimation);


const Home = (props) => {
  return (
    <div>
      <Notes showAlert={props.showAlert} />
    </div>
  );
};

export default Home;
