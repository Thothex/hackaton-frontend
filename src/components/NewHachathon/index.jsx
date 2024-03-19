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
      start: null,
      end: null,
      category: null,
      organizations:[],
      admins:null
    });
  const [onlyOrganizations, setOnlyOrganizations] = useState(false)

  const [startTime, setStartTime] = useState(null)
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
    console.log('date', date['$H'])
    setHackathon({
      ...hackathon,
      start: date
    })
  }
  const onStartTimeChange = (time, timeString) => {
    setStartTime(time)
    console.log(time['$d'], timeString);
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
          <Calendar onDateChange={onStartDateChange} />
          <TimePicker onChange={onStartTimeChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} format={'HH:mm:ss'} />
          {startTime && (
        <div>
          <p>Часы: {startTime.format('HH')}</p>
          {/* <p>Минуты: {startTime.minutes()}</p>
          <p>Секунды: {startTime.seconds()}</p> */}
        </div>
      )}
        </div>
      </div>
      <div className={styles.bntRow}>
        <MainButton caption={'Create'} onClick={onSaveBtnHandler} />
      </div>
    </div>
  );
};

export default NewHachathon;