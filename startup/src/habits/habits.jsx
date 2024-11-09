import React, { useState } from 'react';
import './habits.css';


export function Habits() {

    const [goals,setGoals] = useState(["exercise for 30 days","save $1000"]);
    const[newGoal,setNewGoals] = useState("");

    function handleInputChange(event){
        setNewGoals(event.target.value)

    }

    function addGoal(){
        if(newGoal.trim() !== ""){
            setGoals(g =>[...g,newGoal]);
            setNewGoals("");
        }
       
    }
    function deleteGoal(index){
        const updatedGoals = goals.filter((_,i) => i !== index);
        console.log("deleting");
        setGoals(updatedGoals);
        console.log(updatedGoals)


    }

    function moveUp(index){
        if(index > 0){
            const updatedGoals = [...goals];
            [updatedGoals[index],updatedGoals[index-1]]= 
            [updatedGoals[index-1],updatedGoals[index]]
            setGoals(updatedGoals);
        }

    }
    function moveDown(index){
        if(index < goals.length-1){
            const updatedGoals = [...goals];
            [updatedGoals[index],updatedGoals[index+1]]= 
            [updatedGoals[index+1],updatedGoals[index]]
            setGoals(updatedGoals);
        }
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
        <li className='papi' key={index} >
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
