import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Fruits from './Fruits/Fruits';
import './Fruits/Fruits.css'

class App extends Component {

  state={
    fruits:[
      {name:"Mango",quantity:10}
    ]
  }


handleChange=(event)=>{
  let input=event.target.value.split("-");
  this.setState({
    name:input[0],
    quantity:input[1]
  })
}



addFruitHandler=(event)=>{
  const fruits=[...this.state.fruits];
  fruits.push({
    name: this.state.name,
    quantity: this.state.quantity
  });
  this.setState({fruits: fruits});
    document.getElementById("text").value='';
  this.setState({
    name: '',
    quantity: ''
  })
  console.log(this.state.fruits);
  console.log("fruit is added");
}


deleteFruitHandler=(fruitsIndex)=>{
    const fruits=[...this.state.fruits];
    console.log(fruits);
    console.log(fruits.splice(fruitsIndex,1));
    this.setState({fruits:fruits})

}


keyPressed=(event)=> {
    if (event.key === "Enter") {
      this.addFruitHandler();
    }
}


  render() {

    const style2= {
          border: '1px solid black',
          width: '50%',
          align:'center',
          margin:'1% 25%'
    }

    const style={
      backgroundColor:'white',
      border:'1px solid black',
      padding: '8px',
      cursor:'pointer'
};

const style3={
  border:'1px solid black',
  padding: '8px'
}

    return (
      <div className="App">
      <input type="text" id="text" style={style3} placeholder="FruitName-Quantity" onChange={this.handleChange}  onKeyDown={this.keyPressed}/>
      <button style={style}  type="Submit" onClick={this.addFruitHandler}>Submit</button>


      <table style={style2}>
          {this.state.fruits.map((fruit,index) =>{
                      return <Fruits
                      name={fruit.name}
                      quantity={fruit.quantity}
                      click={() => this.deleteFruitHandler(index)}/>
                    })}
          </table>

</div>

    );

  }
}

export default App;
