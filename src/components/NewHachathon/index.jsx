import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CDropDown from "../CDropDown";
import AuthInput from "../CAuthInput";
import styles from "./styles.module.scss";
import CTextArea from "../CTextArea";
import CCheckbox from "../CustomCheckbox";
import Badge from "../Badge";
import MainButton from "../MainButton";
import Calendar from "../CCalendar";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  clearHackathon,
  createHackathon,
  fetchHackathonById,
  putHackathon,
  updateHackathon,
} from "@/redux/features/hackathonsSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import moment from "moment";

dayjs.extend(customParseFormat);
const NewHachathon = ({ id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hackathon = useSelector((state) => state.hackathons.hackathon);
  const categories = useSelector(
    (state) => state.dictionaryStore.dictionary.categories
  );
  const categoriesForPicker = categories.map((cat) => ({
    id: cat.id,
    value: cat.name,
    displayValue: `${t(`HackathonPage.categories.${cat.name}`)}`,
  }));
  const organizations = useSelector(
    (state) => state.dictionaryStore.dictionary.organizations
  );
  const organizationsForPicker = organizations.map((org) => ({
    id: org.id,
    value: org.name,
    displayValue: org.name,
  }));

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const getDatesToCurrentDisable = ({ date }) => {
    return date <= yesterday;
  };
  useEffect(() => {
    if (!id) {
      dispatch(
        updateHackathon({
          name: "",
          rules: "",
          audience: null,
          type: null,
          description: "",
          start: new Date().toISOString(),
          end: new Date().toISOString(),
          category: null,
          organizations: [],
          admins: null,
        })
      );
    }
    return () => {
      dispatch(clearHackathon());
    };
  }, [id, dispatch]);

  useEffect(() => {
    !!id && dispatch(fetchHackathonById(id));
  }, [id, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const data = {
      ...hackathon,
      start: hackathon.start.toString(),
      end: hackathon.end.toString(),
      [name]: value,
    };
    dispatch(updateHackathon(data));
  };

  const handleAddOrganization = (name, item) => {
    const iSincludes = hackathon.organizations.find((org) => org.id === item.id)
      ? true
      : false;
    const newOrganization = {
      id: item.id,
      name: item.value,
    };
    dispatch(
      updateHackathon({
        ...hackathon,
        organizations: iSincludes
          ? hackathon.organizations
          : [...hackathon.organizations, newOrganization],
      })
    );
  };

  const handleAddFromSelect = (name, item) => {
    const value =
      name === "type" || name === "audience"
        ? item.value
        : { id: item.id, name: item.value };
    dispatch(
      updateHackathon({
        ...hackathon,
        [name]: value,
      })
    );
  };

  const onBageDelete = (id) => {
    const updatedOrganizations = hackathon.organizations.filter(
      (org) => org.id !== id
    );
    const isOrganizationsEmpty = updatedOrganizations.length === 0;
    dispatch(
      updateHackathon({
        ...hackathon,
        organizations: updatedOrganizations,
        isPrivate: !isOrganizationsEmpty,
      })
    );
  };

  const onSaveBtnHandler = async () => {
    const createdHakathon = await dispatch(createHackathon(hackathon));
    navigate(`/hackathon/${createdHakathon.payload.id}/edit`);
  };

  const onUpdateBtnHandler = async () => {
    const updatedHakathon = await dispatch(putHackathon(hackathon));
    navigate(`/hackathon/${updatedHakathon.payload.id}`);
  };

  const onStartDateChange = (date) => {
    const currentDate = new Date(hackathon.start);
    const newStartDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds()
    );
    dispatch(
      updateHackathon({
        ...hackathon,
        end: hackathon.end.toString(),
        start: newStartDate.toString(),
      })
    );
  };
  const onStartTimeChange = (time) => {
    const currentDate = new Date(hackathon.start);
    const newStartDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      time.hour(),
      time.minute(),
      time.second()
    );
    dispatch(
      updateHackathon({
        ...hackathon,
        end: hackathon.end.toString(),
        start: newStartDate.toString(),
      })
    );
  };

  const onEndDateChange = (date) => {
    const currentDate = new Date(hackathon.end);
    const newStartDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds()
    );
    dispatch(
      updateHackathon({
        ...hackathon,
        start: hackathon.start.toString(),
        end: newStartDate.toString(),
      })
    );
  };
  const onEndTimeChange = (time) => {
    const currentDate = new Date(hackathon.end);
    const newStartDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      time.hour(),
      time.minute(),
      time.second()
    );
    dispatch(
      updateHackathon({
        ...hackathon,
        start: hackathon.start.toString(),
        end: newStartDate.toString(),
      })
    );
  };
  !hackathon && <Loading />;
  return (
    <>
      <div className={styles.newHachathonContainer}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>
            {t("NewHachathon.Fill in the hackathon information")}
          </h2>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.name}>
            <label>{t("NewHachathon.Name")}</label>
            <input
              label="Name"
              placeholder={t("NewHachathon.Enter hackathon name")}
              type={"text"}
              name={"name"}
              value={hackathon?.name}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.description}>
            <label>{t("HackathonEditPage.description")}</label>
            <CTextArea
              inner={t("HackathonEditPage.enter-description")}
              type={"text"}
              name={"description"}
              value={hackathon?.description}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.rules}>
            <label>{t("NewHachathon.Rules")}</label>
            <CTextArea
              inner={t("NewHachathon.Enter rules")}
              type={"text"}
              name={"rules"}
              value={hackathon?.rules}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.typeContainer}>
          <div className={styles.prize}>
            <label>{t("NewHachathon.Prize")}</label>
            <input
              label="Prize"
              placeholder={t("NewHachathon.Max amount of rating")}
              type={"number"}
              name={"prize"}
              value={hackathon?.prize || "100"}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.type}>
            <label>{t("NewHachathon.Type")}</label>
            <CDropDown
              name="type"
              items={[
                {
                  id: 1,
                  value: "team",
                  displayValue: `${t("NewHachathon.Team")}`,
                },
                {
                  id: 2,
                  value: "person",
                  displayValue: `${t("NewHachathon.Person")}`,
                },
              ]}
              onChange={handleAddFromSelect}
              placeholder={""}
              value={
                (hackathon?.type &&
                  `${t(`NewHachathon.${hackathon?.type}`)}`) ||
                `${t("NewHachathon.Choose type")}`
              }
            />
          </div>
          <div className={styles.category}>
            <label>{t("NewHachathon.Category")}</label>
            <CDropDown
              name="category"
              items={categoriesForPicker}
              onChange={handleAddFromSelect}
              placeholder={""}
              value={
                (hackathon?.category?.name &&
                  `${t(
                    `HackathonPage.categories.${hackathon?.category?.name}`
                  )}`) ||
                `${t("NewHachathon.Choose category")}`
              }
            />
          </div>
          <div className={styles.audience}>
            <div>
              <label>{t("NewHachathon.Audience")}</label>
              <CDropDown
                name="audience"
                items={[
                  {
                    id: 1,
                    value: "14-18 years, school",
                    displayValue: `${t("NewHachathon.14-18 years, school")}`,
                  },
                  {
                    id: 2,
                    value: "16-23 years, university",
                    displayValue: `${t(
                      "NewHachathon.16-23 years, university"
                    )}`,
                  },
                  {
                    id: 3,
                    value: "no limit, all",
                    displayValue: `${t("NewHachathon.no limit, all")}`,
                  },
                ]}
                onChange={handleAddFromSelect}
                placeholder={""}
                value={
                  (hackathon?.audience &&
                    `${t(`NewHachathon.${hackathon?.audience}`)}`) ||
                  `${t("NewHachathon.Choose audience")}`
                }
              />
            </div>

            <div className={styles.organizationsContainer}>
              <div className={styles.org}>
                <div className={styles.orgInfo}>
                  <label>{t("NewHachathon.Organizations")}</label>
                  <div className={styles.tooltip}>
                    <span>!</span>
                    <span className={styles.text}>
                      {t("NewHachathon.infoOrg")}
                    </span>
                  </div>
                </div>
                <CDropDown
                  name="organization"
                  items={organizationsForPicker}
                  onChange={handleAddOrganization}
                  placeholder={""}
                  value={t("NewHachathon.Choose organizations")}
                />
                <div className={styles.badges}>
                  {hackathon?.organizations.map((org) => (
                    <Badge
                      key={org.id}
                      name={org.name}
                      onDelete={() => onBageDelete(org.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.dateContainer}>
          <div className={styles.startContainer}>
            <span className={styles.inputTitle}>
              {t("NewHachathon.Date/time of hackathon start")}
            </span>
            <Calendar
              className={styles.calendar}
              onDateChange={onStartDateChange}
              getDatesToCurrentDisable={getDatesToCurrentDisable}
              initialDate={
                hackathon?.start ? hackathon.start : new Date().toString()
              }
            />
            {hackathon?.start && (
              <TimePicker
                className={styles.time}
                onChange={onStartTimeChange}
                placeholder={t("NewHachathon.Select time")}
                // defaultOpenValue={moment(hackathon?.start)}
                defaultValue={dayjs(
                  hackathon?.start,
                  "YYYY-MM-DDTHH:mm:ss.SSSZ"
                )}
                format={"HH:mm:ss"}
              />
            )}
          </div>
          <div className={styles.endContainer}>
            <span className={styles.inputTitle}>
              {t("NewHachathon.Date/time of hackathon end")}
            </span>
            <Calendar
              onDateChange={onEndDateChange}
              getDatesToCurrentDisable={getDatesToCurrentDisable}
              initialDate={
                hackathon?.end ? hackathon.end : new Date().toString()
              }
            />
            {hackathon?.end && (
              <TimePicker
                className={styles.time}
                onChange={onEndTimeChange}
                placeholder={t("NewHachathon.Select time")}
                defaultValue={dayjs(hackathon?.end, "YYYY-MM-DDTHH:mm:ss.SSSZ")}
                format={"HH:mm:ss"}
              />
            )}
          </div>
        </div>
        <div className={styles.bntRow}>
          {id ? (
            <MainButton
              caption={t("NewHachathon.UPDATE")}
              onClick={onUpdateBtnHandler}
            />
          ) : (
            <MainButton
              caption={t("NewHachathon.CREATE")}
              onClick={onSaveBtnHandler}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default NewHachathon;
