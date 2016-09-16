import React, { Component }from 'react';
import { subscribe } from 'horizon-react';
import 'antd/dist/antd.css'; //todo: need transform to babel plugins
import { Row, Col, Input, Select, message, DatePicker, Radio} from 'antd';
import { createDoc } from 'horizon-react/lib/utils';


class Line extends Component {
  constructor(props) {
    super(props);
    this.changeTask = this.changeTask.bind(this);
    this.changeTaskByValue = this.changeTaskByValue.bind(this);
    this.changeTaskTags = this.changeTaskTags.bind(this);
    this.saveOrUpdateTask = this.saveOrUpdateTask.bind(this);

    this.state = {
      task: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      task: nextProps.task || {}
    })
  }


  saveOrUpdateTask() {
    const {horizon} = this.props;
    const {task} = this.state;
    if (task.name + task.occupation + task.tags + task.gender) {

      console.log(task);
      const collection = horizon('tasks');
      createDoc(collection, task);
    }
  }

  changeTask(e) {
    let type = e.target.type === 'radio' ? 'gender' : e.target.dataset.type;
    let {task} = this.state;
    task[type] = e.target.value;
    this.setState({
      task: task
    }, this.saveOrUpdateTask);
  }

  changeTaskByValue(value) {
    let {task} = this.state;
    task.occupation = value;
    this.setState({
      task: task
    }, this.saveOrUpdateTask);
  }

  changeTaskTags(newTag) {
    let {task} = this.state;
    task.tags = task.tags || [];
    task.tags.push(newTag);
    this.setState({
      task: task
    }, this.saveOrUpdateTask);
  }

  //https://github.com/flipace/horizon-react/blob/91b06795e3d844287afdf72bc19d55d69f3a0843/src/components/subscribe.js#L60
  //否则报waring  
  componentWillUnmount() {
    // make sure to dispose all subscriptions
    this.unsubscribe();
  }

  render() {
    const Option = Select.Option;
    const RadioGroup = Radio.Group;
    const {task} = this.state;
    let children = task.tags && task.tags.length ? task.tags.forEach((value, key) => {
      return <Option key={key} value={value}>value</Option>
    })
      :
      [];


    return (
      <div className=''>
        <Row gutter={16}>
          <Col span={6}  className="gutter-row">
            <Input  placeholder='姓名' value= {task.name}  data-type='name' onChange={this.changeTask} />
          </Col>
          <Col span={6} className="gutter-row">
            <Select value={task.occupation} style={{ width: '100%' }}  data-type='occupation' onSelect={this.changeTaskByValue } >
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
              onSelect={this.changeTaskTags }
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


export default (Line);
