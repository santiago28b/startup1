import React, { useState } from 'react';

export function Habits() {

    const [goals,setGoals] = useState([]);
    const[newGoal,setNewGoals] = useState("");

    function handleInputChange(event){
        setNewGoals(event.target.value)

    }

    function addGoal(){

    }
    function deleteGoal(index){

    }

    function moveUp(index){

    }
    function moveDown(index){

    }

  return (<div className='goal-list'>

    <h1>Current Goals</h1>
    <div>
        <input 
        type="text"
        placeholder='Enter a Goal...'
        value = {newGoal}
        onChange={handleInputChange} />
        <button 
            className='add-button'
            onClick={addGoal}>
            Add
        </button>
    </div>
  </div>
    
  );
}
