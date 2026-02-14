import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout, ConfigProvider, Typography } from 'antd';
import { wcsTheme } from './styles/theme';
import AppNavigation from './components/AppNavigation';
import WesLog from './pages/WesLog';
import Dashboard from './pages/Dashboard';
import XpakStation from './pages/XpakStation';
import Home from './pages/Home';
import './styles/App.css';

const { Content, Footer } = Layout;
const { Text } = Typography;

function App() {
  return (
    <ConfigProvider theme={wcsTheme}>
      <Router>
        <Layout className="app-layout">
          <AppNavigation />

          <Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/log" element={<WesLog />} />
              <Route path="/xpak-station" element={<XpakStation />} />
              <Route path="/reject-station" element={<XpakStation />} />
              <Route path="/manual-lpn" element={<WesLog />} />
              <Route path="/dashboard/:reportId" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/setup/*" element={<Home />} />
            </Routes>
          </Content>

          <Footer className="app-footer">
            <Text style={{ color: '#003366' }}>
              &copy; 2026 TD Synnex. All rights reserved.
            </Text>
          </Footer>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
