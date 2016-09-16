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
    //bug here? 
    //取出来的tasksList，为何有不完整的选项混入？
    
    while (tasks.length < 3) {
      tasks.push({});
    }
    tasks.push({});
   
    return <div>
      {
        tasks.map((task, key) => {
          return <Line
            key={key}  
            task = {task}
            horizon = {horizon}
            />
        })
      }
    </div>
  }
}


export default subscribe({
  mapDataToProps
})(Table);
