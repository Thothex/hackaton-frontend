import styles from './styles.module.scss';
import { useTranslation } from "react-i18next";
import {useNavigate} from "react-router-dom";
import book from '../../../assets/book.svg'
// import code from '../../../assets/code.svg'
// import bolt from '../../../assets/bolt.svg'
 import data from '../../../assets/data.svg'
import chem from '../../../assets/chem.webp';
import comp from '../../../assets/comp.png';
import logo from '../../../assets/logoBig.svg';
import {useRef, useEffect, useState} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import TypingEffect from "@/components/TypingEffect/index.jsx";
gsap.registerPlugin(ScrollTrigger);

console.clear();

function Box({ children, timeline, index }) {
    const el = useRef();

    useGSAP(() => {
        // add 'left 100px' animation to timeline
        timeline && timeline.to(el.current, {
            x: -200
        }, index * 0.1);

    }, [timeline, index]);

    return <div className="box gradient-green" ref={el}>{children}</div>;
}

function Circle({ children, timeline, index, rotation }) {
    const el = useRef();

    useGSAP(() => {
        // add 'right 100px, rotate 360deg' animation to timeline
        timeline && timeline.to(el.current, {
            rotation: rotation,
            x: 200
        }, index * 0.1);

    }, [timeline, rotation, index]);

    return <div className="circle gradient-blue" ref={el}>{children}</div>;
}

const StartPage = () =>{
    const navigate = useNavigate();
    const { t } = useTranslation();
    const handleNavigate = (path) => {
        navigate(path);
    };

    useEffect(() => {
        gsap.from("#start", {
            y: '100',
            borderRadius: 20,
            opacity: 0,
            stagger: 0.2,
            ease: "power4.out",
            duration: 2
        });
    }, []);


    const imgRef = useRef(null);
    const animationRef = useRef(null);


    const [tl, setTl] = useState();

    const { contextSafe } = useGSAP(() => {
        const tl = gsap.timeline();
        setTl(tl);
    });

    const toggleTimeline = contextSafe(() => {
        tl.reversed(!tl.reversed());
    })

    useEffect(() => {
        const el = imgRef.current;
        gsap.fromTo(
            el,
            { rotation: 0 },
            {
                rotation: 360,
                duration: 3,
                scrollTrigger: {
                    trigger: el,
                },
            }
        );
    }, []);
    useEffect(() => {
        gsap.from("#list", {
            y: '100',
            borderRadius: 20,
            opacity: 0,
            stagger: 0.2,
            ease: "power4.out",
            duration: 2
        });
    }, []);

    const handleMouseEnter = () => {
        toggleTimeline();
    };

    const handleMouseLeave = () => {
        toggleTimeline();
    };
    return (
        <>
            <div className={styles.StartPage}>
                <img src={logo} alt='logo' className={styles.logo} />
                <h2 className={styles.Welcome} id='list'>{t("StartPage.welcome")}</h2>
                <div className={styles.titleContainer}>
                    <TypingEffect text="StartPage.ESSENTIAL" />
                    <TypingEffect text="StartPage.SKILLS" />
                </div>

                <p className={styles.paragraph}>
                    {t("StartPage.join-educational-competitions")}
                </p>
                <p className={styles.paragraph}>{t("StartPage.curiosity")}</p>
                <p className={styles.paragraph}>{t("StartPage.shaped")}</p>
                <button
                    onClick={() => {
                        handleNavigate("/hackathon");
                    }}
                    className={styles.button}
                >
                    {t("StartPage.hackatons")}
                </button>
                <div className={styles.mouse} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <h3  className={styles.ourVal}>{t("StartPage.values")}</h3>
                <div className={styles.animationContainer}>
                    <Box timeline={tl} index={0}><img src={chem} style={{width:'160px'}}/></Box>
                    <Circle timeline={tl} rotation={180} index={1}><img src={comp} style={{width:'160px'}}/></Circle>
                </div>
                <div className={styles.cards}  >
                    <div className="card" style={{width:'25%'}}>
                        <div className="card-body" >
                            <img src={book} alt='book' className={styles.cardImage} />
                            <h5 className="card-title">{t("StartPage.explore")}</h5>
                            <p className="card-text">{t("StartPage.exploreP")}</p>
                        </div>
                    </div>
                    <div className="card" style={{width:'25%'}}>
                        <div className="card-body">
                            <img src={book} alt='book' className={styles.cardImage} />
                            <h5 className="card-title">{t("StartPage.youth")}</h5>
                            <p className="card-text">{t("StartPage.youthP")}
                            </p>
                        </div>
                    </div>
                    <div className="card" style={{width:'25%'}}>
                        <div className="card-body">
                            <img src={book} alt='book' className={styles.cardImage} />
                            <h5 className="card-title">{t("StartPage.Innovation")}</h5>
                            <p className="card-text">{t("StartPage.InnovationP")}
                            </p>
                        </div>
                    </div>
                    <div className="card" style={{width:'25%'}}>
                        <div className="card-body">
                            <img src={book} alt='book' className={styles.cardImage} />
                            <h5 className="card-title">{t("StartPage.data")}</h5>
                            <p className="card-text">{t("StartPage.dataP")}</p>
                        </div>
                    </div>
                </div>
                </div>
                {/*<img src={data} ref={imgRef}/>*/}

            </div>
        </>
    )
}
export default StartPage;
