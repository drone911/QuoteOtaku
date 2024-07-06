import React from 'react';
import ReverseSearch from './ReverseSearch';

export default function Main({ openSidebar, closeSidebar, showSidebar, activeSearch }) {
    return (
        <React.Fragment>

            <div id="header" className="flex w-100 justify-between items-center" style={{height: "12%"}}>
                <button type="button" onClick={showSidebar ? closeSidebar : openSidebar} className='hover:bg-gray-600/45 focus:bg-gray-600/45 shadow-lg rounded-full m-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} className="m-2 color-[#e700ff] size-14 stroke-gray-200">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                    </svg>
                </button>
                <button className='hover:bg-gray-600/45 focus:bg-gray-600/45 shadow-lg rounded-full m-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="m-2 color-[#e700ff] size-14 stroke-gray-200">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                    </svg>
                </button>
            </div>
            <ReverseSearch activeSearch={activeSearch}></ReverseSearch>
        </React.Fragment>
    );
};