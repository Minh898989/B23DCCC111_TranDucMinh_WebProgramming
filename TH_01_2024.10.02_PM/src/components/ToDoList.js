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
    const [editingTaskId, setEditingTaskId] = useState(null);

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

    const editTask = (taskId) => {
        const taskToEdit = tasks.find(task => task.id === taskId);
        if (taskToEdit) {
            setNewTask({ title: taskToEdit.title, dueDate: taskToEdit.dueDate });
            setEditingTaskId(taskId);
            setIsAdding(true);
        }
    };

    const updateTask = () => {
        setTasks(tasks.map(task =>
            task.id === editingTaskId ? { ...task, title: newTask.title, dueDate: newTask.dueDate } : task
        ));
        setNewTask({ title: '', dueDate: '' });
        setEditingTaskId(null);
        setIsAdding(false);
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
                        onEdit={() => editTask(task.id)} // Call edit function
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
                    {editingTaskId ? (
                        <button onClick={updateTask}>Update Task</button> // Update button
                    ) : (
                        <button onClick={addTask}>Save Task</button>
                    )}
                </div>
            )}

            <div style={{ marginTop: '20px', cursor: 'pointer' }}>
                <PlusCircleOutlined
                    style={{ fontSize: '20px', color: '#d1453b' }}
                    onClick={() => {
                        setIsAdding(!isAdding);
                        if (isAdding) {
                            setEditingTaskId(null); // Reset editing task when adding a new task
                        }
                    }}
                />
                Add Task
            </div>
        </div>
    );
};

export default ToDoList;
