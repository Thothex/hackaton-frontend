import { useState } from "react";
import CDropDown from "../CDropDown";
import AuthInput from "../CAuthInput";
import styles from './styles.module.scss';
const NewHachathon = () => {
  const [hackathon, setHackathon] = useState(
    {
      name: '',
      description: '',
      start: null,
      end: null,
      category: null,
      organization:null,
      admins:null
    });
  
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
  return (
    <div className={styles.newHachathonWrapper}>
      <AuthInput
        label='Hackathon name'
        inner='Придумайте название хакатона'
        type={'text'}
        name={'name'}
        value={hackathon.name}
        onChange={handleInputChange} />
      <CDropDown
        name='category'
        items={[{ id: 1, value: 'Значение 1' }, { id: 2, value: 'Значение 2' }, { id: 3, value: 'Значение 3' }]}
        onChange={handleFieldChange}
        placeholder={'Выберите категорию'}
        value={hackathon.category || 'Категории'}
      />
    </div>
  );
};

export default NewHachathon;