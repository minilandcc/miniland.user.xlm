
import React, { useState } from "react";

const DropdownFormat = ({isOpen, children }) => {

  return (
    <>
      <div className="d-md-none">
        <div className="">

            {/* onClick={() => setIsOpen(!isOpen)} */}
          {isOpen && (
            <div className="">
              <div className=" rounded">{children}</div>
            </div>
          )}
        </div>
      </div>

      <div className="d-none d-md-block">{children}</div>
    </>
  );
};

export default DropdownFormat;
