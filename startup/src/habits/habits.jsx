import React, { useState } from 'react';

export function Habits() {

    const [goals,setGoals] = useState(["exercise for 30 days","save $1000"]);
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
    <ol>
        {goals.map((goal,index)=>
        <li key={index} >
            <span className='text'>{goal}</span>
            <button className='delete-button'
            onClick={()=>deleteGoal(index)}>
                Delete
            </button>
            <button className='move-button'
            onClick={()=>moveUp(index)}>
                👆
            </button>
            <button className='move-button'
            onClick={()=>moveDown(index)}>
                👇
            </button>
            
        </li>
        )}
    </ol>
  </div>
    
  );
}
