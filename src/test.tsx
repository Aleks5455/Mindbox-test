import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import TodoApp from "./App";

describe("TodoApp", () => {
  it("should add a new task", () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText("Добавить задачу");
    const button = screen.getByText("Добавить");
    fireEvent.change(input, { target: { value: "Test task" } });
    fireEvent.click(button);
    expect(screen.getByText("Test task")).toBeInTheDocument();
  });

  it("should not add an empty task", () => {
    render(<TodoApp />);
    const button = screen.getByText("Добавить");
    fireEvent.click(button);
    expect(screen.queryByText("Test task")).not.toBeInTheDocument();
  });

  it("should not add a task with existing text", () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText("Добавить задачу");
    const button = screen.getByText("Добавить");
    fireEvent.change(input, { target: { value: "Test task" } });
    fireEvent.click(button);
    fireEvent.change(input, { target: { value: "Test task" } });
    fireEvent.click(button);
    expect(screen.queryByText("Test task")).not.toBeInTheDocument();
  });

  it("should toggle a task's completion status", () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText("Добавить задачу");
    const button = screen.getByText("Добавить");
    fireEvent.change(input, { target: { value: "Test task" } });
    fireEvent.click(button);
    const task = screen.getByText("Test task");
    fireEvent.click(task);
    expect(task).toHaveClass("completed");
  });

  it("should filter tasks by completion status", () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText("Добавить задачу");
    const button = screen.getByText("Добавить");
    fireEvent.change(input, { target: { value: "Test task" } });
    fireEvent.click(button);
    fireEvent.change(input, { target: { value: "Test task 2" } });
    fireEvent.click(button);
    fireEvent.click(screen.getByText("Completed"));
    expect(screen.queryByText("Test task")).not.toBeInTheDocument();
    expect(screen.getByText("Test task 2")).toBeInTheDocument();
  });
});