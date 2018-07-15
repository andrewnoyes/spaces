import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <h3>Placeholder :p</h3>
        <Link to='/account'>Account</Link>
      </div>
    )
  }
}

export default Home;