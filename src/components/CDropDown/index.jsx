import styles from "./styles.module.scss";
import arrowSVG from "../../assets/ddArrow.svg";
import { useState } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const CDropDown = ({
  name = "",
  items = [],
  placeholder = "Выберите",
  value = "Choose",
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const dpopedPlainClass = classnames(styles.dpopedPlain, {
    [styles.opened]: isOpen,
  });

  const ddArrowClass = classnames(styles.arrowSVG, {
    [styles.opened]: isOpen,
  });

  const handleItemClick = (item) => {
    setIsOpen(false);
    onChange(name, item);
  };
  return (
    <div className={styles.ddContainer}>
      <label className={styles.label}>{placeholder}</label>
      <div className={styles.ddWrapper} onClick={handleClick}>
        <div className={styles.innerWrapper}>
          <div className={styles.ddText}>{value}</div>
          <div className={ddArrowClass}>
            <img className={ddArrowClass} src={arrowSVG} alt="arrow" />
          </div>
        </div>
      </div>
      <div className={dpopedPlainClass}>
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className={styles.ddItem}
              onClick={() => handleItemClick(item)}
            >
              {item.displayValue}
            </div>
          );
        })}
      </div>
    </div>
  );
};

CDropDown.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CDropDown;
