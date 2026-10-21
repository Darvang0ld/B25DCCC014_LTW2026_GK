import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ loading, error }) => {
  const renderContent = () => {
    if (loading) return <p>Đang tải...</p>;
    if (error) return <p className="error">{error}</p>;
    return <Outlet />;
  };

  return (
    <div>
      <NavBar />
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default Layout;