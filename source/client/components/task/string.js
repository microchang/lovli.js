import React from 'react';
import { subscribe } from 'horizon-react';
import { createDoc } from 'horizon-react/lib/utils';



const AddTodoButton = (props) => {
  const todoHandle = props.horizon('tasks');
  const addTodo = (t) => todoHandle.store({
      name:'dd'
  });

  return (
    <div>
      <input
        id="task-text"
        className={styles.input}
        type="text"
        placeholder="your name"
        onKeyPress={function(e) { if (e.key === 'Enter') { addTodo(e.target.value); e.target.value = ''; } }}
      />
      <div
        className={styles.button}
        onClick={() => { addTodo(document.getElementById('todo-text').value); document.getElementById('todo-text').value = ''; }}
      >
      + Add todo
      </div>
    </div>
  );
};

export default subscribe()(AddTodoButton);