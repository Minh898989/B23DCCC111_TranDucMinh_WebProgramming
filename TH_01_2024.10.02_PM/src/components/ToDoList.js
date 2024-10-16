import React, { useState } from 'react';
import ToDoItem from './ToDoItem';
import { PlusCircleOutlined } from '@ant-design/icons';

const ToDoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Gửi email nộp bài tập về nhà', dueDate: 'Hôm nay', status: 'Todo' },
    { id: 2, title: 'Học từ vựng tiếng anh mỗi ngày', dueDate: 'Ngày mai', status: 'Todo' },
    { id: 3, title: 'Viết tiểu luận môn Triết học', dueDate: 'Tuần tới', status: 'Todo' },
    { id: 4, title: 'Học lập trình với js', dueDate: 'Ngày kia', status: 'Todo' }
  ]);

  const [newTask, setNewTask] = useState({ title: '', dueDate: '' });
  const [isAdding, setIsAdding] = useState(false); 

  const addTask = () => {
    if (newTask.title && newTask.dueDate) {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1, status: 'Todo' }]);
      setNewTask({ title: '', dueDate: '' });
      setIsAdding(false); 
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: task.status === 'Todo' ? 'Done' : 'Todo' } : task
    ));
  };

  return (
    <div className="ToDoList" style={{ textAlign: 'center' }}>
      <h1>My work 🎯</h1>
      <div>
        {tasks.map((task) => (
          <ToDoItem
          key={task.id}
          title={task.title}
          dueDate={task.dueDate}
          isDone={task.status === 'Done'} 
          onDelete={() => deleteTask(task.id)}
          onToggle={() => toggleTaskStatus(task.id)} 
        />        
        ))}
      </div>

      
      {isAdding && (
        <div className="add-task-form">
          <input
            type="text"
            placeholder="New task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Due date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
          <button onClick={addTask}>Save Task</button>
        </div>
      )}

     
      <div style={{ marginTop: '20px', cursor: 'pointer' }}>
        <PlusCircleOutlined 
          style={{ fontSize: '20px', color: '#d1453b' }} 
          onClick={() => setIsAdding(!isAdding)} 
        /> 
        Add Task
      </div>
    </div>
  );
};

export default ToDoList;