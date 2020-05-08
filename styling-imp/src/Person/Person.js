//Person component which returns some html

import React from 'react';
// import './Person.css';
import styled from 'styled-components';
// import Radium from 'radium';

const StyledDiv = styled.div`
width: 60%;
margin: 16px auto;
border: 1px solid #eee;
box-shadow: 0 2px 3px #ccc;
padding: 16px;
text-align: center;

@media (min-width: 500px) {
width: 450px;
}
`;

const person = ( props ) => {
    return (
        // <div className="Person" style={style}>
        <StyledDiv>
            {/* I want on event to be triggered on paragrapgh click par*/}
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            {/* if i want to display content between opening and closing braces then use this,Example i am a brother*/}
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />
        </StyledDiv>
    );
};

export default person;
