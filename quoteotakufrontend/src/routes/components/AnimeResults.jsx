import React from "react";
import AnimeResult from "./AnimeResult";

const AnimeResults = ({ searchHits }) => {
    const [isModelOpen, setModelOpen] = React.useState(false);
    const [maxHitsToLoad, setMaxHitsToLoad] = React.useState(Math.max(Math.floor(searchHits.length / 2), 1))
    const [activeHit, setActiveHit] = React.useState(0);


    return (
        <React.Fragment>
            {/* Model Backdrop */}
            <div className={`${!isModelOpen && 'hidden'} z-10 fixed left-0 top-0 h-screen w-screen bg-black opacity-20`}>
            </div>
            {/* Anime Results */}
            <div className="relative self-center justify-center max-w-screen-md min-w-90 flex gap-2 bg-white rounded-lg my-4 mx-2">
                {/* Previous Hit Button */}
                <div className="items-stretch flex items-center hover:bg-gray-200 px-1 rounded-l-lg group" onClick={() => setActiveHit(Math.max(0, activeHit - 1))}>
                    <button disabled={activeHit == 0}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} className="stroke-fuchsia-600 group-hover:stroke-fuchsia-700 size-8">
                            <path d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                </div>
                {/* Anime Search Hit */}
                <AnimeResult searchHit={searchHits[activeHit]} activeHit={activeHit} searchHitsCount={searchHits.length}></AnimeResult>
                {/* Next Hit Button */}
                <div className="items-stretch flex items-center hover:bg-gray-200 px-1 rounded-r-lg group" onClick={() => setActiveHit(Math.min(searchHits.length - 1, activeHit + 1))}>
                    <button disabled={activeHit == searchHits.length - 1}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} className="stroke-fuchsia-600 group-hover:stroke-fuchsia-700 size-8">
                            <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
                {/* <button className="text-white" onClick={() => setModelOpen(!isModelOpen)}>Wow</button> */}
            </div>
        </React.Fragment>
    );
}

export default AnimeResults;
