import React, { act } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import AnimeResults from './AnimeResults';

export default function Chat({ searches, setSearchText, searchSubmit, setNextPage, activeSearch, chatParentRef, lastPositionRef }) {
    const userSuggestions = ["Example Quote 1", "Example Quote 2", "Example Quote 3", "Example Quote 4"];
    searches = searches == undefined ? [] : searches;
    
    const handleUserSuggestionClick = (e) => {
        e.preventDefault();
        const index = e.target.getAttribute("data-index");
        setSearchText(userSuggestions[index]);
        searchSubmit({ searchText: userSuggestions[index] });
    }
    const chatBoxClassNames = "px-5 py-3 text-xl bg-zinc-700/90 font-semibold shadow-lg rounded-lg text-white";
    return (
        <React.Fragment>
            {/* Empty Chat Component */}
            {searches.length == 0 &&
                <div className='flex h-full justify-center items-center gap-8 flex-col'>
                    <div className='flex justify-center items-center p-4 rounded-lg shadow-lg'>
                        <img width="128px" className="m-4" src="logo-border512.png"></img>
                        <div className='flex flex-col justify-center items-center text-white/90 cursor-default stroke-white m-2 text-5xl font-semibold text-gray-800'>
                            <div>
                                Quote
                            </div>
                            <div>
                                Otaku
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                        {userSuggestions.map((value, index) => {
                            return (
                                <button onClick={handleUserSuggestionClick} key={index} data-index={index} className='font-white px-10 py-3 text-2xl text-gray-200 bg-gray-400/20 border-2 border-gray-400/80 rounded-lg shadow-lg'>
                                    {value}
                                </button>
                            )
                        })}
                    </div>
                </div>
            }
            {/* Filled Chat Component*/}
            {
                <div className='container mx-auto max-w-screen-lg'>
                    {
                        searches.toReversed().map((element, index) => {
                            return (
                                <div key={index} ref={index == 0 ? lastPositionRef : null} className='flex flex-col gap-2 px-8 last:pb-4' >
                                    <div className={`self-end ${chatBoxClassNames}`}>
                                        {element.searchMessage}
                                    </div>
                                    {element.searchHits.length > 0 &&
                                        <AnimeResults searchHits={element.searchHits}></AnimeResults>
                                    }
                                    {element.searchHits.length == 0 &&
                                        <div className={`self-start ${chatBoxClassNames}`}>
                                            "No Hits"
                                        </div>
                                    }
                                </div>
                            )
                        })}
                </div>}
        </React.Fragment>
    );
};