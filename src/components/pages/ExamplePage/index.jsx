import { useState } from 'react';
import CCheckbox from '../../CustomCheckbox';

const ExamplePage = () => {
  const [checked, setChecked] = useState(false);
  const handleChackbox = (checked) => {
    setChecked(checked);
  };
  return (
    <div>
      <CCheckbox label="I agree to the terms and conditions" checked={checked} onChange={handleChackbox} />
    </div>
  );
};

export default ExamplePage;