import React from "react";
import loader from "../../public/Loading.png";

function Loader() {
  return (
    <>
      <div class="w-24 h-24 rounded-full overflow-hidden animate-spin">
        <img src={loader} alt="Loading..." class="w-full h-full object-cover" />
      </div>
    </>
  );
}

export default Loader;
