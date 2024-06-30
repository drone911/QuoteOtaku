import React from 'react';

export default function ReverseSearch() {
    return (
        <div className='grid grid-rows-10 h-auto' style={{ height: "88%" }}>
            <div id="chat" className='row-span-8'>

            </div>
            <div id="search" className="row-span-2 flex justify-center items-center">
                <div className="bg-white rounded-full p-2">
                </div>
                <input type="search" placeholder="Quote" className='m-4 color-white rounded-full w-8/12 h-5/12'>
                    
                </input>
            </div>
        </div>
    );
};