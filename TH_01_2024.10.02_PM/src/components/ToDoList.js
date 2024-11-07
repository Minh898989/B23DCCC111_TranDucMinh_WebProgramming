import React, { useState, useEffect } from 'react';
import ToDoItem from './ToDoItem';
import { PlusCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import AuthForm from './AuthForm';  
import { Modal } from 'antd';  

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', dueDate: '' });
    const [isAdding, setIsAdding] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);  
    const [authVisible, setAuthVisible] = useState(false);  
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/todos');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const handleAuthCheck = () => {
        if (!isAuthenticated) {
            setAuthVisible(true);  
            return false;
        }
        return true;
    };

    const addTask = async () => {
        if (!handleAuthCheck()) return;  
        if (newTask.title && newTask.dueDate) {
            try {
                const response = await axios.post('http://localhost:5000/todos', newTask);
                setTasks((prevTasks) => [...prevTasks, response.data]);
                setNewTask({ title: '', dueDate: '' });
                setIsAdding(false);
            } catch (error) {
                console.error('Error adding task:', error);
            }
        } else {
            alert("Please fill in both fields.");
        }
    };

    const deleteTask = async (taskId) => {
        if (!handleAuthCheck()) return;  
        try {
            await axios.delete(`http://localhost:5000/todos/${taskId}`);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const toggleTaskStatus = async (taskId) => {
        const task = tasks.find((t) => t.id === taskId);
        if (task) {
            const updatedTask = { ...task, status: task.status === 'Todo' ? 'Done' : 'Todo' };
            try {
                await axios.put(`http://localhost:5000/todos/${taskId}`, updatedTask);
                setTasks((prevTasks) => prevTasks.map((t) => (t.id === taskId ? updatedTask : t)));
            } catch (error) {
                console.error('Error updating task:', error);
            }
        }
    };

    const editTask = (taskId) => {
        if (!handleAuthCheck()) return;  
        const taskToEdit = tasks.find((task) => task.id === taskId);
        if (taskToEdit) {
            setNewTask({ title: taskToEdit.title, dueDate: taskToEdit.dueDate });
            setEditingTaskId(taskId);
            setIsAdding(true);
        }
    };

    const updateTask = async () => {
        if (!handleAuthCheck()) return;  
        if (editingTaskId) {
            try {
                await axios.put(`http://localhost:5000/todos/${editingTaskId}`, newTask);
                setTasks((prevTasks) => prevTasks.map((task) =>
                    task.id === editingTaskId ? { ...task, title: newTask.title, dueDate: newTask.dueDate } : task
                ));
                setNewTask({ title: '', dueDate: '' });
                setEditingTaskId(null);
                setIsAdding(false);
            } catch (error) {
                console.error('Error updating task:', error);
            }
        }
    };

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);  
        setAuthVisible(false);  
    };

    return (
        <div className="ToDoList" style={{ textAlign: 'center' }}>
            <h1>My Tasks 🎯</h1>
            <div>
                {tasks.map((task) => (
                    <ToDoItem
                        key={task.id}
                        title={task.title}
                        dueDate={task.dueDate}
                        isDone={task.status === 'Done'}
                        onDelete={() => deleteTask(task.id)}
                        onToggle={() => toggleTaskStatus(task.id)}
                        onEdit={() => editTask(task.id)}
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
                        <button onClick={updateTask}>Update Task</button>
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
                            setEditingTaskId(null);
                        }
                    }}
                />
                Add Task
            </div>

            
            <Modal
                visible={authVisible}
                onCancel={() => setAuthVisible(false)}  
                footer={null}  
            >
                <AuthForm onLoginSuccess={handleLoginSuccess} />  
            </Modal>
        </div>
    );
};

export default ToDoList;
