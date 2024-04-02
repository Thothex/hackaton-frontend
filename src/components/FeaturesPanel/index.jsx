import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '@/redux/features/modeSlice.js';
import style from './style.module.scss';
import lang from '../../assets/mode/lang.svg';
import { useEffect } from 'react';

const FeaturesPanel = () => {
    const dispatch = useDispatch();
    const { darkMode } = useSelector(
        (state) => state.mode
    );

    useEffect(() => {
        if (darkMode) {
            document.body.style.backgroundColor = '#35405b';
        } else {
            document.body.style.backgroundColor = '#f8f8fa';
        }
    }, [darkMode]);

    return (
        <div className={style.settings}>
            <img src={lang} alt='lang' className={style.lang} />
            <button
                id='theme-toggle-btn'
                className={`${style.panel}`}
                onClick={() => {
                    dispatch(setMode(!darkMode));
                }}
                style={{
                    backgroundColor: darkMode ? '#35405b' : '#f8f8fa'
                }}
            >
                <p className={darkMode ? style.light : style.dark}></p>
            </button>
        </div>
    );
};

export default FeaturesPanel;
