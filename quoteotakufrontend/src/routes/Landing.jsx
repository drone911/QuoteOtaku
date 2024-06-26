import React from 'react';
import Sidebar from './components/Sidebar';
import Main from './components/Main';

export default function Landing() {
    const [showSidebar, setShowSidebar] = React.useState(true);
    const [isSmallScreen, setIsSmallScreen] = React.useState(window.innerWidth <= '640');

    const openSidebar = () => {
        console.log("Open")
        setShowSidebar(true);
    }
    const closeSidebar = () => {
        console.log("Close")
        setShowSidebar(false);
    }

    React.useEffect(() => {
        function handleResize() {
            setIsSmallScreen(window.innerWidth <= '640');
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [window.innerWidth]);


    return (
        <div className="bg-black w-screen h-screen">
            <div className={`${showSidebar ? '' : '-translate-x-full'} absolute h-full w-10/12 md:w-4/12 z-10 bg-stone-950 transition-all shadow-md shadow-gray-700`}>
                <Sidebar />
            </div>
            <div onClick={isSmallScreen && showSidebar ? closeSidebar : undefined}
                className={`${showSidebar ? 'md:w-8/12' : ''} absolute right-0 w-screen z-0 bg-cover bg-center bg-no-repeat  h-full transition-all
                ${isSmallScreen && showSidebar ? 'opacity-50' : ''}`}
                style={{
                    "backgroundImage": "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(background.jpg)",
                }}>
                <Main showSidebar={showSidebar} closeSidebar={closeSidebar} openSidebar={openSidebar}></Main>
            </div>
        </div >
    );
};