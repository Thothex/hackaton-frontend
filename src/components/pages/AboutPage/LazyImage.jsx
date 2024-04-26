import PropTypes from 'prop-types';

const LazyImage = ({ src, alt }) => (
    <picture>
        <source srcSet={src} media="(width: 600px)" />
        <img src={src} alt={alt} />
    </picture>
);

LazyImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
}


export default LazyImage;
