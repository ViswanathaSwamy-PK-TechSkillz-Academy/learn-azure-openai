'use client';

import React, { useState } from "react";

const ListItems = ({ numbers }: { numbers: number[] }) => {

    const newItemValue = 1;

    // React State
    const [items, setItems] = useState<number[]>(numbers);

    const addNewItem = (newItemVaule: number) => {
        const updatedItems = [...items, items.length + newItemVaule];

        setItems(updatedItems);
    };

    return (
        // <!-- React Fragment -->
        <>
            <button onClick={() => addNewItem(newItemValue)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded">Add New Item</button>
            <ul className="flex flex-col items-center text-blue-800 justify-center space-y-4">
                {
                    items.map((id, index) => {
                        return <li key={index} className="text-2xl">Item {id}</li>
                    })
                }
            </ul>
        </>
    )
};

export default ListItems;
