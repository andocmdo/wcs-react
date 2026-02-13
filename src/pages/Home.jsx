import React from 'react';
import { Card, Row, Col, Statistic, Typography } from 'antd';
import {
  DatabaseOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div className="page-content">
      <Title level={3} style={{ color: '#003366', marginBottom: 24 }}>
        WCS Dashboard - Home
      </Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Scans Today"
              value={12847}
              prefix={<DatabaseOutlined />}
              valueStyle={{ color: '#003366' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Successful"
              value={12654}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending"
              value={156}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Exceptions"
              value={37}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 24 }}>
        <Title level={4}>Quick Links</Title>
        <Paragraph>
          Welcome to the WCS (Warehouse Control System) Dashboard. Use the navigation menu above
          to access different modules:
        </Paragraph>
        <ul>
          <li><strong>Log</strong> - View WES transaction logs with filtering and search</li>
          <li><strong>XPak Station</strong> - Manage XPAK release and station operations</li>
          <li><strong>Dashboard</strong> - Access various dashboard reports (XPAK, LPN Lookup, Realtime)</li>
          <li><strong>Setup</strong> - Configure system settings</li>
        </ul>
      </Card>
    </div>
  );
};

export default Home;
