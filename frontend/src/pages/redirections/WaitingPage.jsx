import React from "react";
import MereLayout from "../../layouts/MereLayout";

function WaitingPage() {
  return (
    <>
      <MereLayout>
        <div> </div>
        <div className="flex flex-col justify-center items-center h-full text-[22px] bg-gray-200">
            Ur account is still under verification
        </div>
      </MereLayout>
    </>
  );
}

export default WaitingPage;
