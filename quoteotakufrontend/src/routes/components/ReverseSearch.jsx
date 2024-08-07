import React, { act } from 'react';
import autosize from 'autosize';
import Chat from './Chat';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { updateTitle } from '../../reducers/chatsFileSlice';
import autoAnimate from '@formkit/auto-animate'

import exampleGetChatResponse from './exampleResponse/exampleGetChatResponse';

export default function ReverseSearch({ activeSearch }) {
    const [isQuoteSearchFocused, setIsQuoteSearchFocused] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');
    const [searches, setSearches] = React.useState(new Map());
    const pageOffsetEndMap = new Map();
    pageOffsetEndMap.set(activeSearch.id, 0);
    const [pageOffsetEnd, setpageOffsetEnd] = React.useState(pageOffsetEndMap);
    const [loading, setLoading] = React.useState(false);
    const [infiniteLoading, setInfiniteLoading] = React.useState(false);
    const chatParentRef = React.useRef(null);
    const dispatch = useDispatch();
    const infiniteObserver = React.useRef();

    // Effect to autosize input search and get current chat content
    React.useEffect(() => {
        const search = document.getElementById('search');
        autosize(search);
    }, []);


    const lastPositionRef = React.useCallback((node) => {
        if (infiniteLoading) {
            return;
        }
        if (infiniteObserver.current) {
            infiniteObserver.current.disconnect();
        }

        infiniteObserver.current = new IntersectionObserver((entries) => {
            console.log(entries);
            if (entries[0].isIntersecting) {
                setNextPage();
            }
        })
        if (node) {
            infiniteObserver.current.observe(node);
        }
    }, [infiniteLoading])
    React.useEffect(() => {
        if (!pageOffsetEnd.has(activeSearch.id)) {
            pageOffsetEnd.set(activeSearch.id, 0);
            console.log(activeSearch.id);
            setpageOffsetEnd(pageOffsetEnd);
        }
    }, [activeSearch]);

    const setNextPage = () => {
        pageOffsetEnd.set(activeSearch.id, pageOffsetEnd.get(activeSearch.id) + 1);
        setpageOffsetEnd(pageOffsetEnd);
    };

    React.useEffect(() => {

        const activePageOffsetEnd = pageOffsetEnd.get(activeSearch.id);
        if (activePageOffsetEnd == undefined) {
            return;
        }
        if (!activePageOffsetEnd != 0) {
            setInfiniteLoading(true);
        }
        axios.get(process.env.REACT_APP_API_PREFIX + "/chat/" + activeSearch.id, {
            params: {
                pageSize: process.env.REACT_APP_CHAT_PAGE_SIZE,
                pageOffsetEnd: activePageOffsetEnd
            }
        }).then((getChatResponse) => {
            if (getChatResponse.data.result != null) {
                if (searches.has(activeSearch.id)) {
                    searches.set(activeSearch.id, [...searches.get(activeSearch.id), ...getChatResponse.data.result.chatLines]);
                } else {
                    searches.set(activeSearch.id, getChatResponse.data.result.chatLines);
                }
            }
            console.log("Before Call");

            console.log(searches);

            setSearches(new Map([...searches]));

        }).catch((error) => {
            console.log(error);
        });
        if (activePageOffsetEnd != 0) {
            setInfiniteLoading(false);
        }

    }, [pageOffsetEnd.get(activeSearch.id)])

    // Effect to animate chat
    React.useEffect(() => {
        if (chatParentRef.current) {
            autoAnimate(chatParentRef.current);
        }
    }, [chatParentRef])

    const searchSubmit = async (e) => {
        let inputText = searchText;

        if (e.searchText && e.searchText != '') {
            inputText = e.searchText;
        }
        if (inputText == '') {
            return;
        }
        if (activeSearch.title === "New Search") {
            dispatch(updateTitle({
                "id": activeSearch.id,
                "title": inputText
            }))
        }
        setSearchText('');

        setLoading(true);
        try {
            const postChatResponse = await axios.post(process.env.REACT_APP_API_PREFIX + "/chat/" + activeSearch.id, {
                "query": inputText
            });
            if (!searches.has(activeSearch.id)) {
                searches.set(activeSearch.id, [postChatResponse.data.result]);
            } else {
                searches.get(activeSearch.id).push(postChatResponse.data.result);
            }
            setSearches(searches);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            searchSubmit(e);
        }
    }

    return (
        <div className='flex flex-col h-auto' style={{ height: "88%" }}>
            {/* Search Component */}
            <style>
                {/* {`
                    #chat:after {
                        content: "";
                        position: sticky;
                        display: block;
                        opacity: 1;
                        height: 200px;
                        width: 100%;
                        bottom: 0;
                        left: 0;
                        --mask: linear-gradient(to bottom, rgba(255,255,255, 1) 0, 
                            rgba(255,255,255, 1) 45%, rgba(255,255,255, 255) 95%,
                            rgba(255,255,255, 0) 0) 100% 50% / 100% 100% repeat-x;
                        mask: var(--mask);
                        -webkit-mask: var(--mask); 
                        z-index: 5;
                    }
            `} */}
            </style>
            <div id="chat" className='grow overflow-y-scroll relative' ref={chatParentRef}>
                <Chat searches={searches.get(activeSearch.id)} setSearchText={setSearchText} searchSubmit={searchSubmit} setNextPage={setNextPage} activeSearch={activeSearch} chatParentRef={chatParentRef} lastPositionRef={lastPositionRef}></Chat>
            </div>
            {/* Search Bar */}
            <div className="flex justify-center items-center mb-4">
                <div className="m-4 flex items-end flex-nowrap bg-white rounded-[40px] min-h-max w-10/12 max-w-screen-lg min-h-14 px-3 py-2 lg:mb-8">
                    {/* Filter Input */}
                    <div className="rounded-full hover:bg-gray-600/45">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 m-2">
                            <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                        </svg>
                    </div>
                    {/* Search Input */}
                    <textarea onKeyDown={handleKeyDown} autoFocus maxLength={process.env.REACT_APP_MAX_INPUT_LENGTH} placeholder="Quote" rows="1" id="search" onChange={(e) => setSearchText(e.target.value.slice(0, process.env.REACT_APP_MAX_INPUT_LENGTH))} value={searchText} className='grow overflow-y max-h-44 border-none text-gray-800/95 text-2xl font-medium focus-visible:outline-0 focus-visible:ring-0 '></textarea>
                    {/* Search Submit */}
                    <button type="button" disabled={searchText === '' ? true : false} className="rounded-full p-0 disabled:opacity-35" onClick={searchSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 m-2">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div >
    );
};