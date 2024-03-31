// FeaturesPanel.js

// import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setMode} from '@/redux/features/modeSlice.js';
import style from './style.module.scss';

const FeaturesPanel = () => {
    const dispatch = useDispatch();
    const { darkMode } = useSelector(
        (state) => state.mode
    );
    // useEffect(() => {
    //     document.getElementById('theme-toggle-btn').addEventListener('click', function() {
    //         document.body.classList.toggle(`${style.darkTheme}`);
    //     });
    // },[])
    return (
        <div>
            <button id='theme-toggle-btn' className={`h-screen  
                                 flex  
                                 items-center  
                                 justify-center  
                                 text-2xl  
                                 cursor-pointer  
                                 ${darkMode?
                "text-richblack-100 "
                : "text-richblack-700"}`}
                     onClick={() => {dispatch(setMode(!darkMode)
                     )}}>
                {darkMode ? (
                    <p className={style.light}>light</p>
                ) : (
                    <p className={style.dark}>dark</p>)}
            </button>
        </div>
    );
};

export default FeaturesPanel;
