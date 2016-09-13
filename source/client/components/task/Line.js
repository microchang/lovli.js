import React, { Component }from 'react';
import { subscribe } from 'horizon-react';
import { createDoc } from 'horizon-react/lib/utils';
import 'antd/dist/antd.css'; //todo need transform to babel plugins
import { Row, Col, Input, Select, message, DatePicker, Radio} from 'antd';


class Line extends Component {
  constructor(props) {
    super(props);
    this.changeTask = this.changeTask.bind(this);
    this.state = {
      task: {}
    };
  }

  componentWillUnmount() {
    this.setState({
      task: this.props.task || {}
    })
  }

  changeTask(e) {
    let type = e.target.type === 'radio' ? 'gender' : e.target.dataset.type;
    let {task} = this.state;
    task[type] = e.target.value;
    this.setState({
      task: task
    });
  }

  changeTaskByValue(value) {
    let {task} = this.state;
    task.occupation = value;
    this.setState({
      task: task
    });
  }

  changeTaskTags(newTag) {
    let {task} = this.state;
    task.tags = task.tags || [];
     task.tags.push(newTag);
    this.setState({
      task: task
    });
  }

  render() {
    const Option = Select.Option;
    const RadioGroup = Radio.Group;
    const {task} = this.state;
   
    let children = task.tags&&task.tags.length ? task.tags.forEach((value, key) => {
      return <Option key={key} value={value}>value</Option>
    })
      :
      [];
 
    return (
      <div className=''>
        <Row gutter={16}>
          <Col span={6}  className="gutter-row">
            <Input  placeholder='姓名' value= {task.name}  data-type='name' onChange={this.changeTask}/>
          </Col>
          <Col span={6} className="gutter-row">
            <Select value={task.occupation} style={{ width: '100%' }}  data-type='occupation' onSelect={value => { this.changeTaskByValue(value) } } >
              <Option value="singer">歌手</Option>
              <Option value="drummer">鼓手</Option>
              <Option value="dancer">舞者</Option>
              <Option value="accountant">会计</Option>
            </Select>
          </Col>
          <Col span={6} className="gutter-row">
            <Select tags
              value={task.tags}
              style={{ width: '100%' }}
              searchPlaceholder="标签模式"
              data-type='tags'
              onSelect={value => { this.changeTaskTags(value) } }
              >
              {children}
            </Select>
          </Col>
          <Col span={6} className="gutter-row" >
            <RadioGroup
              value={task.gender}
              style={{ width: '100%' }}
              onChange={this.changeTask}>
              <Radio key="male" value={'male'}>男</Radio>
              <Radio key="female" value={'female'}>女</Radio>
            </RadioGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

// const Line = ({horizon, task}) => {
//   const Option = Select.Option;
//   const RadioGroup = Radio.Group;
//   const taskHandle = horizon('task');
//   //   const addTodo = (t) => todoHandle.store({
//   //       name:'dd'
//   //   });

//   const updateTask = (value, type) => {
//     task[type] = value;
//     taskHandle.store(task);
//   }
//   let children = [];
//   return (
//     <div>
//       <input  />
//       <Select defaultValue="accountant" style={{ width: 120 }} >
//         <Option value="singer">歌手</Option>
//         <Option value="drummer">鼓手</Option>
//         <Option value="dancer">舞者</Option>
//         <Option value="accountant">会计</Option>
//       </Select>

//       <Select tags
//         style={{ width: 120 }}
//         searchPlaceholder="标签模式"
//         >
//         {children}
//       </Select>

//       <RadioGroup  value={'male'}>
//         <Radio key="male" value={'male'}>男</Radio>
//         <Radio key="female" value={'female'}>女</Radio>
//       </RadioGroup>
//     </div>

//   );
// };

export default subscribe()(Line);