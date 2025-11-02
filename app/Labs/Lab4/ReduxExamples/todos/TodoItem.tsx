import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { ListGroupItem, Button } from "react-bootstrap";

interface Todo {
  id: string;
  title: string;
}

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch();

  return (
    <ListGroupItem key={todo.id}>
      <Button
        onClick={() => dispatch(deleteTodo(todo.id))}
        id="wd-delete-todo-click"
        variant="danger"
        size="sm"
        className="me-2"
      >
        Delete
      </Button>
      <Button
        onClick={() => dispatch(setTodo(todo))}
        id="wd-set-todo-click"
        variant="warning"
        size="sm"
        className="me-2"
      >
        Edit
      </Button>
      {todo.title}
    </ListGroupItem>
  );
}
