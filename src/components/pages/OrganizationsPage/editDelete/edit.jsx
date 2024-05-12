import { useState } from "react";
import styles from "../styles.module.scss";
import { useDispatch } from "react-redux";
import { editOrganization } from "@/redux/features/organizationsSlice.js";
import { useTranslation } from "react-i18next";

const FormEditOrganization = ({ initialName, initialDescription, initialLink, id, userID }) => {
    const { t } = useTranslation();
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: initialName,
        description: initialDescription,
        link: initialLink,
        userID: userID
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await dispatch(
                editOrganization({ id, formData })
            );
            console.log(formData)
            if (response.payload.error) {
                setError(response.payload.error);
                setTimeout(() => {
                    setError(null);
                }, 3000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Edit organization details</h2>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={styles.textArea}
                />
            </div>
            <div>
                <label htmlFor="link">Link</label>
                <input
                    type="text"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                />
            </div>
            {error && <span className={styles.errorText}>{error}</span>}
            <button type="submit" className={styles.btnUpdate}>
                {t("ProfilePage.save")}
            </button>
        </form>
    );
};

export default FormEditOrganization;
