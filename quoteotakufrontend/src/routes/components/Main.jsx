import React from 'react';
import ReverseSearch from './ReverseSearch';
import { createChat } from '../../reducers/chatsFileSlice';
import { useDispatch } from 'react-redux';

export default function Main({ openSidebar, closeSidebar, showSidebar, activeSearch }) {
    const dispatch = useDispatch();
    const createNewSearch = () => {
        dispatch(createChat());
        window.location.reload();
    }
    const iconClassNames = "m-2 color-[#e700ff] size-10 stroke-gray-700 group-hover:stroke-fuchsia-500 group-focus-visible:stroke-fuchsia-500";
    const buttonClassNames = "hover:bg-gray-800 focus-visible:bg-gray-800 border-0 border-gray-600 border-solid bg-white shadow-2xl rounded-md m-4 group";
    return (
        <React.Fragment>
            <div id="header" className="flex w-100 justify-between items-center justify-center px-2" style={{ height: "12%" }}>
                {/* Toggle Sidebar Button */}
                <button type="button" onClick={showSidebar ? closeSidebar : openSidebar} className={buttonClassNames}>
                    {showSidebar && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} className={iconClassNames}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                    </svg>
                    }
                    {!showSidebar && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} className={iconClassNames}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                    </svg>
                    }
                </button>
                {/* New Search Button */}
                <button type="button" onClick={createNewSearch} className='text-gray-100 flex justify-center items-center text-center align-middle rounded-md bg-gray-300/35 hover:bg-gray-300/30 px-2 py-1.5'>
                    <div className='flex items-center justify-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} fill="currentColor" className="size-8 color-[#e700ff]">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                        <div className='text-2xl'>
                            New
                        </div>

                    </div>
                </button>
                {/* Help Button */}
                <button className={buttonClassNames}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} className={iconClassNames}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                    </svg>
                </button>
            </div>
            {/* Search Display & Input Component */}
            <ReverseSearch activeSearch={activeSearch}></ReverseSearch>
        </React.Fragment>
    );
};