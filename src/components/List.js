import React, { Component } from 'react';

import SearchBox from './SearchBox';
import Scroll from './Scroll';

class List extends Component {
  render() {
    const {users} = this.props;
        return (
        <div className='tc'>
          <h1 className='f1'>Intive Training</h1>
          <h3> You'll see at least 50 profiles, you can search for more!</h3>
          <SearchBox searchChange={this.props.onSearchChange}/>
          <Scroll>
            {users}
          </Scroll>
          
      </div>
   )
  }
}

export default List;