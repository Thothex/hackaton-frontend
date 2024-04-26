import style from "@/components/pages/AboutPage/style.module.scss";
import ReactCardFlip from "react-card-flip";
import alina from "@/assets/ava/alina.jpg";
import lena from "@/assets/ava/lena.jpg";
import rodion from "@/assets/ava/rodion.jpg";
import ilya from "@/assets/ava/ilya.png";
import den from "@/assets/ava/den.jpg";
import {useState} from "react";
import LazyImage from "@/components/pages/AboutPage/LazyImage.jsx";


const Team = ()=>{

    const [flips, setFlips] = useState({
        alina: false,
        lena: false,
        rodion: false,
        ilya: false,
        den: false
    });

    const handleMouseEnter = (member) => {
        setFlips(prevFlips => ({
            ...prevFlips,
            [member]: true
        }));
    };

    const handleMouseLeave = (member) => {
        setFlips(prevFlips => ({
            ...prevFlips,
            [member]: false
        }));
    };

    return (
        <div id='teaminf' className={style.teamInfo}>
            <ReactCardFlip isFlipped={flips.alina} flipDirection="horizontal">
                <div className={style.frontComponent} onMouseEnter={() => handleMouseEnter('alina')}>
                    <div className='personContainer'>
                        <LazyImage src={alina} alt="Alina" />
                        <p>ALINA</p>
                        <p>LUZANOVA</p>
                        <h5>Web-developer</h5>
                    </div>
                </div>
                <div className={style.backComponent} onMouseLeave={() => handleMouseLeave('alina')}>
                    <div className='personContainer'>
                        <p>ALINA</p>
                        <p>LUZANOVA</p>
                        <h5>Web-developer</h5>
                    </div>
                </div>
            </ReactCardFlip>
            <ReactCardFlip isFlipped={flips.lena} flipDirection="horizontal">
                <div className={style.frontComponent} onMouseEnter={() => handleMouseEnter('lena')}>
                    <div className='personContainer'>
                        <LazyImage src={lena} alt="Lena" />
                        <p>ELENA</p>
                        <p>SHCHERBAKOVA</p>
                        <h5>Designer</h5>
                    </div>
                </div>
                <div className={style.backComponent} onMouseLeave={() => handleMouseLeave('lena')}>
                    <div className='personContainer'>
                        <p>ELENA</p>
                        <p>SHCHERBAKOVA</p>
                        <h5>Designer</h5>
                    </div>
                </div>
            </ReactCardFlip>
            <ReactCardFlip isFlipped={flips.rodion} flipDirection="horizontal">
                <div className={style.frontComponent} onMouseEnter={() => handleMouseEnter('rodion')}>
                    <div className='personContainer'>
                        <LazyImage src={rodion} alt="Rodion" />
                        <p>RODION</p>
                        <p>GOLOVINSKY</p>
                        <h5>Data scientist</h5>

                    </div>
                </div>
                <div className={style.backComponent} onMouseLeave={() => handleMouseLeave('rodion')}>
                    <div className='personContainer'>
                        <p>RODION</p>
                        <p>GOLOVINSKY</p>
                        <h5>Data scientist</h5>
                    </div>
                </div>
            </ReactCardFlip>
            <ReactCardFlip isFlipped={flips.ilya} flipDirection="horizontal">
                <div className={style.frontComponent} onMouseEnter={() => handleMouseEnter('ilya')}>
                    <div className='personContainer'>
                        <LazyImage src={ilya} alt="Ilya" />
                        <p>ILYA</p>
                        <p>TONKII</p>
                        <h5>Product manager</h5>
                    </div>
                </div>
                <div className={style.backComponent} onMouseLeave={() => handleMouseLeave('ilya')}>
                    <div className='personContainer'>
                        <p>ILYA</p>
                        <p>TONKII</p>
                        <h5>Product manager</h5>
                    </div>
                </div>
            </ReactCardFlip>
            <ReactCardFlip isFlipped={flips.den} flipDirection="horizontal">
                <div className={style.frontComponent} onMouseEnter={() => handleMouseEnter('den')}>
                    <div className='personContainer'>
                        <LazyImage src={den} alt="Denis" />
                        <p>DENIS</p>
                        <p>CHISTIAKOV</p>
                        <h5>Data scientist</h5>
                    </div>
                </div>
                <div className={style.backComponent} onMouseLeave={() => handleMouseLeave('den')}>
                    <div className='personContainer'>
                        <p>DENIS</p>
                        <p>CHISTIAKOV</p>
                        <h5>Data scientist</h5>
                    </div>
                </div>
            </ReactCardFlip>
        </div>
    )
}

export default Team