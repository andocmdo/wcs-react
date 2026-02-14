import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  TableOutlined,
  DashboardOutlined,
  SettingOutlined,
  FileTextOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import logo from '../assets/TD_SYNNEX_logo_file.png';

const { Header } = Layout;

const AppNavigation = () => {
  const location = useLocation();

  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.startsWith('/log')) return 'log';
    if (path.startsWith('/xpak-station')) return 'xpak-station';
    if (path.startsWith('/reject-station')) return 'reject-station';
    if (path.startsWith('/dashboard')) return 'dashboard';
    if (path.startsWith('/setup')) return 'setup';
    return 'home';
  };

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: 'reject-station',
      icon: <AppstoreOutlined />,
      label: <Link to="/reject-station">Reject Station</Link>,
    },
    {
      key: 'xpak-station',
      icon: <AppstoreOutlined />,
      label: <Link to="/xpak-station">XPak Station</Link>,
    },
    {
      key: 'setup',
      icon: <SettingOutlined />,
      label: 'Setup',
      children: [
        { key: 'setup-general', label: <Link to="/setup/general">General</Link> },
        { key: 'setup-scanners', label: <Link to="/setup/scanners">Scanners</Link> },
        { key: 'setup-diverters', label: <Link to="/setup/diverters">Diverters</Link> },
      ],
    },
    {
      key: 'log',
      icon: <FileTextOutlined />,
      label: <Link to="/log">Log</Link>,
    },
    {
      key: 'manual-lpn',
      icon: <TableOutlined />,
      label: <Link to="/manual-lpn">Manual LPN</Link>,
    },
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      children: [
        { key: 'dashboard-xpak', label: <Link to="/dashboard/xpak">XPAK</Link> },
        { key: 'dashboard-lpn-lookup', label: <Link to="/dashboard/lpn-lookup">LPN Lookup</Link> },
        { key: 'dashboard-realtime', label: <Link to="/dashboard/realtime">Realtime</Link> },
      ],
    },
  ];

  return (
    <Header className="app-header">
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <img src={logo} alt="TD SYNNEX Logo" style={{ height: '65px', marginRight: '20px' }} />
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          className="header-menu"
        />
      </div>
    </Header>
  );
};

export default AppNavigation;
