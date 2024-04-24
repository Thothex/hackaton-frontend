import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import gsap from "gsap";

const TypingEffect = ({ text }) => {
    const textRef = useRef(null);
    const { t } = useTranslation();
    useEffect(() => {
        gsap.fromTo(
            textRef.current.children,
            { opacity: 0, y: -20, x: 40 },
            {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power4.out',
            }
        );
    }, [text]);
    return (
        <h1 ref={textRef}>
            {t(text).split('').map((char, index) => (
                <span key={index}>{char}</span>
            ))}
        </h1>
    );
};
TypingEffect.propTypes = {
    text: PropTypes.string.isRequired,
};

export default TypingEffect;
