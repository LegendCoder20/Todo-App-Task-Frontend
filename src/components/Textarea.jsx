import React from "react";

function Textarea({labelName, type, name, placeholder, value, onChange}) {
  return (
    <>
      <div>
        <label for={name} class="block  text-sm font-medium text-gray-900">
          {labelName}
        </label>
        <textarea
          type={type}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  mb-4"
          name={name}
          value={value}
          placeholder={placeholder}
          autoComplete="on"
          onChange={onChange}
          required
        />
      </div>
    </>
  );
}

export default Textarea;
