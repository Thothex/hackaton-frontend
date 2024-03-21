import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { clearHackathon, createHackathon, fetchHackathonById, putHackathon, updateHackathon } from "@/redux/features/hackathonsSlice";
import { useNavigate } from "react-router-dom";

dayjs.extend(customParseFormat);
const NewHachathon = ({id}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // TODO сделать справочник организаций ручку GET
  // TODO сделать справочник организаций ручку POST, DELETE

  const hackathon = useSelector((state) => state.hackathons.hackathon);
  
  useEffect(() => {
    if (!id) {
      dispatch(updateHackathon(
        {
          name: '',
          rules: '',
          audience: null,
          type: null,
          description: '',
          start: new Date().toString(),
          end: new Date().toString(),
          category: null,
          organizations:[],
          admins: null,
          isPrivate: false,
        }
      ))
    }
    return (() => {
      dispatch(clearHackathon())
   })
  }, [id]);

  useEffect(() => {
    !!id && dispatch(fetchHackathonById(id))
  }, [id, dispatch])
  

  const [onlyOrganizations, setOnlyOrganizations] = useState(false)


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const data = {
      ...hackathon,
      start: hackathon.start.toString(),
      end: hackathon.end.toString(),
      [name]: value
    }
    dispatch(updateHackathon(data))
  };

  const handleAddOrganization = (name, item) => {
    const iSincludes = hackathon.organizations.find((org) => org.id === item.id) ? true : false
    dispatch(updateHackathon({
      ...hackathon,
      organizations: iSincludes ? hackathon.organizations : [...hackathon.organizations, item]
    }))
  }

  const handleAddFromSelect = (name, item) => {
    console.log(name, item)
    const value = (name === 'type' || name === 'audience') ? item.value : {id: item.id, name: item.value}
    console.log('value',value)
    dispatch(updateHackathon({
      ...hackathon,
      [name]: value,
    }))
  }
  
  const handleOnlyOrganizations = () => {
    setOnlyOrganizations(!onlyOrganizations)
  }

  const onBageDelete = (id) => {
    dispatch(updateHackathon({
      ...hackathon,
      organizations: [...hackathon.organizations.filter((org) => org.id !== id)]
    }))
  }

  const onSaveBtnHandler = async () => {
    console.log(hackathon)
    const createdHakathon = await dispatch(createHackathon(hackathon))
    console.log(createdHakathon)
    navigate(`/hackathon/${createdHakathon.payload.id}`)
  }

  const onUpdateBtnHandler = async () => {
    const updatedHakathon = await dispatch(putHackathon(hackathon))
    // console.log(updatedHakathon)
    navigate(`/hackathon/${updatedHakathon.payload.id}`)
  }

  const onStartDateChange = (date) => {

    const currentDate = new Date(hackathon.start);
    const newStartDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds()
  ).toString();
    dispatch(updateHackathon({
      ...hackathon,
      end: hackathon.end.toString(),
      start: newStartDate
    }))
  }
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
    dispatch(updateHackathon({
      ...hackathon,
      end: hackathon.end.toString(),
      start: newStartDate.toString()
    }));
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
    ).toString();
    dispatch(updateHackathon({
      ...hackathon,
      start: hackathon.start.toString(),
      end: newStartDate.toString()
    }))
  }
  const onEndTimeChange = (time) => {
    const newStartDate = new Date(
        hackathon.end.getFullYear(),
        hackathon.end.getMonth(),
        hackathon.end.getDate(),
        time.hour(),
        time.minute(),
        time.second()
    ).toString();
    dispatch(updateHackathon({
        ...hackathon,
        start: hackathon.start.toString(),
        end: newStartDate.toString()
    }))
  };
  !hackathon && <div>Loading...</div> 
  return (
    <div className={styles.newHackContainer}>
      <div className={styles.newHachathonWrapper}>
        <div className={styles.newHachathonWrapperCol}>
          <AuthInput
            label='Hackathon name'
            inner='Придумайте название хакатона'
            type={'text'}
            name={'name'}
            value={hackathon?.name}
            onChange={handleInputChange} />
          <CTextArea
            label='Hackathon description'
            inner='Введите описание хакатона'
            type={'text'}
            name={'description'}
            value={hackathon?.description}
            onChange={handleInputChange} />
          <CTextArea
            label='Hackathon rules'
            inner='Правила'
            type={'text'}
            name={'rules'}
            value={hackathon?.rules}
            onChange={handleInputChange} />
          
          <CDropDown
            name='type'
            items={[{ id: 1, value: 'Командный' }, { id: 2, value: 'Индивидуальный' }]}
            onChange={handleAddFromSelect}
            placeholder={'Выберите тип хакатона'}
            value={hackathon?.type || 'Тип'}
          />
          <CDropDown
            name='category'
            items={[{ id: 1, value: 'Химия' }, { id: 2, value: 'JS' }, { id: 3, value: 'всё еще JS' }]}
            onChange={handleAddFromSelect}
            placeholder={'Выберите категорию'}
            value={hackathon?.category?.name || 'Категории'}
          />
          <CDropDown
            name='audience'
            items={[{ id: 1, value: '14 - 18 years, school' }, { id: 2, value: '16-23 years, Univercity' }, { id: 3, value: 'no limit, all' }]}
            onChange={handleAddFromSelect}
            placeholder={'Выберите аудиторию'}
            value={hackathon?.audience || 'Аудитория'}
          />
      
        </div>
        <div className={styles.newHachathonWrapperCol}>
          <span className={styles.inputTitle}>Дата/время начала хакатона</span>
          <div className={styles.dateTimeContainer}>
            <Calendar onDateChange={onStartDateChange} initialDate={hackathon?.start ? hackathon.start : new Date().toString()} />
            <TimePicker onChange={onStartTimeChange} defaultOpenValue={dayjs(hackathon?.start || '00:00:00', 'HH:mm:ss')} format={'HH:mm:ss'} />
          </div>
          <span className={styles.inputTitle}>Дата/время окончания хакатона</span>
          <div className={styles.dateTimeContainer}>
            <Calendar onDateChange={onEndDateChange} initialDate={hackathon?.end ? hackathon.end : new Date().toString()}/>
            <TimePicker onChange={onEndTimeChange} defaultOpenValue={dayjs(hackathon?.start || '00:00:00', 'HH:mm:ss')} format={'HH:mm:ss'} />
          </div>
        </div>
        <div className={styles.newHachathonWrapperCol}>
          <CCheckbox label="Avaliable only for organizations" checked={onlyOrganizations} onChange={handleOnlyOrganizations} />
          {onlyOrganizations &&
            <>
              <CDropDown
                name='organization'
                items={[{ id: 1, name: 'Барсы' }, { id: 2, name: 'Медведи' }, { id: 3, name: 'Эльбрусы' }, { id: 4, name: 'Молодцы — орлы' }]}
                onChange={handleAddOrganization}
                placeholder={'Выберите организацию'}
                value={'Добавить организацию'}
              />
              <div className={styles.badges}>
              { hackathon?.organizations.map((org) => (
                  <Badge key={org.id} name={org.value} onDelete={()=>onBageDelete(org.id)} />
                  ))}
              </div>
            </>
          }
        </div>
        
      </div>
      <div className={styles.bntRow}>
        {id
          ? <MainButton caption={'Update'} onClick={onUpdateBtnHandler} />
          : <MainButton caption={'Create'} onClick={onSaveBtnHandler} />
        }
      </div>
    </div>
  );
};

export default NewHachathon;