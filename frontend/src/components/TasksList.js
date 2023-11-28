import '../styles/TasksList.css'
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'
import { collection, query, getDocs, where, doc, limit,addDoc, updateDoc } from 'firebase/firestore'

export default function TasksList() {
  
  const [tasks, setTasks] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {

    const fetchTasks = async () => {
      const tasksQuery = query(collection(db, "tasks"), where("userRef", "==", auth.currentUser.uid), limit(8))
      const tasksSnapShot = await getDocs(tasksQuery)
      const tasksData = tasksSnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setTasks(tasksData);
    };
    fetchTasks()
  }, [])


  const updateTaskStatus = async (taskId,isCompleted) => {
    try {
      const docRef = doc(collection(db,"tasks"),taskId)
      await updateDoc(docRef, {isCompleted: isCompleted})
      setTasks(tasks => tasks.filter(task => task.id !== taskId))

    }
    catch (e) {
        console.error("Error adding document: ", e)
    }
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const filteredTasks = tasks.filter(task => JSON.stringify(task.name + task.eventName).toLowerCase().includes(filterText.toLowerCase()));

    // Task Card Component
  const TaskCard = ({ task, updateTaskStatus }) => (
    <table className='task-card'>
      <td> {task.eventName}</td>
      <td> {task.name}</td>
      <td> {Intl.DateTimeFormat('en-US',{year: 'numeric', month: '2-digit',day: '2-digit'}).format(task.deadline)} </td>
      <td><button onClick={() => updateTaskStatus(task.id, true)}>Mark as Completed</button></td>
    </table>
  );

  // New Task Form Component
  const NewTaskForm = () => {
    const [eventName, setEventName] = useState('');
    const [name, setName] = useState('');
    const [deadline, setDeadline] = useState('');

    const createTask = async (e) => {
      e.preventDefault();
      try {
        const newTask = {
                          eventName: eventName,
                          eventId: null,
                          name: name,
                          userRef: auth.currentUser.uid,
                          isCompleted: false
                        };
        const docRef = await addDoc(collection(db, "tasks"), newTask )
        console.log("Document written with ID: ", docRef.id)
        setTasks([...tasks,newTask]);
      }
      catch (e) {
          console.error("Error adding document: ", e)
      }
    };

    return (
      <form onSubmit={createTask}>
        <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Event Name" />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Task Name" />
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="Deadline" />
        <button type="submit">Create Task with deadline</button>
      </form>
    );
  };

    return <div >
      <input type="text" value={filterText} onChange={handleFilterChange} placeholder="Filter tasks" />
      <table className='task-card'>
      <th>Event</th>
      <th>TaskName</th>
      <th>Deadline</th>
      <th>Action</th>
      </table>
      <div className='task-list' >
        {filteredTasks.map((task) => (
          task.isCompleted || <TaskCard key={task.id} task={task} updateTaskStatus={updateTaskStatus} />
        ))}
      </div>
      <NewTaskForm />
    </div>
}
