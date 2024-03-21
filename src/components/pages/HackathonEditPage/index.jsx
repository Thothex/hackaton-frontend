import NewHachathon from '@/components/NewHachathon';
import { useParams } from 'react-router-dom';

const HackathonEditPage = () => {
  const { id } = useParams();
  console.log('id',id);
  return (
    <NewHachathon id={id} />
  );
};

export default HackathonEditPage;