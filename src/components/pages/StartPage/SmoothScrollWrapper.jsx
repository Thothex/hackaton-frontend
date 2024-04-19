import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import './style.scss'
gsap.registerPlugin(ScrollTrigger);

const SmoothScrollWrapper = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        gsap.to(container, {
            scrollTo: {
                y: ".middle",
                autoKill: false,
            },
            duration: 1,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: ".middle",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
            },
        });
    }, []);

    return (
        <div id="smooth-wrapper">
            <div id="smooth-content" ref={containerRef}>
                <div className="box box-ref">ref</div>
                <div className="box box-a" data-speed="0.5">a</div>
                <div className="box box-b" data-speed="0.5">b</div>
                <div className="box box-c" data-speed="0.5">c</div>
                <div className="refline"></div>
            </div>
            <div className="middle"></div>
        </div>
    );
};

export default SmoothScrollWrapper;
