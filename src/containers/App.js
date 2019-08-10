import React, { Component } from 'react';
import {Router, Route} from 'react-router-dom'
import { createBrowserHistory } from 'history';
import List from '../components/List'
import Detail from '../components/Detail'
import './App.css';

const history = createBrowserHistory();
const API_ENDPOINT = 'https://randomuser.me/api'

class App extends Component {
  
  constructor() {
    super()
    this.state = { 
      user: {}, 
      searchfield: '', 
      users: []
    }
  }
  
    fetchData = (data) => {
      if(data < 50) return null;
      fetch(`${API_ENDPOINT}/?results=${data}`)
      .then(results => { return results.json()})
      .then(data => { 
        let users = data.results.map(user => (
          <a onClick={()=> this.selectUser(user)} className='tc grow bg-light br3 pa3 ma2 dib bw2 shadow-5' id="card">
            <img src={user.picture.thumbnail} alt='faceperson'/> 
            <p><strong>Full Name: </strong>{user.name.first + " " + user.name.last}</p>
            <p><strong>City: </strong>{user.location.city}</p>
            <p><strong>State: </strong>{user.location.state}</p>
          </a>
          ))
          this.setState({ users: users });
        })
    }

  componentDidMount() {
    this.fetchData(50)  
  }
  
  selectUser(user) {
    this.setState({ user: user })
    history.push('/details')
  }
  
  clearUser() {
    this.setState({ user: null })  
    history.goBack()
  }

  onSearchChange = (event) => {
      this.fetchData(event.target.value);
  }

  render() {
    const {users, user} = this.state;
    return (
      <Router history={history}>
          <Route exact path="/" component={()=> <List users={users} onSearchChange={this.onSearchChange.bind(this)} />} />
          <Route exact path="/details" component={()=> <Detail clearUser={()=> this.clearUser()} user={user} />} />
      </Router> )
  }
}

export default App;