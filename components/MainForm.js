import { useState } from "react";
import StakingForm from "./StakingForm";
import UnstakeForm from "./UnstakeForm";

function Main() {
  const [isStakeMode, setIsStakeMode] = useState(true);

  const handleToggle = () => {
    setIsStakeMode((prevMode) => !prevMode);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <div className="space-x-4">
            <button
              className={`bg-[#C7E3E1] text-grey-100 font-bold py-2 px-4 rounded ${
                isStakeMode ? "opacity-100" : "opacity-50"
              }`}
              onClick={handleToggle}
            >
              Stake
            </button>
            <button
              className={`bg-[#C7E3E1] text-grey-100 font-bold py-2 px-4 rounded ${
                !isStakeMode ? "opacity-100" : "opacity-50"
              }`}
              onClick={handleToggle}
            >
              Unstake
            </button>
          </div>
        </div>
      </div>
      {isStakeMode ? <StakingForm /> : <UnstakeForm />}
    </>
  );
}

export default Main;
