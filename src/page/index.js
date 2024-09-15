import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  attemptsFn,
  wclickWorkFunction,
  wordFunction,
} from "../redux/slices/counterSlice";
import axios from "axios";

const Alphabet = () => {
  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  const [loding, setloding] = useState(false);
  const word = useSelector((state) => state.alphabetTask.word);
  const clickWork = useSelector((state) => state.alphabetTask.clickWork);
  const attempts = useSelector((state) => state.alphabetTask.attempts);

  const dispatch = useDispatch();
  const countRemainingLetters = (str, clickWork) => {
    return str.split("").filter((char) => !clickWork.includes(char)).length;
  };

  const handleLetterClick = (letter) => {
    const newClickWork = clickWork + letter;
    const remainingLetters = countRemainingLetters(word, newClickWork);
    dispatch(
      attemptsFn([
        ...attempts,
        {
          attempt: attempts.length + 1,
          remainingLetters,
          character: newClickWork,
        },
      ])
    );
    dispatch(wclickWorkFunction(newClickWork));
  };
  async function getRandomString() {
    setloding(true);
    try {
      const res = await axios.get(
        "https://random-word-api.herokuapp.com/word?length=7"
      );
      dispatch(wordFunction(res?.data?.[0]?.toUpperCase()));
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  }
  useEffect(() => {
    getRandomString();
  }, []);
  if (loding) return <div className="loader"></div>;
  return (
    <div className="flex">
      <div className="!flex !flex-col !justify-center">
        <div className="flex gap-2 w-full justify-center flex-wrap mb-6">
          {word
            ?.trim()
            ?.split("")
            .filter((char) => char)
            .map((i) => {
              return (
                <p
                  key={i}
                  className="!bg-[#fff2cd] !text-black rounded-md px-4 py-2 h-[30px] w-[20px] 
            flex justify-center items-center
            "
                >
                  <span
                    className={`${
                      !clickWork?.split("")?.includes(i) && "hidden"
                    }`}
                  >
                    {i}
                  </span>
                </p>
              );
            })}
        </div>
        <div className="grid grid-cols-9 place-items-center  gap-3 mb-3">
          {letters.map((letter) => (
            <span
              key={letter}
              className={` rounded-md !h-[32px] w-[32px]  !text-center
              ${
                clickWork?.split("")?.includes(letter)
                  ? "!bg-[#7f7f7f]"
                  : "!bg-[#e9ecf5] !cursor-pointer"
              }
              `}
              onClick={() =>
                !clickWork?.split("")?.includes(letter) &&
                !attempts?.find((i) => i.remainingLetters === 0) &&
                handleLetterClick(letter)
              }
            >
              {letter}
            </span>
          ))}
        </div>
        {attempts?.find((i) => i.remainingLetters === 0) && (
          <div className="flex gap-2 w-full justify-center flex-wrap mb-2 !bg-green-400 py-2 !bg-opacity-20">
            Congrats! You guessed <span className="!font-bold">{word}</span> in{" "}
            <span className="!font-bold">{attempts?.find((i) => i.remainingLetters === 0)?.attempt}</span> attempts.
          </div>
        )}
        <div
          className="flex cursor-pointer gap-2 w-full justify-center flex-wrap mb-6 !bg-green-400 py-2 !bg-opacity-20"
          onClick={() => {
            dispatch(wordFunction(""));
            dispatch(wclickWorkFunction(""));
            dispatch(attemptsFn([]));
            getRandomString();
          }}
        >
          REFERESH
        </div>
      </div>
      <div className="!flex">
        <div className="!flex flex-col !h-[500px] !overflow-scroll no-scrollbar px-2">
          <div className="!grid grid-cols-2 border border-white text-center !text-sm !bg-[#4173c3] text-white !font-bold sticky top-0 z-10">
            <p className="py-2 border-r border-white">Attempts</p>
            <p className="py-2 px-2">Remaining Char</p>
          </div>

          <div className="!grid grid-cols-2 border border-white text-center !text-sm !bg-[#e9ecf5] !font-bold">
            <p
              className="py-2 border-r border-white cursor-pointer"
              onClick={() => {
                attempts?.find((i) => i.remainingLetters === 0) &&
                  dispatch(wclickWorkFunction(""));
              }}
            >
              0
            </p>
            <p className="py-2">{word.length}</p>
          </div>

          {attempts.map((attempt, index) => (
            <div
              key={index}
              className="!grid grid-cols-2 border border-white text-center !text-sm !bg-[#e9ecf5] !font-bold"
            >
              <p
                className="py-2 border-r border-white cursor-pointer"
                onClick={() => {
                  attempts?.find((i) => i.remainingLetters === 0) &&
                    dispatch(wclickWorkFunction(attempt.character));
                }}
              >
                {attempt.attempt}
              </p>
              <p className="py-2">{attempt.remainingLetters}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alphabet;
