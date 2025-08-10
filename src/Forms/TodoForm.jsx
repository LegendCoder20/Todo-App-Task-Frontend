import React from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";

function TodoForm({mode, formData, setFormData, onSubmit}) {
  console.log(formData);

  return (
    <>
      <div class="form-container">
        <h1 className="text-center font-black font-sans text-2xl">
          {mode === "createTodo" ? "Create Todo" : "Update Todo"}
        </h1>

        <br />
        <br />
        <form onSubmit={onSubmit} className="max-w-sm mx-auto">
          <InputBox
            labelName="Title"
            type="text"
            name="title"
            placeholder="Enter Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          ></InputBox>
          <InputBox
            labelName="Description"
            type="text"
            name="description"
            placeholder="Enter Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({...formData, description: e.target.value})
            }
          ></InputBox>
          <br />
          <br />
          <Button type="submit">
            {mode === "createTodo" ? "Create Todo" : "Update Todo"}
          </Button>
        </form>
      </div>
    </>
  );
}

export default TodoForm;
