import style from './style.module.scss';
import './index.scss';
import {Link} from "react-router-dom";
import alina from '../../../assets/ava/alina.jpg';
import lena from '../../../assets/ava/lena.jpg';
import rodion from '../../../assets/ava/rodion.jpg';
import ilya from '../../../assets/ava/ilya.png';
import den  from '../../../assets/ava/den.jpg';
import itmo  from '../../../assets/partners/itmoLogo.jpeg';
import syn  from '../../../assets/partners/syntellyLogo.png';
import aqua  from '../../../assets/partners/aquaLogo.png';
import infochem  from '../../../assets/partners/infochem.png';
import fiop from '../../../assets/partners/fiop.png';
import thoth from '../../../assets/thothAbout/thoth.png'
import ex from '../../../assets/thothAbout/explore.svg'
import {useEffect, useRef, useState,} from "react";
import gsap from 'gsap';
import ReactCardFlip from "react-card-flip";
const AboutPage = () =>{
    const thothRef = useRef(null);
    // const [animationPlayed, setAnimationPlayed] = useState(false);
    const [flips, setFlips] = useState({
        alina: false,
        lena: false,
        rodion: false,
        ilya: false,
        den: false
    });

    // useEffect(() => {
    //     const thothElement = thothRef.current;
    //
    //     if (thothElement && !animationPlayed) {
    //         const animation = gsap.from('#teaminf', {
    //             y: '200', // Randomize initial x position
    //             borderRadius: 20,
    //             opacity: 0,
    //             stagger: 0.2,
    //             ease: 'power4.out',
    //             duration: 5,
    //         });
    //
    //         const onMouseEnter = () => {
    //             if (animation) {
    //                 animation.kill(); // Stop the animation
    //             }
    //             gsap.to(thothElement, {
    //                 y: 0,
    //                 opacity: 1,
    //                 ease: 'power4.out',
    //                 duration: 1,
    //             });
    //             setAnimationPlayed(true);
    //         };
    //
    //         thothElement.addEventListener('mouseenter', onMouseEnter);
    //
    //         return () => {
    //             thothElement.removeEventListener('mouseenter', onMouseEnter);
    //         };
    //     }
    // }, [animationPlayed]);

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
    return(<div className={style.about}>
        <h1>ABOUT US</h1>
        <div className={style.project}>
            <div className={style.shortInf}>
                <p id='parRight'>Thothex.hackathon is an open platform for participating in and running hackathons.
                    Participants can
                    choose hackathons, join teams, earn points and <strong>improve their skills</strong>. Organizers, in
                    turn, can create and
                    customize hackathons as they see fit and bring out the best among participants.</p>
                <h4 id='enth'>Created by enthusiasts for enthusiasts</h4>
                <p id='parLeft'>Our mission is to make participation in hackathons accessible to all and to help
                    participants develop
                    their skills.
                    We believe in fostering a supportive community where participants can learn and <strong> grow
                        together.</strong>
                </p>
            </div>
            <h3>Story of logo</h3>
            <div
                id='thoth'
                className={style.thoths}
            >
                <picture>
                    <source srcSet={thoth} media="(width: 600px)"/>
                    <img src={thoth} alt=""/>
                </picture>
                <p>The word "Thothex" is made up of two parts, "Thoth" and "ex". "Thoth" is the ancient Egyptian god of
                    science, wisdom and art. He was known as the patron of magic, writing and knowledge. In his image we
                    saw a symbol of knowledge that unites people in the pursuit of comprehending new horizons.</p>
            </div>
            <div className={style.ex} ref={thothRef}>
                <picture>
                    <source srcSet={ex} media="(width: 600px)"/>
                    <img src={ex} alt=""/>
                </picture>
                <p>"Ex" is an abbreviation of "explore". The word reflects our commitment to exploring new
                    possibilities, pushing boundaries and driving innovation. We believe that exploration is the key to
                    comprehending new knowledge and achieving success.</p>
            </div>

        </div>
        <div className={style.aim}>
            {/*<h3>Our aim</h3>*/}
        </div>
        <div className={style.team}>
            <h3>Team</h3>
            <div id='teaminf' className={style.teamInfo}>
                    <ReactCardFlip isFlipped={flips.alina}  flipDirection="horizontal">
                        <div className={style.frontComponent} onMouseEnter={() => handleMouseEnter('alina')} >
                            <div className='personContainer' >
                            <picture>
                                <source srcSet={alina} media="(width: 600px)"/>
                                <img src={alina} alt=""/>
                            </picture>
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
                                <p>works in itmo</p>
                            </div>
                        </div>
                    </ReactCardFlip>
                <ReactCardFlip isFlipped={flips.lena} flipDirection="horizontal">
                    <div className={style.frontComponent} onMouseEnter={() => handleMouseEnter('lena')}>
                        <div className='personContainer'>
                            <picture>
                                <source srcSet={lena} media="(width: 600px)"/>
                                <img src={lena} alt=""/>
                            </picture>
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
                            <picture>
                                <source srcSet={rodion} media="(width: 600px)"/>
                                <img src={rodion} alt=""/>
                            </picture>
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
                            <picture>
                                <source srcSet={ilya} media="(width: 600px)"/>
                                <img src={ilya} alt=""/>
                            </picture>
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
                            <picture>
                                <source srcSet={den} media="(width: 600px)"/>
                                <img src={den} alt=""/>
                            </picture>
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
            <h3>Supervisors</h3>
            <div className={style.supervisors}>

            </div>

        </div>
        <div className={style.partners}>
            <h3>Partners</h3>
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
            <h2>Creators</h2>
            <div className={style.creatorsTeam}>

            </div>
            <div>
                <p>This website was developed by</p>
                <Link to='https://github.com/AlinaLuzanova'><h4>Alina Luzanova</h4></Link>
                <Link to='https://github.com/https://github.com/nunespi'><h4>Lia Tezetdinova</h4></Link>
                <Link to='https://github.com/shuhermayer'><h4>Evgeny Leventsov</h4></Link>
            </div>
        </div>
    </div>)
}

export default AboutPage