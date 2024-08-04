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
    const [searches, setSearches] = React.useState(new Set());
    const [pageOffsetEnd, setpageOffsetEnd] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const chatParentRef = React.useRef(null);
    const dispatch = useDispatch();

    // Effect to autosize input search and get current chat content
    React.useEffect(() => {
        const search = document.getElementById('search');
        autosize(search);
        axios.get(process.env.REACT_APP_API_PREFIX + "/chat/" + activeSearch.id, {
            params: {
                pageSize: process.env.REACT_APP_CHAT_PAGE_SIZE,
                pageOffsetEnd: pageOffsetEnd
            }
        }).then((getChatResponse) => {
            console.log(getChatResponse.data);
            if (getChatResponse.data.result != null) {
                getChatResponse.data.result.chatLines.forEach((elem) => searches.add(elem));
            }
            setSearches(searches);

        }).catch((error) => {
            // exampleGetChatResponse.chatLines.forEach((elem) => searches.add(elem));
            // setSearches(searches);
            console.log(error);
        });


        return async () => {
            setSearches(new Set());
            setpageOffsetEnd(0);
        }
    }, [activeSearch.id]);

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

            searches.add(postChatResponse.data.result);
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
            <div id="chat" className='grow' ref={chatParentRef}>
                <Chat searches={searches} setSearchText={setSearchText} searchSubmit={searchSubmit}></Chat>
            </div>
            {/* Search Bar */}
            <div className="flex justify-center items-center">
                <div className="m-4 flex items-end flex-nowrap bg-white rounded-[40px] min-h-max w-10/12 max-w-screen-md min-h-14 px-3 py-2 mb-8">
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
        </div>
    );
};