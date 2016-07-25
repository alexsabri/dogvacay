import React from 'react';
import ReactDOM from 'react-dom';
import Search from 'components/Search';

const dest = document.getElementById('content');

ReactDOM.render(
  <Search/>,
  dest
);

window.React = React; // enable debugger
