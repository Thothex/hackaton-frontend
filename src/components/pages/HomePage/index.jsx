import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchHackathons } from "@/redux/features/hackathonsSlice.js";
import styles from "./styles.module.scss";
import HackathonPanel from "@/components/HackathonPanel";
import { Select, Space } from "antd";
import gsap from "gsap";
import { fetchOrganizations } from "@/redux/features/organizationsSlice.js";
import './index.scss'
const HomePage = React.memo(() => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userStore.userInfo);
    const hackathons = useSelector((state) => state.hackathons.hackathons);
    const [currentFilter, setCurrentFilter] = useState("all");
    const { darkMode } = useSelector((state) => state.mode);

    useEffect(() => {
        dispatch(fetchHackathons());
        dispatch(fetchOrganizations());
    }, [dispatch]);

    useEffect(() => {
        gsap.from("#list", {
            y: "50",
            borderRadius: 20,
            opacity: 0,
            stagger: 0.2,
            ease: "power4.out",
            duration: 2
        });
    }, []);

    const handleFilterChange = useCallback((value) => {
        setCurrentFilter(value);
    }, []);

    const filteredHackathons = useMemo(() => {
        const currentDate = new Date();
        return hackathons.filter((ha) => {
            if (currentFilter === "all") {
                return true;
            }
            if (ha.organizer_id === user.id && currentFilter === "my") {
                return true;
            }
            if (
                new Date(ha.start) <= currentDate &&
                new Date(ha.end) >= currentDate &&
                currentFilter === "inProgress"
            ) {
                return true;
            }
            if (new Date(ha.end) < currentDate && currentFilter === "past") {
                return true;
            }
            if (
                new Date(ha.start) > currentDate &&
                currentFilter === "registrationIsOpen"
            ) {
                return true;
            }
        });
    }, [currentFilter, hackathons, user.id]);

    return (
        <div className={styles.homeContainer}>
            <div
                className={`${styles.fullWidthFlexRow} ${
                    darkMode && styles.darkPage
                }`}
            >
                <h1 className={styles.title}>{t("HomePage.HACKATHONS")}</h1>
                <Select
                    className="custom-select"
                    defaultValue="all"
                    dropdownClassName="custom-dropdown"
                    onChange={handleFilterChange}
                    options={[
                        { value: "all", label: `${t("HomePage.all")}` },
                        { value: "my", label: `${t("HomePage.my")}` },
                        { value: "inProgress", label: `${t("HomePage.in progress")}` },
                        { value: "past", label: `${t("HomePage.past")}` },
                        {
                            value: "registrationIsOpen",
                            label: `${t("HomePage.registration")}`,
                        },
                    ]}
                />
            </div>
            <div className={styles.hackathonList} id="list">
                {filteredHackathons.map((hackathon) => (
                    <HackathonPanel
                        key={hackathon.id}
                        id={hackathon.id}
                        name={hackathon.name}
                        start={hackathon.start}
                        end={hackathon.end}
                        organizer_id={hackathon.organizer_id}
                        users={hackathon.users}
                        category={hackathon.category.name}
                        user={user}
                        type={hackathon.type}
                    />
                ))}
            </div>
        </div>
    );
});

export default HomePage;
