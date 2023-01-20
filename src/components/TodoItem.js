import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../features/todo/todoSlice";
import TodoModal from "./TodoModal";

const TodoItem = ({ todo, index }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure to Delete");
    if (proceed) {
      dispatch(deleteTodo(id));
      toast.success("Task Deleted Successfully");
    }
  };

  const handleUpdate = () => {
    setShow(true);
  };
  const handleClose = () => setShow(false);

  return (
    <>
      <tr key={todo.id}>
        <td>{index + 1}</td>
        <td>{todo.title}</td>
        <td>{todo.description}</td>
        <td>
          <div className=''>
            <button onClick={() => handleUpdate()} className='btn btn-warning '>
              Edit
            </button>
            <button onClick={() => handleDelete(todo.id)} className='btn btn-danger ms-3'>
              delete
            </button>
          </div>
        </td>
      </tr>
      {show && <TodoModal todo={todo} type={"update"} show={show} handleClose={handleClose} />}
    </>
  );
};

export default TodoItem;
