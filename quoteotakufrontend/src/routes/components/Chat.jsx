import React from 'react';

export default function Chat({ searches, setSearchText, searchSubmit }) {
    const userSuggestions = ["Example Quote 1", "Example Quote 2", "Example Quote 3", "Example Quote 4"];
    console.log("Searchuishfuin");
    console.log(searches.size);
    console.log(searches)
    const handleUserSuggestionClick = (e) => {
        e.preventDefault();
        const index = e.target.getAttribute("data-index");
        setSearchText(userSuggestions[index]);
        searchSubmit({ searchText: userSuggestions[index] });
    }
    return (
        <React.Fragment>
            {/* Empty Chat Component */}
            {searches.size === 0 &&
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
            {searches.size !== 0 &&

                Array.from(searches).map((element, index) => {
                    return (
                        <div key={index} className='flex flex-col gap-2'>
                            <div className="bg-white text-black self-end">
                                {element.searchMessage}
                            </div>
                            {element.searchHits.length > 0 &&
                                <div className="bg-white text-black self-start">
                                    element.searchHists[0].animeName
                                </div>
                            }
                            {element.searchHits.length == 0 &&
                                <div className="bg-white text-black self-start">
                                    "No Hits"
                                </div>
                            }
                        </div>
                    )
                })}
        </React.Fragment>
    );
};