import '../styles/TasksList.css'
import { collection, doc, where, query } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Button } from '@mui/material'
import { useState } from 'react'
import { CreateEventModal } from './CreateEventModal'

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

function FilterableTaskTable({ tasks }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

//  sorttasks
  
  return (
    <div className='TasksList'>
      <h2>Tasks grouped for each event</h2>
      <TaskOverview 
        tasks={tasks}/>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} 
        onFilterTextChange={setFilterText} 
        onInStockOnlyChange={setInStockOnly} />
      <TaskTable 
        tasks={tasks} 
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function TaskOverview({tasks}) {

  let notStarted = 0
  let inProgress = 0
  let completed = 0 

  tasks.forEach((task) => {
    if (task.status == "Not Started") { notStarted = notStarted +1 }
    if (task.status == "In Progress") { inProgress = inProgress +1 }
    if (task.status == "Completed") {completed = completed +1 }
  });

  return (
    <div>      
      {notStarted} Not started,  {inProgress} in Progress and {completed} in Completed. Total {tasks.length} tasks are active. 
    </div>
  )
}

function TaskEventNameRow({ EventName }) {
  return (
    <tr>
      <th colSpan="1">
        {EventName}
      </th>
    </tr>
  );
}

function TaskRow({ task }) {
  const name = task.active ? task.name :
    <span style={{ color: 'red' }}>
      {task.name}
    </span>;

  return (
    <tr>
      <td></td>
      <td>{task.category}</td>
      <td>{name}</td>
      <td>{task.Deadline}</td>
      <td>{task.priority}</td>
      <td>{task.responsiblePerson}</td>
      <td>{task.status}</td>
      <td>{task.comments}</td>
    </tr>
  );
}

function TaskTable({ tasks, filterText, inStockOnly }) {
  const rows = [];
  let lastEventName = null;

  tasks.sort(function(a,b){
    let x = a.category.toLowerCase();
    let y = b.category.toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
  });  
  tasks.sort(function(a,b){
    let x = a.EventName.toLowerCase();
    let y = b.EventName.toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
  });

  tasks.forEach((task) => {
    if (
      JSON.stringify(task).toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !task.active) {
      return;
    }
    if (task.EventName !== lastEventName) {
      rows.push(
        <TaskEventNameRow
          EventName={task.EventName}
          key={task.EventName} />
      );
    }
    rows.push(
      <TaskRow
        task={task}
        key={task.name} />
    );
    lastEventName = task.EventName;
  });

  return (

    <table>
      <thead>
        <tr>
          <th>Event</th>
          <th>category</th>
          <th>Name</th>
          <th>Deadline</th>
          <th>priority</th>
          <th>responsiblePerson</th>
          <th>status</th>
          <th>comments</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} placeholder="Search..." 
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly} 
          onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show tasks that are active
      </label>
    </form>
  );
}

export default function TasksList() {
  return <FilterableTaskTable tasks={TASKS} />;
}

/*
export default function Taskslist(tasks = TASKS, filter = "person 1", sortOrder = "Deadline") {
  if (!Array.isArray(tasks)) {
    throw new Error("sd: Tasks parameter must be an array");
  }
  const filteredTasks = tasks.filter((task) => {
    return (
      task.Name.toLowerCase().includes(filter.toLowerCase()) ||
      task.EventName.toLowerCase().includes(filter.toLowerCase()) ||
      task.responsiblePerson.toLowerCase().includes(filter.toLowerCase())
    );
  });

  const groupedTasks = filteredTasks.reduce((acc, task) => {
    if (!acc[task.EventName]) {
      acc[task.EventName] = [];
    }
    acc[task.EventName].push(task);
    return acc;
  }, {});

  return Object.entries(groupedTasks).map(([eventName, tasks]) => {
    return {
      eventName: eventName,
      tasks: tasks
        .sort((a, b) => {
          if (a[sortOrder] < b[sortOrder]) {
            return -1;
          }
          if (a[sortOrder] > b[sortOrder]) {
            return 1;
          }
          return 0;
        })
        .map((task) => {
          return {
            name: task.Name,
            deadline: task.Deadline,
            priority: task.priority,
            status: task.status,
            EventName: task.EventName,
            responsiblePerson: task.responsiblePerson,
            comments: task.comments,
          };
        }),
    };
  });
}
*/


/*
const tasksList = Taskslist(TASKS);

const taskListElement = document.createElement("ul");

tasksList.forEach((event) => {
  const eventElement = document.createElement("li");
  eventElement.textContent = event.eventName;
  const taskList = document.createElement("ul");
  event.tasks.forEach((task) => {
    const taskElement = document.createElement("li");
    taskElement.textContent = `${task.name} - ${task.deadline} - ${task.priority} - ${task.status} - ${task.EventName} - ${task.responsiblePerson} - ${task.comments}`;
    taskList.appendChild(taskElement);
  });
  eventElement.appendChild(taskList);
  taskListElement.appendChild(eventElement);
});

*/