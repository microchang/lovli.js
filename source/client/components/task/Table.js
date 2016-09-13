import React from 'react';
import { subscribe } from 'horizon-react';
import Line from './Line.js';


const Table = ()=>{
  return  <Line />
}

export default subscribe()(Table);