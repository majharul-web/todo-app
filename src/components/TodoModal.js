import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { addTodo, updateTodo } from "../features/todo/todoSlice";

const TodoModal = ({ todo, type, handleClose, show }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    if (type === "add") {
      dispatch(
        addTodo({
          id: uuid(),
          title: data.todoTitle,
          description: data.todoDescription,
        })
      );
      reset();
      handleClose();
      toast.success("Task Added Successfully");
    } else {
      dispatch(
        updateTodo({
          ...todo,
          title: data.todoTitle,
          description: data.todoDescription,
        })
      );
      reset();
      handleClose();
      toast.success("Task Updated Successfully");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='my-1'>
              <label htmlFor=''>Todo Description:</label>
              <input
                type='text'
                defaultValue={todo?.title || ""}
                className='form-control'
                {...register("todoTitle", { required: true })}
              />
              {errors.todoTitle?.type === "required" && (
                <p className='text-danger' role='alert'>
                  Title name is required
                </p>
              )}
            </div>
            <div className='my-1'>
              <label htmlFor=''>Todo Description:</label>
              <input
                type='text'
                defaultValue={todo?.description || ""}
                className='form-control'
                {...register("todoDescription")}
              />
            </div>

            <div className='mt-3 text-end'>
              <input className='btn btn-primary' type='submit' />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TodoModal;
