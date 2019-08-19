import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import List from '../components/List'
import Detail from '../components/Detail'
import './App.css';

const history = createBrowserHistory();
const API_ENDPOINT = 'https://randomuser.me/api'

class App extends Component {
  
  
  //  Inicializo el constructor con user (se usa para enviar 
  //  por props que usuario se clickeo), searchfield (para poner
  //  la cantidad de perfiles a buscar) y users (donde se guardan
  //  los perfiles que se trajeron en la request) en el estado
  

  constructor() {
    super()
    this.state = { 
      user: {}, 
      searchfield: '', 
      users: []
    }
  }
  //  Se hace el fetch de la data, si hay menos de 50,
  //  no me traigas nada. Si data es > que 50, traeme la
  //  cantidad de perfiles ingresadas en searchfield.
  //  Despues renderizame users y guardalo
  //  en el estado {users: []}


    fetchData = (data) => {
      if(data < 50) return null;
      fetch(`${API_ENDPOINT}/?results=${data}`)
      .then(results => { return results.json()})
      .then(data => { 
        let users = data.results.map(user => (
          <div onClick={()=> this.selectUser(user)} className='tc grow bg-light br3 pa3 ma2 dib bw2 shadow-5' id="card">
            <img src={user.picture.thumbnail} alt='faceperson'/> 
            <p><strong>Full Name: </strong>{user.name.first + " " + user.name.last}</p>
            <p><strong>City: </strong>{user.location.city}</p>
            <p><strong>State: </strong>{user.location.state}</p>
          </div>
          ))
          this.setState({ users: users });
        })
    }

  // Uso componentDidMount para que lo primero que me aparezca 
  // sean 50 perfiles, si o si, por eso le paso de parametro 50.

  componentDidMount() {
    this.fetchData(50)  
  }
  
  // Esta funcion lo que hace es asignar el user actual clickeado al
  // estado, luego te envia al screen /details (localhost:3000/details)

  selectUser(user) {
    this.setState({ user: user })
    history.push('/details')
  }

  // Esta funcion le hace un clear al estado de user en la vista
  // /detail para que cuando se haga click en la vista home,
  // this.state = { user: user } vuelva a ser { user: '' } 
  
  clearUser() {
    this.setState({ user: null })  
    history.goBack()
  }

  // Esta funcion esta atenta a los cambios en 
  // this.state = { searchfield: '' }, si se ingresan algo, 
  // fetchData evalua si hacer la request o no dado el
  // parametro que se le dio 

  onSearchChange = (event) => {
      this.fetchData(event.target.value);
  }

  // Utilizo React Router y React History para poder enrutar las vistas
  // y uso History para poder ir para adelante y para atras.
  // Uso dos directorios, '/' y '/details'. En '/' se encuentra la 
  // lista de los users de la request y en '/details' se encuentra
  // el user clickeado en una nueva vista.
  // En el componente List, le envio la funcion onSearchChange() 
  // para poder enviarle a fetchData() el parametro ingresado en
  // el input.
  // En el componente Detail, le envio la funcion clearUser() para
  // que una vez que el user vuelve a '/', vuelva a 
  // this.state = { user: '' }. 
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