import React from 'react';

const TodoApp = ({ task, tasks, inputTask, addTask }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Please Input"
                onChange={(e) => inputTask(e.target.value)}
            />
            <input
                type="button"
                value="add"
                onClick={ () => addTask(task) }
            />
            <ul>
                {tasks.map((item, i) => {
                    return <li key={i}>{item}</li>;
                })}
            </ul>
        </div>
    );
}

export default TodoApp;