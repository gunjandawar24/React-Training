  import React, { Component } from 'react';
  // import logo from './logo.svg';
  import './App.css';
  import Person from './Person/Person.js';
  import styled from 'styled-components';
  import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
  // import Radium, { StyleRoot } from 'radium';

  const StyledButton = styled.button`
    background-color: ${props => props.alt ? 'red' : 'green'};
    color: white;
    font: inherit;
    border: 1px solid blue;
    padding: 8px;
    cursor: pointer;

    &:hover {
      background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
      color: black;
    }
  `;

  class App extends Component {
    state = {
      persons: [
        { id: '000', name: 'Max', age: 28 },
        { id: '001', name: 'Manu', age: 29 },
        { id: '002', name: 'Stephanie', age: 26 }
      ],
      otherState: 'some other value',
      showPersons:false
    }

  // //manipulating the state upon the click:
  //   switchNameHandler = (newName) => {
  //      // console.log('Was clicked!');
  //      // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
  //      //this feature(setState) is only available in class based componenets;
  //      this.setState( {
  //        persons: [
  //          { name: newName, age: 28 },
  //          { name: 'Manu', age: 29 },
  //          { name: 'Stephanie', age: 27 }
  //        ]
  //      } )
  //    }


     nameChangedHandler = (event) => {
      this.setState( {
        persons: [
          { name: 'Max', age: 28 },
          { name: event.target.value, age: 29 },
          { name: 'Stephanie', age: 26 }
        ]
      } )
    }

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState( { showPersons: !doesShow } );
      }

      deletePersonHandler = (personIndex) => {
          // const persons = this.state.persons.slice();
          const persons = [...this.state.persons];
          persons.splice(personIndex, 1);
          this.setState({persons: persons});
        }


    //render some html to the dom
    render() {
      const style = {
      backgroundColor: 'green',
      color:'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
          backgroundColor: 'lightgreen',
          color: 'black'
        }
    };

  //use this or ternary operator:
    let persons = null;

        if ( this.state.showPersons ) {
          persons = (
            <div>
              {/**map is used to outputting the list*/}
              {this.state.persons.map((person,index) => {
                     return <Person
                           click={() => this.deletePersonHandler(index)}
                           name={person.name}
                           age={person.age}/>
                     })}

                     {/* i dont want to get it like this,i want take input from server..then use upr vala block */}
                     {/* <Person
                       name={this.state.persons[0].name}
                       age={this.state.persons[0].age} />
                     <Person
                       name={this.state.persons[1].name}
                       age={this.state.persons[1].age}
                       click={this.switchNameHandler.bind( this, 'Max!' )}
                       changed={this.nameChangedHandler} >My Hobbies: Racing</Person>
                     <Person
                       name={this.state.persons[2].name}
                       age={this.state.persons[2].age} />
                       */}
          </div>
          );

      //     style.backgroundColor = 'red';
      //     style[':hover'] = {
      //     backgroundColor: 'salmon',
      //     color: 'black'
      // };
    }


        // let classes=['red','bold'].join(' ');
        // OR
        //to do it dynamically:
        const classes = [];
     if ( this.state.persons.length <= 2 ) {
       classes.push( 'red' ); // classes = ['red']
     }
     if ( this.state.persons.length <= 1 ) {
       classes.push( 'bold' ); // classes = ['red', 'bold']
     }


      return (

        /*this html code gets converted to javascript usong tranpilers..*/
        <div className="App">

           <h1>Hi, I'm a React App</h1>
         <p className={classes.join( ' ' )}>This is really working!</p>
           {/*manipulating the state up on the click or can be done using this.bind()*/}

        {/* <button style={style} onClick={() => this.switchNameHandler('Maximilian!!')}>Switch Name</button>*/}
         {/*now i want on button click these persons should be rendered (apply condition) ,So put persons in another div*/ }
         <StyledButton alt={this.state.showPersons} onClick={this.togglePersonsHandler}>Toggle Persons</StyledButton>
       {persons}




       {/* i cannot use block statements inside neeche vaala block like if() */}
       {/*{
         this.state.showPersons ?
         <div>
           <Person
             name={this.state.persons[0].name}
             age={this.state.persons[0].age} />
           <Person
             name={this.state.persons[1].name}
             age={this.state.persons[1].age}
             click={this.switchNameHandler.bind(this, 'Max!')}
             changed={this.nameChangedHandler} >My Hobbies: Racing</Person>
           <Person
             name={this.state.persons[2].name}
             age={this.state.persons[2].age} />
         </div> : null
       }
  */}


           {/* <Person name="Gunjan" age="28" />
           <Person name="Gaurav" age="29" >I am a brother of Gunjan</Person>
           <Person name="Himanshi" age="26" />
           */}
  {/**/}
        </div>

        // <h1>Let's Learn React</h1>  //only one root element that is div
      );
    }
  }

  export default App;
