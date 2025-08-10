import React from "react";
import InputBox from "../components/InputBox";
import Textarea from "../components/Textarea";
import Button from "../components/Button";

function TodoForm({mode, formData, setFormData, onSubmit}) {
  console.log(formData);

  return (
    <>
      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center ">
        {mode === "createTodo" ? "Create Todo" : "Update Todo"}
      </h1>

      <form onSubmit={onSubmit} className="max-w-sm mx-auto">
        <InputBox
          labelName="Title"
          type="text"
          name="title"
          placeholder="Enter Title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
        ></InputBox>
        <Textarea
          labelName="Description"
          type="text"
          name="description"
          placeholder="Enter Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({...formData, description: e.target.value})
          }
        ></Textarea>
        <br />
        <div class="text-center">
          <Button
            type="submit"
            color={mode === "createTodo" ? "green" : "yellow"}
          >
            {mode === "createTodo" ? "Create Todo" : "Update Todo"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default TodoForm;
