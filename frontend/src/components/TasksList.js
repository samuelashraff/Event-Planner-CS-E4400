import '../styles/TasksList.css'
import { collection, doc, where, query } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Button, Checkbox, checkboxClasses } from '@mui/material'
import { CreateEventModal } from './CreateEventModal'
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const TASKS = [
  {EventName: "Event 1", category: "Venue", active: true, name: "Task 1", Deadline: "2023-11-30", priority: "High", status: "In Progress", responsiblePerson: "Person 1", comments: "Comment 1"},
  {EventName: "Event 1", category: "Food & Drinks", active: true, name: "Task 2", Deadline: "2023-12-31", priority: "Low", status: "Not Started", responsiblePerson: "Person 2", comments: "Comment 2"},
  {EventName: "Event 3", category: "Venue", active: true, name: "Task 4", Deadline: "2024-02-28", priority: "High", status: "In Progress", responsiblePerson: "Person 4", comments: "Comment 4"},
  {EventName: "Event 3", category: "Food & Drinks", active: true, name: "Task 5", Deadline: "2024-03-31", priority: "Low", status: "Not Started", responsiblePerson: "Person 5", comments: "Comment 5"},
  {EventName: "Event 1", category: "Speaker", active: true, name: "Task 6", Deadline: "2024-04-30", priority: "Medium", status: "Completed", responsiblePerson: "Person 6", comments: "Comment 6"},
  {EventName: "Event 2", category: "Activity", active: true, name: "Task 3", Deadline: "2024-01-31", priority: "Medium", status: "Completed", responsiblePerson: "Person 3", comments: "Comment 3"},
  {EventName: "Event 1", category: "Decoration", active: true, name: "Task 7", Deadline: "2024-05-31", priority: "High", status: "In Progress", responsiblePerson: "Person 7", comments: "Comment 7"},
  {EventName: "Event 2", category: "Food & Drinks", active: true, name: "Task 8", Deadline: "2024-06-30", priority: "Low", status: "Not Started", responsiblePerson: "Person 8", comments: "Comment 8"},
  {EventName: "Event 2", category: "Speaker", active: true, name: "Task 9", Deadline: "2024-07-31", priority: "Medium", status: "Completed", responsiblePerson: "Person 9", comments: "Comment 9"},
  {EventName: "Event 3", category: "Venue", active: true, name: "Task 10", Deadline: "2024-08-31", priority: "High", status: "In Progress", responsiblePerson: "Person 10", comments: "Comment 10"},
  {EventName: "Event 3", category: "Food & Drinks", active: true, name: "Task 11", Deadline: "2024-09-30", priority: "Low", status: "Not Started", responsiblePerson: "Person 11", comments: "Comment 11"},
  {EventName: "Event 1", category: "Speaker", active: true, name: "Task 12", Deadline: "2024-10-31", priority: "Medium", status: "Completed", responsiblePerson: "Person 12", comments: "Comment 12"},
  {EventName: "Event 1", category: "Decoration", active: true, name: "Task 13", Deadline: "2024-11-30", priority: "High", status: "In Progress", responsiblePerson: "Person 13", comments: "Comment 13"},
  {EventName: "Event 2", category: "Food & Drinks", active: true, name: "Task 14", Deadline: "2024-12-31", priority: "Low", status: "Not Started", responsiblePerson: "Person 14", comments: "Comment 14"},
  {EventName: "Event 2", category: "Activity", active: true, name: "Task 15", Deadline: "2025-01-31", priority: "Medium", status: "Completed", responsiblePerson: "Person 15", comments: "Comment 15"},
  {EventName: "Event 3", category: "Decoration", active: true, name: "Task 16", Deadline: "2025-02-28", priority: "High", status: "In Progress", responsiblePerson: "Person 16", comments: "Comment 16"}
];

export default function TasksList({eventId}) {
  
  const [tasks, setTasks] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      // TDOO: Update Endpoint to Firebase
      const response = await axios.get(`http://localhost:3500/todos?eventId=${eventId}`);
      setTasks(response.data);
    };

    fetchTasks();
  }, [eventId]);

  const updateTaskStatus = async (task, status) => {
    // Add your API endpoint for updating task status
    //TODO: Update all fields of tasks
    task.completed = status;

    await axios.put(`http://localhost:3500/todos/${task.id}`, task);
    // Update tasks state after status update
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const filteredTasks = tasks.filter(task => JSON.stringify(task).toLowerCase().includes(filterText.toLowerCase()));

    return <div >
      <input type="text" value={filterText} onChange={handleFilterChange} placeholder="Filter tasks" />
      <div className='task-list' >
        {filteredTasks.slice(0,12).map((task) => (
          <TaskCard key={task.id} task={task} updateTaskStatus={updateTaskStatus} />
        ))}
      </div>
      <NewTaskForm eventId={eventId} />
    </div>
}


// Task Card Component
const TaskCard = ({ task, updateTaskStatus }) => (
  <div className='task-card' >
    <p> Name: {task.name}</p>
    <p> Desc: {task.description}</p>
    {task.completed || <button onClick={() => updateTaskStatus(task, true)}>Mark as Completed</button>
    }
</div>
);

// New Task Form Component
const NewTaskForm = ({ eventId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const createTask = async (e) => {
    e.preventDefault();
    // Add your API endpoint for creating tasks
    const response = await axios.post('http://localhost:3500/todos', { name, description, eventId });
    // Handle task creation response
  };

  return (
    <form onSubmit={createTask}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Task Name" />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">Create Task</button>
    </form>
  );
};