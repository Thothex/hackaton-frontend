import { useState } from 'react';
import CCheckbox from '../../CustomCheckbox';
import CDropDown from '@/components/CDropDown';

const ExamplePage = () => {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState('Категории');
  const handleChackbox = (checked) => {
    setChecked(checked);
  };
  const ddHandleChange = (item) => {
    setValue(item.value);
  };
  return (
    <div>
      <CCheckbox label="I agree to the terms and conditions" checked={checked} onChange={handleChackbox} />
      <CDropDown
        items={[{ id: 1, value: 'Значение 1' }, { id: 2, value: 'Значение 2' }, { id: 3, value: 'Значение 3' }]}
        onChange={ddHandleChange}
        placeholder={'Выберите категорию'}
        value={value}
      />
    </div>
  );
};

export default ExamplePage;