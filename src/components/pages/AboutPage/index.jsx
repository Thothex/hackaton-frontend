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
import {useEffect} from "react";
import gsap from 'gsap';
const AboutPage = () =>{
    // useEffect(()=>{
    //     gsap.fromTo("#teaminf",{
    //         x:20,
    //         borderRadius:10
    //     } , {
    //         x:80,
    //         borderRadius:50,
    //         duration:1})
    // },[])
    useEffect(() => {
        gsap.from(".personContainer", {
            x: 'random(-50, 50)', // Randomize initial x position
            y: 'random(-20, 50)', // Randomize initial y position
            borderRadius: 20,
            opacity: 0,
            stagger: 0.2,
            ease: "power4.out",
            duration: 1
        });
    }, []);
    return(<div className={style.about}>
        <h1>ABOUT US</h1>
        <div className={style.project}>
            <p>Thothex.hackathon is an open platform for participating in and running hackathons. Participants can
                choose hackathons, join teams, earn points and improve their skills. Organizers, in turn, can create and
                customize hackathons as they see fit and bring out the best among participants.</p>
            <h4>Created by enthusiasts for enthusiasts</h4>
            <p>Our mission is to make participation in hackathons accessible to all and to help participants develop
                their skills.
                We believe in fostering a supportive community where participants can learn and grow together.
            </p>
            <h3>Story of logo</h3>
            <div className={style.thoths}>
                <picture>
                    <source srcSet={thoth} media="(width: 600px)"/>
                    <img src={thoth} alt=""/>
                </picture>
                <p>The word "Thothex" is made up of two parts, "Thoth" and "ex". "Thoth" is the ancient Egyptian god of
                    science, wisdom and art. He was known as the patron of magic, writing and knowledge. In his image we
                    saw a symbol of knowledge that unites people in the pursuit of comprehending new horizons.</p>
            </div>
            <div className={style.ex}>
                <picture>
                    <source srcSet={ex} media="(width: 600px)"/>
                    <img src={ex} alt=""/>
                </picture>
                <p>"Ex" is an abbreviation of "explore". The word reflects our commitment to exploring new possibilities, pushing boundaries and driving innovation. We believe that exploration is the key to comprehending new knowledge and achieving success.</p>
            </div>

        </div>
        <div className={style.aim}>
            <h2>Our aim</h2>
        </div>
        <div className={style.team}>
            <h2>Team</h2>
            <div id='teaminf' className={style.teamInfo}>
                <div className='personContainer'>
                    <picture>
                        <source srcSet={alina} media="(width: 600px)"/>
                        <img src={alina} alt=""/>
                    </picture>
                    <p>ALINA LUZANOVA</p>
                    <h5>Web-developer</h5>
                </div>
                <div className='personContainer'>
                    <picture>
                        <source srcSet={lena} media="(width: 600px)"/>
                        <img src={lena} alt=""/>
                    </picture>
                    <p>ELENA SHCHERBAKOVA</p>
                    <h5>Designer</h5>
                </div>
                <div className='personContainer'>
                    <picture>
                        <source srcSet={rodion} media="(width: 600px)"/>
                        <img src={rodion} alt=""/>
                    </picture>
                    <p>RODION GOLOVINSKY</p>
                    <h5>Data scientist</h5>

                </div>
                <div className='personContainer'>
                    <picture>
                        <source srcSet={ilya} media="(width: 600px)"/>
                        <img src={ilya} alt=""/>
                    </picture>
                    <p>ILYA TONKII</p>
                    <h5>Product manager</h5>
                </div>
                <div className='personContainer'>
                    <picture>
                        <source srcSet={den} media="(width: 600px)"/>
                        <img src={den} alt=""/>
                    </picture>
                    <p>DENIS CHISTIAKOV</p>
                    <h5>Data scientist</h5>
                </div>

            </div>
            <h2>Supervisors</h2>
            <div className={style.supervisors}>

            </div>

        </div>
        <div className={style.partners}>
            <h2>Partners</h2>
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