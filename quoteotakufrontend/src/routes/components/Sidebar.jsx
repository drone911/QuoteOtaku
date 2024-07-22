import React from "react";

import { useSelector } from "react-redux";
import { selectChats } from "../../reducers/chatsFileSlice";

export default function Sidebar({ searches, activeSearch, setActiveSearch }) {
    console.log(searches)
    return (
        <React.Fragment>
            <div id="sidebar-header" className="flex py-6 justify-center align-center">
                <div className="text-7xl font-light text-gray-300">
                    History
                </div>
            </div>
            <div className="py-4 flex items-center gap-2 flex-col text-3xl font-semibold capitalize">
                {searches.toReversed().map((element, index) => {
                    return (<div key={index} className={`${element.id == activeSearch.id ? 'text-white bg-gray-400 rounded-md ' : 'text-gray-500'}`}>{element.title}</div>)
                })}
            </div>
        </React.Fragment>
    );
};