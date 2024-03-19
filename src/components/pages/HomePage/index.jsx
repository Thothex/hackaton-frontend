import {useSelector} from 'react-redux'

const HomePage = () => {
  const user = useSelector((state) => state.userStore.userInfo)
  return (
    <div>
      <h1>Home Page</h1>
      { user &&
          <div>{user.username}</div>
      }
    </div>
  );
};

export default HomePage;