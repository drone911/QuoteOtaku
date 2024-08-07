import React from "react";

import { useSelector } from "react-redux";
import { selectChats } from "../../reducers/chatsFileSlice";

export default function Sidebar({ searches, activeSearch, setActiveSearch }) {

    const navigateSearches = (e) => {
        const toActivate = searches.length - 1 - e.target.getAttribute("data-index");
        setActiveSearch(searches[toActivate]);
    }
    return (
        <React.Fragment>
            {/* Sidebar Header */}
            <div className="text-white font-light text-4xl text-center mt-6 px-10">
                Quote Otaku
            </div>
            {/* Search Select */}
            <div id="search-history" className="flex items-center gap-10 flex-col text-xl font-normal capitalize">
                <div className="text-xl font-bold w-full text-left pl-4 mt-10 text-fuchsia-400/80">
                    History
                </div>
                <div className="flex items-center justify-center flex-col w-full py-2">
                    {searches.toReversed().map((element, index) => {
                        return (
                            <div id="search-history" key={index} data-index={index} onClick={navigateSearches} className={` 
                            text-left cursor-pointer text-white rounded-md transition-colors flex justify-between items-center relative pl-5 pr-3 gap-3 py-2 w-10/12 group hover:bg-gray-400/25
                            ${element.id == activeSearch.id ? 'bg-gray-400/25 font-semibold' : ''}`}
                            >
                                <div id="search-history-title" className="grow max-w-64 truncate group-hover:font-semibold" data-index={index} >
                                    {element.title}
                                </div>
                                <div className={`rounded-full ${element.id == activeSearch.id ? '' : 'invisible'} group-hover:visible group-hover:bg-gray-600/45`} onClick={(event) => { event.stopPropagation(); }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 m-2">
                                        <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                                    </svg>
                                </div>
                                {element.id == activeSearch.id && <style>
                                    {`
                                #search-history[data-index="${index}"]::before {
                                    content: "";
                                    position: absolute;
                                    height: 90%;
                                    width: 3px;
                                    background-color: #e879f9;
                                    left: 0;
                                    top: 5%;
                                    border-radius: 2px
                                }
                                `}
                                </style>
                                }
                            </div>
                        )
                    })}

                </div>

            </div>
        </React.Fragment>
    );
};