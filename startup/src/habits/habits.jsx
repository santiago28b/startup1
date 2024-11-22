import React, { useState } from 'react';
import './habits.css';


export function Habits() {


    const [goals,setGoals] = useState([]);
    const[newGoal,setNewGoals] = useState("");

    React.useEffect(() => {
        fetch('/api/habits',{
            method: 'GET', // just added to see if it works
            credentials: 'include',
        })
          .then((response) => response.json())
          .then((data) => {
            setGoals(data);
          })
          .catch((error) => console.error('Error fetching habits:', error));
      }, []);

    function handleInputChange(event){
        setNewGoals(event.target.value)

    }

    function addGoal() {
        if (newGoal.trim() !== "") {
          fetch('/api/habits', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ habit: {name:newGoal}}),
          })
            .then((response) => response.json())
            .then((data) => {
              setGoals(data); // Update habits with the latest list
              setNewGoals(""); // Clear the input field
            })
            .catch((error) => console.error('Error adding habit:', error));
        }
      }
    function deleteGoal(id) {
        fetch(`/api/habits/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                setGoals(data); // Update goals with the latest list from the backend
            })
            .catch((error) => console.error('Error deleting habit:', error));
    }
    function moveHabit(id, direction) {
        fetch('/api/habits/move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, direction }),
        })
            .then((response) => response.json())
            .then((data) => {
                setGoals(data); // Update goals with the latest list
            })
            .catch((error) => console.error(`Error moving habit ${direction}:`, error));
    }
    
    function moveUp(id) {
        moveHabit(id, 'up');
    }
    
    function moveDown(id) {
        moveHabit(id, 'down');
    }

  return (<div className='goal-list container-fluid bg-secondary text-center'>

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
        <li className='papi' key={goal.id} >
            <span className='text'>{goal.name}</span>
            <button className='delete-button'
            onClick={()=>deleteGoal(goal.id)}>
                Delete
            </button>
            <button className='move-button'
            onClick={()=>moveUp(goal.id)}>
                👆
            </button>
            <button className='move-button'
            onClick={()=>moveDown(goal.id)}>
                👇
            </button>
            
        </li>
        )}
    </ol>
  </div>
    
  );
}
