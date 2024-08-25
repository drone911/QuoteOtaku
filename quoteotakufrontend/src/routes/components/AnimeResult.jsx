import axios from "axios";
import React from "react";

const AnimeResult = ({ searchHit, activeHit, searchHitsCount }) => {
    const [animeDetails, setAnimeDetails] = React.useState(null);
    const [isImageLoaded, setIsImageLoaded] = React.useState(false);
    React.useEffect(() => {
        axios.get(process.env.REACT_APP_API_PREFIX + "/anime", {
            params: {
                q: searchHit.animeName
            }
        }).then((getAnimeResponse) => {
            const result = getAnimeResponse.data.result;
            setAnimeDetails(result)
        }).catch((error) => {
            setAnimeDetails({})
            console.log(error)
        })
    }, [activeHit]);
    return (
        <div className="flex-grow flex flex-col justify-center items-center gap-10 my-4">
            <div className="flex justify-center items-center h-64 w-full">
                {/* Anime Pic and Name */}
                <div className={`flex relative justify-center items-center min-w-44 min-h-64 rounded-lg ${animeDetails ? 'bg-black' : 'bg-zinc-700'}`}>
                    {animeDetails &&
                        <React.Fragment>
                            <div className="text-center text-white absolute">
                                {searchHit.animeName}
                            </div>
                            {animeDetails.nodes && animeDetails.nodes.length > 0 ?
                                <img className="w-44 rounded-lg opacity-50" alt={`${searchHit.animeName} Picture`} src={animeDetails.nodes[0].main_picture.large}></img>
                                :
                                <img className="w-44 rounded-lg" alt="Not found" src=""></img>}

                        </React.Fragment>
                    }
                    {!animeDetails &&
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="size-14 animate-spin-slow stroke-fuchsia-600">
                            <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    }
                </div>
            </div>
            {/* Subtitle */}
            <div className="w-44">
                {searchHit.searchHitSubtitle.find((elem) => { return elem.isHit }).subtitle}
            </div>
            {/* Navigation Beads */}
            <div className="flex flex-row gap-1">
                {Array(searchHitsCount).fill(null).map((elem, index) => {
                    return (
                        <div className={`w-2 h-2  ${index == activeHit ? 'bg-fuchsia-500' : 'bg-black'} rounded-full`}></div>
                    )
                })}
            </div>

        </div>
    )
}

export default AnimeResult;
