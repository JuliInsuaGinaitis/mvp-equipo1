import React, {useState} from 'react';
import axios from 'axios';
import logo from './isotipo-j-color.png';
import corchea from './corchea.png';
import catalog from './catalog.png';
import './App.css';
import user from './user.png'
import MainButton from './mainButton.js'

function App () {
  const [products, setProducts] = useState(0)
  const [users, setUsers] = useState(0)
  const [lastUser, setLastUser] = useState(0)
  const [lastProduct, setLastProduct] = useState(0)
  const [cat, setCat] = useState(0);

  function getData (){
    axios.get('http://localhost:5000/api/products/')
    .then(function (response) {
      console.log(response)
      const prodData = response.data
      
      setProducts(prodData.data)
    })
    .catch(function (error) {
      console.log(error);})


      axios.get('http://localhost:5000/api/users/')
    .then(function (response) {
      console.log(response)
      const userData = response.data
      setUsers(userData.data)
    })
    .catch(function (error) {
      console.log(error);})


  console.log(users)
  console.log(products)
  }
  
  function getLastUser (){
    for(let i = 0; i < users.length; i++){
      if (i = users[i].id){
        setLastUser(users[i])
      }
    }
  }

  function getLastProduct (){
    for(let i = 0; i < products.length; i++){
      if (i = products[i].id){
        setLastProduct(products[i])
      }
    }
  }

  function handler(){
    getData();
    getLastUser();
    getLastProduct();
  }
  

 
  
  

  return (
    <div className="App">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.1/axios.min.js"></script>
      <header className="App-header">
        <img src={logo} className="jLogo" alt="xd" />
      </header>
      <div className="mainAppContainer">
        <div className="first">
        <MainButton title='Usuarios'>
          <div className="1box">
          <img src={user} className="graphSample" alt="xd" onClick={() => handler()}/>
          <div className="1numberC">
            <p className="1number1">{users.length} usuarios totales.</p>
          </div>
          </div>
        </MainButton>
        <MainButton title='Productos'>
          <div className="2box">
          <img src={corchea} className="graphSample" alt="xd"/>
          <div className="2numberC">
            <p className="2number1">{products.length} productos totales.</p>
          </div>
          </div>
        </MainButton>
        <MainButton title='Categorías'>
          <div className="3box">
          <img src={catalog} className="graphSample" alt="xd"/>
          <div className="3numberC">
            <p className="3number1">5 categorías totales</p>
          </div>
          </div>
        </MainButton>
        </div>
        <div className="second">
        <MainButton title='Último    Usuario'>
          <div className="4box">
          <p className="mainText">{lastUser.name}</p>
          <img src={lastUser.file} className="graphSample" alt="xd"/>
          <div className="4numberC">
            <p className="4number1">{lastUser.email}</p>
          </div>
          </div>
        </MainButton>
        <MainButton title='Último producto'>
          <div className="5box">
          <p className="mainText">{lastProduct.name}</p>
          <img src={lastProduct.image} className="graphSample" alt="xd"/>
          <div className="5numberC">
            <p className="5number1">{lastProduct.main_category}</p>
            <p className="5number2">{lastProduct.final_price}</p>
          </div>
          </div>
        </MainButton>
        {/* <MainButton title='Todos los productos'>
          <div className="6box">
          <ul>
                <li>Link 1</li>
                <li>Link 2</li>
                <li>Link 3</li>
                <li>Link 4</li>
                <li>Link 5</li>
                <li>Link 6</li> 
                <li>Link 7</li>
                <li>Link 8</li>
                <li>Link 9</li>
                <li>Link 10</li>
                <li>Link 11</li>
                <li>Link 13</li>
                <li>Link 13</li>
          </ul> 
          </div>
        </MainButton> */}
         </div>
      </div>
      </div>
  )
  }

export default App;
