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
            <div className="relative self-center justify-center max-w-screen-md w-screen flex text-white gap-4">
                {/* Previous Hit Button */}
                <div className="items-stretch flex items-center px-2">
                    <button disabled={activeHit == 0} onClick={() => setActiveHit(Math.max(0, activeHit - 1))}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                </div>
                {/* Anime Search Hit */}
                <AnimeResult searchHit={searchHits[activeHit]} activeHit={activeHit}></AnimeResult>
                {/* Next Hit Button */}
                <div className="items-stretch flex items-center  px-2">
                    <button disabled={activeHit == searchHits.length - 1} onClick={() => setActiveHit(Math.min(searchHits.length - 1, activeHit + 1))}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
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
