import Button from '../components/Button';
//import {useState} from 'react';
import {useReducer} from 'react';
import Panel from '../components/Panel';
import {produce} from 'immer';

const INCREMENT='increment-count';
const DECREMENT='decrement_count';
const SET_VALUE_TO_ADD='change_value_to_add';
const ADD_VALUE_TO_COUNT='input_value_to_add_to_count';


const reducer=(state,action)=>{

  switch (action.type){
    case INCREMENT:
      state.count=state.count+1;
      return;
    case DECREMENT:  
      state.count=state.count-1;
      return;
  case SET_VALUE_TO_ADD:
    
      state.valueToAdd=action.payload;
      return;
    
    case ADD_VALUE_TO_COUNT:
    
        state.count=state.count+state.valueToAdd;
        state.valueToAdd=0;      
          return;
  default: return state
  }
}
  /*
  if(action.type===INCREMENT){
    return{...state,
    count:state.count+1,
    }}
    if(action.type===DECREMENT){
      return{
        ...state,
        count:state.count-1,
      }
    }
    if(action.type===SET_VALUE_TO_ADD){
return{
...state,
valueToAdd:action.payload
}}

return state;
}; */

function CounterPage({ initialCount }) {
 //const [count,setCount]=useState(initialCount) 
 //const [valueToAdd,setValueToAdd] =useState(0)

 const[state,dispatch]=useReducer(produce(reducer),{count:initialCount,valueToAdd:0})

 const handleChange=(e)=>{
  const value=parseInt(e.target.value)||0;
dispatch({
  type:SET_VALUE_TO_ADD,
  payload:value,
});
 };

 const handleSubmit=(e)=>{
  e.preventDefault();
      //setCount(prevCount=>(+prevCount + +value));
      //console.log(value);
      //setValueInput(0)

      dispatch({
        type:ADD_VALUE_TO_COUNT,
        
      });
 }

console.log(state);
  return (
    <Panel className="m-3" >
      <h1 className="text-lg">Count is {state.count}</h1>
      <div className="flex flex-row">
      <Button onClick={()=>{        
        dispatch(
          {type:INCREMENT}
        );
        }}>Increment</Button>
      <Button onClick={()=>{
        dispatch({type:DECREMENT})
        }}>Decrement</Button>
      </div>

      <form onSubmit={handleSubmit}>
    <label>Add a lot!</label>
    <input value={state.valueToAdd||""} onChange={handleChange} type="number" className="p-1 m-3 bg-gray-50 border border-gray-300"/>
<button type='submit'>Add it!</button>
      </form>
      </Panel>
    
  );
}

export default CounterPage;
