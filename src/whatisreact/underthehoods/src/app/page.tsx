'use client';

import { useState } from "react";

const Home = () => {

  const intArray = [1, 2];

  // React State
  const [ints, setInts] = useState<number[]>(intArray);

  function ListItems({ ints, addValueFunc }: { ints: number[], addValueFunc: (incrementVaule: number) => void }) {

    const incrementVaule = 2;

    return (
      // <!-- React Fragment -->
      <>
        <button onClick={() => addValueFunc(incrementVaule)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add New Item</button>
        {
          ints.map((id, index) => {
            return <li key={index} className="text-2xl">Item {id}</li>
          })
        }
      </>
    )
  }

  const addValue = (incrementVaule: number) => {
    const newInts = [...ints, ints.length + incrementVaule];

    setInts(newInts);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello from ReactJS and NextJS.</h1>
      <ul className="flex flex-col items-center text-blue-800 justify-center space-y-4">
        <ListItems ints={ints} addValueFunc={addValue} />
      </ul>
    </main>
  )
};

export default Home;
