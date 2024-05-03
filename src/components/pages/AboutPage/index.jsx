import style from './style.module.scss';
import './index.scss';
import {Link} from "react-router-dom";
import itmo  from '../../../assets/partners/itmoLogo.jpeg';
import syn  from '../../../assets/partners/syntellyLogo.png';
import aqua  from '../../../assets/partners/aquaLogo.png';
import infochem  from '../../../assets/partners/infochem.png';
import fiop from '../../../assets/partners/fiop.png';
import thoth from '../../../assets/thothAbout/thoth.png'
import ex from '../../../assets/thothAbout/explore.svg'
import React, {Suspense, useEffect, useRef, useState,} from "react";
import gsap from 'gsap';
import ReactCardFlip from "react-card-flip";
import Loading from "@/components/Loading/index.jsx";
import {useTranslation} from "react-i18next";

const LazyComponent = React.lazy(() => import('./team.jsx'));

const AboutPage = () =>{
    const thothRef = useRef(null);
    const { t } = useTranslation();

    useEffect(() => {
        gsap.from("#enth", {
            x: '100', // Randomize initial x position
            // y: 'random(-20, 50)', // Randomize initial y position
            borderRadius: 20,
            opacity: 0,
            stagger: 0.2,
            ease: "power4.out",
            duration: 3
        });
    }, []);
    useEffect(() => {
        gsap.from("#parRight", {
            x: '-100', // Randomize initial x position
            // y: 'random(-20, 50)', // Randomize initial y position
            borderRadius: 20,
            opacity: 0,
            stagger: 0.2,
            ease: "power4.out",
            duration: 4
        });
    }, []);
    useEffect(() => {
        gsap.from("#parLeft", {
            x: '100', // Randomize initial x position
            // y: 'random(-20, 50)', // Randomize initial y position
            borderRadius: 20,
            opacity: 0,
            stagger: 0.2,
            ease: "power4.out",
            duration: 5
        });
    }, []);
    useEffect(() => {
        gsap.from("#thoth", {
            y: '100',
            borderRadius: 20,
            opacity: 0,
            stagger: 0.2,
            ease: "power4.out",
            duration: 5
        });
    }, []);

    return(<div className={style.about}>
        <h1>{t(`AboutUsPage.aboutUs`)}</h1>
        <div className={style.project}>
            <div className={style.shortInf}>
                <p id='parRight'>{t(`AboutUsPage.aboutUpper1`)}</p>
                <h4 id='enth'>{t(`AboutUsPage.enthusiast`)}</h4>
                <p id='parLeft'>{t(`AboutUsPage.aboutUpper2`)}
                </p>
            </div>
            <h3>{t(`AboutUsPage.storyOfLogo`)}</h3>
            <div
                id='thoth'
                className={style.thoths}
            >
                <picture>
                    <source srcSet={thoth} media="(width: 600px)"/>
                    <img src={thoth} alt=""/>
                </picture>
                <p>{t(`AboutUsPage.storyOfLogoUpper1`)}</p>
            </div>
            <div className={style.ex} ref={thothRef}>
                <picture>
                    <source srcSet={ex} media="(width: 600px)"/>
                    <img src={ex} alt=""/>
                </picture>
                <p>{t(`AboutUsPage.storyOfLogoUpper2`)}</p>
            </div>

        </div>
        <div className={style.aim}>
            {/*<h3>Our aim</h3>*/}
        </div>
        <div className={style.team}>
            <h3>{t(`AboutUsPage.team`)}</h3>
            <Suspense fallback={<Loading/>}>
                <LazyComponent />
            </Suspense>
            {/*<h3>Supervisors</h3>*/}
            {/*<div className={style.supervisors}>*/}

            {/*</div>*/}

        </div>
        <div className={style.partners}>
            <h3>{t(`AboutUsPage.partners`)}</h3>
            <div className={style.partCont}>
                <Link to="https://itmo.ru/">
                    <div className={style.logos}>
                    <picture>
                        <source srcSet={itmo} media="(width: 600px)"/>
                        <img src={itmo} alt=""/>
                    </picture>
                </div>
                </Link>
                <Link to="https://syntelly.com/">
                <div className={style.logos}>
                    <picture>
                        <source srcSet={syn} media="(width: 600px)"/>
                        <img src={syn} alt=""/>
                    </picture>
                </div>
                </Link>
                <Link to="https://aquaphor.com/">
                <div className={style.logos}>
                    <picture>
                        <source srcSet={aqua} media="(width: 600px)"/>
                        <img src={aqua} alt=""/>
                    </picture>
                </div>
                </Link>
                <Link to="https://infochemistry.ru/">
                <div className={style.logos}>
                    <picture>
                        <source srcSet={infochem} media="(width: 600px)"/>
                        <img src={infochem} alt=""/>
                    </picture>
                </div>
                </Link>
                <Link to="https://fiop.site/">
                <div className={style.logos}>
                    <picture>
                        <source srcSet={fiop} media="(width: 600px)"/>
                        <img src={fiop} alt=""/>
                    </picture>
                </div>
                </Link>
            </div>
        </div>
        <div className={style.creators}>
            <h3>{t(`AboutUsPage.CREATORS`)}</h3>
            <div className={style.creatorsTeam}>

            </div>
            <div className={style.devs}>
                <p>{t(`AboutUsPage.developers`)}</p>
                <Link to='https://github.com/AlinaLuzanova'><h4>{t(`AboutUsPage.Alina Luzanova`)}</h4></Link>
                <Link to='https://github.com/nunespi'><h4>{t(`AboutUsPage.Lia Tazetdinova`)}</h4></Link>
                <Link to='https://github.com/shuhermayer'><h4>{t(`AboutUsPage.Evgeny Leventsov`)}</h4></Link>
            </div>
        </div>
    </div>)
}

export default AboutPage
