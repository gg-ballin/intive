import React, { Component } from 'react';

// Vista de detalle del usuario clickeado. Los datos que 
// se muestran, son enviados por props.

class Detail extends Component {
    render() {
    const {user} = this.props;
        return (
        <div className='tc'>
          <h1 className='f1'>User Detail</h1>
          <div className='tc  bg-light br3 pa3 ma2 dib bw2 shadow-1' id="card">
            <img src={user.picture.large} alt='personface'/> 
            <p><strong>Full Name:</strong> {JSON.stringify(user.name.first + " " + user.name.last)}</p>
            <p><strong>E-mail:</strong> {JSON.stringify(user.email)} </p>
            <p><strong>Username:</strong> {JSON.stringify(user.login.username)}</p>
            <p><strong>Phone</strong> {JSON.stringify(user.phone)}</p>
            <p><strong>Cellphone:</strong> {JSON.stringify(user.cell)}</p>
          </div>
          
        </div>
   )
        
  }
}

export default Detail;