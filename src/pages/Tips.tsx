import { useState } from "react";

const Tips = () => {
  const [step, setStep] = useState(0);
  const [tip, setTip] = useState(0);

  const handleTip = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tipValue = Number(e.target.value);
    console.log("tip", tipValue);
    setTip(tipValue);
  };

  const handleNext = () => {
    setStep(1);
  };

  if (step === 0) {
    return (
      <div className="mt-2">
        <div className="flex flex-col items-center justify-center">
          <div className="text-xl font-bold">Input Amount</div>
          <input
            onChange={(e) => handleTip(e)}
            placeholder="amount"
            className="border text-3xl border-black w-1/2 h-20 text-center rounded-md"
            type="number"
            value={Number(tip).toString()}
            min="0  "
          ></input>
          <div
            onClick={() => handleNext()}
            className="mt-2 py-4 cursor-pointer text-center bg-blue-300 w-1/3"
          >
            Enter
          </div>
        </div>
      </div>
    );
  } else if (step === 1) {
    return (
      <div className="mt-2">
        <div className="flex flex-col items-center justify-center">
          <div className="text-xl font-bold">Choose a tip</div>
          <div className="flex w-full flex-col items-center justify-center">
            <div className="grid gap-2 grid-cols-2 w-full items-center justify-center">
              <div className="flex col-span-1 text-xl h-20  bg-blue-300 justify-center items-center text-center font-bold w-full">
                12%
              </div>
              <div className="flex col-span-1 text-xl h-20  bg-blue-300 justify-center items-center text-center font-bold">
                15%
              </div>
              <div className="flex col-span-1 text-xl h-20  bg-blue-300 justify-center items-center text-center font-bold">
                20%
              </div>
              <div className="flex col-span-1 text-xl h-20  bg-blue-300 justify-center items-center text-center font-bold">
                25%
              </div>
            </div>
            <div className="flex flex-col items-center w-full gap-2 mt-2 justify-center">
              <div className="cursor-pointer text-xl bg-blue-300 w-full text-center items-center py-2">
                Custom
              </div>
              <div className="cursor-pointer text-xl bg-blue-300 w-full text-center items-center py-2">
                Skip
              </div>
              <div
                onClick={() => setStep(0)}
                className=" cursor-pointer text-xl bg-blue-300 w-full text-center items-center py-2"
              >
                Back
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="mt-2"></div>;
  }
};

export default Tips;
