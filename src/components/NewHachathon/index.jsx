import { useState } from "react";
import CDropDown from "../CDropDown";
import AuthInput from "../CAuthInput";
import styles from './styles.module.scss';
import CTextArea from "../CTextArea";
import CCheckbox from "../CustomCheckbox";
import Badge from "../Badge";
import MainButton from "../MainButton";
import Calendar from "../CCalendar";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimePicker } from 'antd';
import moment from 'moment';

dayjs.extend(customParseFormat);
const NewHachathon = () => {

  // TODO сделать справочник организаций ручку GET
  // TODO сделать справочник организаций ручку POST, DELETE
  const [hackathon, setHackathon] = useState(
    {
      name: '',
      type: null,
      description: '',
      start: new Date(),
      end: new Date(),
      category: null,
      organizations:[],
      admins:null
    });
  const [onlyOrganizations, setOnlyOrganizations] = useState(false)

  const handleFieldChange = (name, item) => {
    setHackathon({...hackathon, [name]: item.value});
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHackathon({
        ...hackathon,
        [name]: value
    });
  };

  const handleAddOrganization = (name, item) => {
    const iSincludes = hackathon.organizations.find((org) => org.id === item.id) ? true : false
    setHackathon({
      ...hackathon,
      organizations: iSincludes ? hackathon.organizations : [...hackathon.organizations, item]
    })
  }
  
  const handleOnlyOrganizations = () => {
    setOnlyOrganizations(!onlyOrganizations)
  }

  const onBageDelete = (id) => {
    setHackathon({
      ...hackathon,
      organizations: [...hackathon.organizations.filter((org) => org.id !== id)]
    })
  }

  const onSaveBtnHandler = () => {
    console.log(hackathon)
  }

  const onStartDateChange = (date) => {

    const newStartDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hackathon.start.getHours(),
      hackathon.start.getMinutes(),
      hackathon.start.getSeconds()
  );
    setHackathon({
      ...hackathon,
      start: newStartDate
    })
  }
  const onStartTimeChange = (time) => {
    const newStartDate = new Date(
        hackathon.start.getFullYear(),
        hackathon.start.getMonth(),
        hackathon.start.getDate(),
        time.hour(),
        time.minute(),
        time.second()
    );
    setHackathon({
        ...hackathon,
        start: newStartDate
    });
  };

  const onEndDateChange = (date) => {

    const newStartDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hackathon.end.getHours(),
      hackathon.end.getMinutes(),
      hackathon.end.getSeconds()
  );
    setHackathon({
      ...hackathon,
      end: newStartDate
    })
  }
  const onEndTimeChange = (time) => {
    const newStartDate = new Date(
        hackathon.end.getFullYear(),
        hackathon.end.getMonth(),
        hackathon.end.getDate(),
        time.hour(),
        time.minute(),
        time.second()
    );
    setHackathon({
        ...hackathon,
        end: newStartDate
    });
  };

  return (
    <div className={styles.newHackContainer}>
      <div className={styles.newHachathonWrapper}>
        <div className={styles.newHachathonWrapperCol}>
          <AuthInput
            label='Hackathon name'
            inner='Придумайте название хакатона'
            type={'text'}
            name={'name'}
            value={hackathon.name}
            onChange={handleInputChange} />
          <CTextArea
            label='Hackathon description'
            inner='Введите описание хакатона'
            type={'text'}
            name={'description'}
            value={hackathon.description}
            onChange={handleInputChange} />
      
          <CDropDown
            name='type'
            items={[{ id: 1, value: 'Командный' }, { id: 2, value: 'Индивидуальный' }]}
            onChange={handleFieldChange}
            placeholder={'Выберите тип хакатона'}
            value={hackathon.type || 'Тип'}
          />
          <CDropDown
            name='category'
            items={[{ id: 1, value: 'Химия' }, { id: 2, value: 'JS' }, { id: 3, value: 'всё еще JS' }]}
            onChange={handleFieldChange}
            placeholder={'Выберите категорию'}
            value={hackathon.category || 'Категории'}
          />
      
        </div>
        <div className={styles.newHachathonWrapperCol}>
          <span className={styles.inputTitle}>Дата/время начала хакатона</span>
          <div className={styles.dateTimeContainer}>
            <Calendar onDateChange={onStartDateChange} />
            <TimePicker onChange={onStartTimeChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} format={'HH:mm:ss'} />
          </div>
          <span className={styles.inputTitle}>Дата/время окончания хакатона</span>
          <div className={styles.dateTimeContainer}>
            <Calendar onDateChange={onEndDateChange} />
            <TimePicker onChange={onEndTimeChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} format={'HH:mm:ss'} />
          </div>
        </div>
        <div className={styles.newHachathonWrapperCol}>
          <CCheckbox label="Avaliable only for organizations" checked={onlyOrganizations} onChange={handleOnlyOrganizations} />
          {onlyOrganizations &&
            <>
              <CDropDown
                name='organization'
                items={[{ id: 1, value: 'Барсы' }, { id: 2, value: 'Медведи' }, { id: 3, value: 'Эльбрусы' }, { id: 4, value: 'Молодцы — орлы' }]}
                onChange={handleAddOrganization}
                placeholder={'Выберите организацию'}
                value={'Добавить организацию'}
              />
              <div className={styles.badges}>
              { hackathon.organizations.map((org) => (
                  <Badge key={org.id} name={org.value} onDelete={()=>onBageDelete(org.id)} />
                  ))}
              </div>
            </>
          }
        </div>
        
      </div>
      <div className={styles.bntRow}>
        <MainButton caption={'Create'} onClick={onSaveBtnHandler} />
      </div>
    </div>
  );
};

export default NewHachathon;