import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Table, Row, Col, Button, Typography, Statistic, Space } from 'antd';
import { ReloadOutlined, ExportOutlined, SettingOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// Sample XPAK data
const generateXpakData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    key: i,
    LPN: `CA30035897${55 + i}`,
    XPAK_NUMBER: `XPAK${Math.floor(Math.random() * 2) + 1}`,
    XPAK_RELEASE_DTE: new Date(Date.now() - Math.random() * 86400000).toLocaleString(),
    XPAK_PRINT_DTE: new Date(Date.now() - Math.random() * 86400000).toLocaleString(),
    XPAK_VAL_DTE: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 86400000).toLocaleString() : '',
    XPAK_RESET_DTE: '',
    XPAK_RESET_CNT: 0,
  }));
};

// Sample LPNs Per Day data
const lpnsPerDayData = [
  { key: 1, DTE: '2/12/2026', CNT_MAX: '1.68K', BOX_ID: 'ZBOX1', CNT_SUM: 24 },
  { key: 2, DTE: '2/11/2026', CNT_MAX: '4.74K', BOX_ID: 'ZBOX2', CNT_SUM: 1 },
  { key: 3, DTE: '2/10/2026', CNT_MAX: '5.02K', BOX_ID: 'ZBOX3', CNT_SUM: 4 },
  { key: 4, DTE: '2/9/2026', CNT_MAX: '5.3K', BOX_ID: 'ZBOX4', CNT_SUM: 10 },
  { key: 5, DTE: '2/6/2026', CNT_MAX: '4.79K', BOX_ID: 'ZBOX5', CNT_SUM: 4 },
];

// Sample Message Status data
const messageStatusData = [
  { key: 1, SHORT_DESC: 'COMBI Ready', LAST_DTE: '11/10/2025 7:01:17 AM' },
  { key: 2, SHORT_DESC: 'Lantech Ready', LAST_DTE: '2/12/2026 11:53:53 AM' },
  { key: 3, SHORT_DESC: 'TOTE_READY', LAST_DTE: '2/12/2026 11:29:59 AM' },
  { key: 4, SHORT_DESC: 'XPAK 1 Ready', LAST_DTE: '2/12/2026 11:53:47 AM' },
  { key: 5, SHORT_DESC: 'XPAK 2 Ready', LAST_DTE: '2/12/2026 11:53:51 AM' },
];

const Dashboard = () => {
  const { reportId } = useParams();
  const [loading, setLoading] = useState(false);
  const [xpakData] = useState(generateXpakData);

  const reportTitle = reportId
    ? reportId.replace(/-/g, ' ').toUpperCase()
    : 'XPAK';

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const xpakColumns = [
    { title: 'LPN', dataIndex: 'LPN', key: 'LPN', width: 140 },
    { title: 'XPAK Number', dataIndex: 'XPAK_NUMBER', key: 'XPAK_NUMBER', width: 120 },
    { title: 'XPAK_RELEASE_DTE', dataIndex: 'XPAK_RELEASE_DTE', key: 'XPAK_RELEASE_DTE', width: 180 },
    { title: 'XPAK_PRINT_DTE', dataIndex: 'XPAK_PRINT_DTE', key: 'XPAK_PRINT_DTE', width: 180 },
    { title: 'XPAK_VAL_DTE', dataIndex: 'XPAK_VAL_DTE', key: 'XPAK_VAL_DTE', width: 180 },
    { title: 'XPAK_RESET_DTE', dataIndex: 'XPAK_RESET_DTE', key: 'XPAK_RESET_DTE', width: 180 },
    { title: 'XPAK_RESET_CNT', dataIndex: 'XPAK_RESET_CNT', key: 'XPAK_RESET_CNT', width: 120 },
  ];

  const lpnsPerDayColumns = [
    { title: 'DTE', dataIndex: 'DTE', key: 'DTE' },
    { title: 'CNT (Max)', dataIndex: 'CNT_MAX', key: 'CNT_MAX' },
  ];

  const relNotValColumns = [
    { title: 'BOX_ID', dataIndex: 'BOX_ID', key: 'BOX_ID' },
    { title: 'CNT (Sum)', dataIndex: 'CNT_SUM', key: 'CNT_SUM' },
  ];

  const messageStatusColumns = [
    { title: 'SHORT_DESC', dataIndex: 'SHORT_DESC', key: 'SHORT_DESC' },
    { title: 'LAST_DTE', dataIndex: 'LAST_DTE', key: 'LAST_DTE' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 65px - 52px)' }}>
      {/* Page Toolbar */}
      <div className="page-toolbar">
        <Title level={4} className="page-title" style={{ margin: 0 }}>
          Dashboard
        </Title>
        <div style={{ flex: 1 }} />
        <Space>
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            loading={loading}
          >
            Refresh
          </Button>
        </Space>
      </div>

      {/* Dashboard Content */}
      <div style={{ flex: 1, padding: 16, overflow: 'auto', background: '#f4f4f4' }}>
        <Row gutter={[16, 16]}>
          {/* Main XPAK Table */}
          <Col span={16}>
            <Card
              title={reportTitle}
              size="small"
              extra={<Space><ExportOutlined /><SettingOutlined /></Space>}
            >
              <Table
                columns={xpakColumns}
                dataSource={xpakData}
                loading={loading}
                size="small"
                scroll={{ x: 1000, y: 400 }}
                pagination={{ pageSize: 10, size: 'small' }}
              />
            </Card>
          </Col>

          {/* Right Side Panels */}
          <Col span={8}>
            <Row gutter={[16, 16]}>
              {/* LPNs Per Day */}
              <Col span={24}>
                <Card title="LPNs Per Day" size="small">
                  <Table
                    columns={lpnsPerDayColumns}
                    dataSource={lpnsPerDayData}
                    size="small"
                    pagination={false}
                    scroll={{ y: 150 }}
                  />
                </Card>
              </Col>

              {/* REL NOT VAL */}
              <Col span={24}>
                <Card title="REL NOT VAL" size="small">
                  <Table
                    columns={relNotValColumns}
                    dataSource={lpnsPerDayData}
                    size="small"
                    pagination={false}
                    scroll={{ y: 150 }}
                  />
                </Card>
              </Col>

              {/* Message Status */}
              <Col span={24}>
                <Card title="Message Status" size="small">
                  <Table
                    columns={messageStatusColumns}
                    dataSource={messageStatusData}
                    size="small"
                    pagination={false}
                    scroll={{ y: 150 }}
                  />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
