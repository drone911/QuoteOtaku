import React from 'react';
import autosize from 'autosize';

export default function ReverseSearch() {
    const [isQuoteSearchFocused, setIsQuoteSearchFocused] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');
    React.useEffect(() => {
        const search = document.getElementById('search');
        autosize(search);
    }, []);

    return (
        <div className='flex flex-col h-auto' style={{ height: "88%" }}>
            <div id="chat" className='grow'>
                <Chat></Chat>    
            </div>
            <div className="flex justify-center items-center">
                <div className="m-4 flex items-end flex-nowrap bg-white rounded-[40px] min-h-max w-8/12 min-h-14 px-3 py-2 mb-8">
                    <div className="rounded-full hover:bg-gray-600/45">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 m-2">
                            <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                        </svg>
                    </div>
                    <textarea autoFocus placeholder="Quote" rows="1" id="search" className='grow overflow-y m-w max-h-44 w-full border-none text-gray-800/95 text-2xl font-medium focus:outline-0 focus:ring-0 '></textarea>
                    <div className="rounded-full hover:bg-gray-600/45">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 m-2">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};