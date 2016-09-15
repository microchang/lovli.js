import React, { Component } from 'react';
import { subscribe } from 'horizon-react';
import Line from './Line.js';
// import  TodoItem from '../todos/TodoItem';
const mapDataToProps = {
  tasks: (hz, props) => hz('tasks')
};

class Table extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let {tasks, horizon} = this.props;
    
    //bug here
    tasks.forEach((task,id) => {
      if (task.name && !task.id) {
        console.log(id);
      }
    })
    
    while (tasks.length < 4) {
      tasks.push({});
    }
   
    return <div>
      {
        tasks.map((task, key) => {
          return <Line
            key={key}  
            task = {task}
            />
        })
      }
    </div>
  }
}


export default subscribe({
  mapDataToProps
})(Table);
