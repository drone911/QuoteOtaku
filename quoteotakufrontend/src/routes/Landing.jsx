import React from 'react';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import { useDispatch, useSelector } from 'react-redux';
import { selectChats, selectRecentChat } from '../reducers/chatsFileSlice';
import { createChatConditionally } from '../reducers/chatsFileSlice'

export default function Landing() {
    const [isSmallScreen, setIsSmallScreen] = React.useState(window.outerWidth <= '768');
    const [showSidebar, setShowSidebar] = React.useState(!isSmallScreen);
    const dispatch = useDispatch();
    dispatch(createChatConditionally());

    const [activeSearch, setActiveSearch] = React.useState(useSelector(selectRecentChat));

    const searches = useSelector(selectChats);

    const openSidebar = () => {
        setShowSidebar(true);
    }
    const closeSidebar = () => {
        setShowSidebar(false);
    }

    React.useEffect(() => {
        function handleResize() {
            setIsSmallScreen(window.innerWidth <= '768');
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [window.innerWidth]);


    return (
        <div className="bg-black w-screen h-screen flex flex-nowrap">
            <div className={`${showSidebar ? '' : 'hidden w-0'} flex flex-col h-full z-10 whitespace-nowrap  bg-stone-950 transition-all shadow-md shadow-gray-700`}>
                <Sidebar searches={searches} activeSearch={activeSearch} setActiveSearch={setActiveSearch} />
            </div>
            <div onClick={isSmallScreen && showSidebar ? closeSidebar : undefined}
                className={`${showSidebar ? '' : ''} grow w-screen z-0 bg-cover bg-center bg-no-repeat h-full transition-all
                ${isSmallScreen && showSidebar ? 'opacity-50 absolute' : ''}`}
                style={{
                    "backgroundImage": "linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(background.jpg)",
                }}>
                <Main showSidebar={showSidebar} activeSearch={activeSearch} closeSidebar={closeSidebar} openSidebar={openSidebar}></Main>
            </div>
        </div >
    );
};