import React from "react";


const PageTitle = ({ title, }: { title: string }) => {
    return (
        <>
            <h1 className='text-xl font-bold p-5 uppercase text-blue-700'>
                {title}
            </h1>

            <hr></hr>
        </>
    )
};

export default PageTitle;