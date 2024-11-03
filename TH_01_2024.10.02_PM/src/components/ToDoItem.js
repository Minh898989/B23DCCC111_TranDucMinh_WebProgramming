import './style.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ToDoItem = ({ id, title, dueDate, isDone, onDelete, onToggle, onEdit }) => {
    return (
        <div className={`ToDoItem ${isDone ? 'Done' : 'Todo'}`}>
            <input type="checkbox" checked={isDone} onChange={() => onToggle(id)} />
            <div className="ItemContent">
                <p className="Title">{title}</p>
                <p className="DueDate">{dueDate}</p>
            </div>
            <div className="Action">
                <EditOutlined onClick={() => onEdit(id)} />
                <DeleteOutlined onClick={() => onDelete(id)} />
            </div>
        </div>
    );
};

export default ToDoItem;
