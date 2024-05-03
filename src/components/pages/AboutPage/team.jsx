import style from "@/components/pages/AboutPage/style.module.scss";
import ReactCardFlip from "react-card-flip";
import alina from "@/assets/ava/alina.jpg";
import lena from "@/assets/ava/lena.jpg";
import rodion from "@/assets/ava/rodion.jpg";
import ilya from "@/assets/ava/ilya.png";
import den from "@/assets/ava/den.jpg";
import {useState} from "react";
import LazyImage from "@/components/pages/AboutPage/LazyImage.jsx";
import {useTranslation} from "react-i18next";


const Team = ()=>{
    const { t } = useTranslation();
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
                        <p>{t(`AboutUsPage.ALINA`)}</p>
                        <p>{t(`AboutUsPage.LUZANOVA`)}</p>
                        <h5>{t(`AboutUsPage.Web-developer`)}</h5>
                    </div>
                </div>
                <div className={style.backComponent} onMouseLeave={() => handleMouseLeave('alina')}>
                    <div className='personContainer'>
                        <p>{t(`AboutUsPage.ALINA`)}</p>
                        <p>{t(`AboutUsPage.LUZANOVA`)}</p>
                        <h5>{t(`AboutUsPage.Web-developer`)}</h5>
                    </div>
                </div>
            </ReactCardFlip>
            <ReactCardFlip isFlipped={flips.lena} flipDirection="horizontal">
                <div className={style.frontComponent} onMouseEnter={() => handleMouseEnter('lena')}>
                    <div className='personContainer'>
                        <LazyImage src={lena} alt="Lena" />
                        <p>{t(`AboutUsPage.ELENA`)}</p>
                        <p>{t(`AboutUsPage.SHCHERBAKOVA`)}</p>
                        <h5>{t(`AboutUsPage.Designer`)}</h5>
                    </div>
                </div>
                <div className={style.backComponent} onMouseLeave={() => handleMouseLeave('lena')}>
                    <div className='personContainer'>
                        <p>{t(`AboutUsPage.ELENA`)}</p>
                        <p>{t(`AboutUsPage.SHCHERBAKOVA`)}</p>
                        <h5>{t(`AboutUsPage.Designer`)}</h5>
                    </div>
                </div>
            </ReactCardFlip>
            <ReactCardFlip isFlipped={flips.rodion} flipDirection="horizontal">
                <div className={style.frontComponent} onMouseEnter={() => handleMouseEnter('rodion')}>
                    <div className='personContainer'>
                        <LazyImage src={rodion} alt="Rodion" />
                        <p>{t(`AboutUsPage.RODION`)}</p>
                        <p>{t(`AboutUsPage.GOLOVINSKY`)}</p>
                        <h5>{t(`AboutUsPage.Data scientist`)}</h5>

                    </div>
                </div>
                <div className={style.backComponent} onMouseLeave={() => handleMouseLeave('rodion')}>
                    <div className='personContainer'>
                        <p>{t(`AboutUsPage.RODION`)}</p>
                        <p>{t(`AboutUsPage.GOLOVINSKY`)}</p>
                        <h5>{t(`AboutUsPage.Data scientist`)}</h5>
                    </div>
                </div>
            </ReactCardFlip>
            <ReactCardFlip isFlipped={flips.ilya} flipDirection="horizontal">
                <div className={style.frontComponent} onMouseEnter={() => handleMouseEnter('ilya')}>
                    <div className='personContainer'>
                        <LazyImage src={ilya} alt="Ilya" />
                        <p>{t(`AboutUsPage.ILYA`)}</p>
                        <p>{t(`AboutUsPage.TONKII`)}</p>
                        <h5>{t(`AboutUsPage.Product manager`)}</h5>
                    </div>
                </div>
                <div className={style.backComponent} onMouseLeave={() => handleMouseLeave('ilya')}>
                    <div className='personContainer'>
                        <p>{t(`AboutUsPage.ILYA`)}</p>
                        <p>{t(`AboutUsPage.TONKII`)}</p>
                        <h5>{t(`AboutUsPage.Product manager`)}</h5>
                    </div>
                </div>
            </ReactCardFlip>
            <ReactCardFlip isFlipped={flips.den} flipDirection="horizontal">
                <div className={style.frontComponent} onMouseEnter={() => handleMouseEnter('den')}>
                    <div className='personContainer'>
                        <LazyImage src={den} alt="Denis" />
                        <p>{t(`AboutUsPage.DENIS`)}</p>
                        <p>{t(`AboutUsPage.CHISTIAKOV`)}</p>
                        <h5>{t(`AboutUsPage.Data scientist`)}</h5>
                    </div>
                </div>
                <div className={style.backComponent} onMouseLeave={() => handleMouseLeave('den')}>
                    <div className='personContainer'>
                        <p>{t(`AboutUsPage.DENIS`)}</p>
                        <p>{t(`AboutUsPage.CHISTIAKOV`)}</p>
                        <h5>{t(`AboutUsPage.Data scientist`)}</h5>
                    </div>
                </div>
            </ReactCardFlip>
        </div>
    )
}

export default Team
