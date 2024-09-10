import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from '../app/todoSlice';
import del from '../assets/icons/delete.svg';
import check from '../assets/icons/check.svg';
import '../App.css';

const TodoList = () => {
  const [text, setText] = useState('');
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim().length > 0) {
      dispatch(addTodo(text));
      setText('');
    }
  };


  const activeTasks = todos.filter(todo => !todo.completed);
  const completedTasks = todos.filter(todo => todo.completed);

  return (
    <div className="flex flex-col items-center bg-[#2f74c0] min-h-[100vh] p-[20px] w-[100%]">
      <h1 className='uppercase text-[40px] text-[#fff] mb-[20px]'>Task<span className='text-black'>ify</span></h1>
      <div className="mb-4 items-center flex w-[100%] justify-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a task"
          className="border p-2 mr-2 w-[1250px] rounded-[50px] py-[20px] px-[30px]"
        />
        <button onClick={handleAddTodo} className="bg-blue-500 text-white rounded-[50px] w-[70px] h-[70px] ">
          Go
        </button>
      </div>
      <div className='main__container space-x-[5px]'>

        <div className='w-[37%] bg-[#32c3cd] p-[20px] rounded-[5px]'>
          <span className='task__block'>Active Task</span>
          <div className="w-[100%]">
            <ul className="list-none p-0">
              {activeTasks.map((todo) => (
                <li key={todo.id} className="flex items-center mb-2">
                  <span
                    className='flex-grow p-[20px] bg-white rounded-[5px]'
                    onClick={() => dispatch(toggleTodo(todo.id))}
                  >
                    {todo.text}
                  </span>
                  <button onClick={() => dispatch(deleteTodo(todo.id))} className="ml-2">
                    <img src={del} alt="icon" className='w-[30px]' />
                  </button>
                  <button onClick={() => dispatch(toggleTodo(todo.id))} className="ml-2">
                    <img src={check} alt="icon" className='w-[35px]' />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>


        <div className='w-[37%] bg-[#eb6750] p-[20px] rounded-[5px]'>
          <span className='task__block'>Completed Task</span>
          <div className="w-[100%]">
            <ul className="list-none p-0">
              {completedTasks.map((todo) => (
                <li key={todo.id} className="flex items-center mb-2">
                  <span
                    className='flex-grow p-[20px] bg-white rounded-[5px] line-through'
                  >
                    {todo.text}
                  </span>
                  <button onClick={() => dispatch(deleteTodo(todo.id))} className="ml-2">
                    <img src={del} alt="icon" className='w-[30px]' />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
