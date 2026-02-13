import React, { useState } from 'react';
import { Card, Table, Row, Col, Button, Input, Typography, Space, Collapse } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Panel } = Collapse;

// Sample BOX_ID counts data
const boxIdData = [
  { key: 1, BOX_ID: 'TOTE_DESTACKER', CNT: 1 },
  { key: 2, BOX_ID: 'ZBOX1', CNT: 155 },
  { key: 3, BOX_ID: 'ZBOX2', CNT: 26 },
  { key: 4, BOX_ID: 'ZBOX3', CNT: 16 },
  { key: 5, BOX_ID: 'ZBOX4', CNT: 36 },
  { key: 6, BOX_ID: 'ZBOX5', CNT: 35 },
  { key: 7, BOX_ID: 'ZBOX6', CNT: 9 },
  { key: 8, BOX_ID: 'ZBOX7', CNT: 1 },
  { key: 9, BOX_ID: 'ZBOX8', CNT: 1 },
];

// Sample LPN data grouped by BOX_ID
const generateLpnDataByBox = () => {
  const boxes = ['TOTE_DESTACKER', 'ZBOX1', 'ZBOX2', 'ZBOX3', 'ZBOX4', 'ZBOX5', 'ZBOX6', 'ZBOX7', 'ZBOX8'];
  const data = {};

  boxes.forEach((box) => {
    const count = boxIdData.find(b => b.BOX_ID === box)?.CNT || 0;
    data[box] = Array.from({ length: Math.min(count, 10) }, (_, i) => ({
      key: `${box}-${i}`,
      LPN: `CA30035${Math.floor(Math.random() * 90000 + 10000)}`,
      ZONE_CONCAT: `Zone ${Math.floor(Math.random() * 10 + 1)}`,
      LAST_HOST_UPD: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    }));
  });

  return data;
};

// Sample WES_LIST config data
const configData = [
  { key: 1, LTYPE: 'COMBI_BOX', PNAME: 'ENABLED', DESC: 'Enable COMBI Box processing', VAL: true },
  { key: 2, LTYPE: 'COMBI_BOX', PNAME: 'MAX_WEIGHT', DESC: 'Maximum weight for COMBI', VAL: false },
];

const XpakStation = () => {
  const [loading, setLoading] = useState(false);
  const [lpnInput, setLpnInput] = useState('');
  const [stano] = useState('99');
  const [lpnDataByBox] = useState(generateLpnDataByBox);
  const [selectedBox, setSelectedBox] = useState(null);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const handleAction = (action) => {
    console.log(`Action: ${action}, LPN: ${lpnInput}`);
  };

  const boxColumns = [
    {
      title: 'BOX_ID',
      dataIndex: 'BOX_ID',
      key: 'BOX_ID',
      render: (text) => <Text style={{ color: '#1890ff', cursor: 'pointer' }}>{text}</Text>
    },
    { title: 'CNT', dataIndex: 'CNT', key: 'CNT', align: 'right' },
  ];

  const lpnColumns = [
    { title: '', dataIndex: 'checkbox', key: 'checkbox', width: 40, render: () => <input type="checkbox" /> },
    { title: 'LPN', dataIndex: 'LPN', key: 'LPN', width: 150 },
    { title: 'ZONE_CONCAT', dataIndex: 'ZONE_CONCAT', key: 'ZONE_CONCAT', width: 150 },
    { title: 'LAST_HOST_UPD', dataIndex: 'LAST_HOST_UPD', key: 'LAST_HOST_UPD', width: 200 },
  ];

  const configColumns = [
    { title: '#', dataIndex: 'key', key: 'key', width: 40 },
    { title: 'PNAME', dataIndex: 'PNAME', key: 'PNAME' },
    { title: 'DESC', dataIndex: 'DESC', key: 'DESC' },
    { title: 'VAL', dataIndex: 'VAL', key: 'VAL', render: (val) => val ? 'Yes' : 'No' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 65px - 52px)' }}>
      {/* Page Toolbar */}
      <div className="page-toolbar">
        <Title level={4} className="page-title" style={{ margin: 0 }}>
          XPAK Station
        </Title>
        <div style={{ flex: 1 }} />
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={handleRefresh}
          loading={loading}
        >
          Refresh
        </Button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: 16, overflow: 'auto', background: '#f4f4f4' }}>
        <Row gutter={[16, 16]}>
          {/* Left Panel - BOX_ID Counts */}
          <Col xs={24} md={6}>
            <Card title="XPAK Station" size="small" bodyStyle={{ padding: 0 }}>
              <Table
                columns={boxColumns}
                dataSource={boxIdData}
                size="small"
                pagination={false}
                onRow={(record) => ({
                  onClick: () => setSelectedBox(record.BOX_ID),
                  style: { cursor: 'pointer', background: selectedBox === record.BOX_ID ? 'rgba(0,51,102,0.1)' : undefined }
                })}
              />
            </Card>
          </Col>

          {/* Center Panel - Config and Inputs */}
          <Col xs={24} md={10}>
            <Row gutter={[16, 16]}>
              {/* Config Table */}
              <Col span={24}>
                <Card size="small">
                  <Collapse ghost defaultActiveKey={['1']}>
                    <Panel header={<Text style={{ color: '#1890ff' }}>LTYPE: COMBI_BOX</Text>} key="1">
                      <Table
                        columns={configColumns}
                        dataSource={configData}
                        size="small"
                        pagination={false}
                      />
                    </Panel>
                  </Collapse>
                </Card>
              </Col>

              {/* LPN Input */}
              <Col span={16}>
                <Card size="small">
                  <Text strong>LPN:</Text>
                  <Input
                    value={lpnInput}
                    onChange={(e) => setLpnInput(e.target.value)}
                    placeholder="Scan or enter LPN"
                    style={{ marginTop: 8 }}
                    size="large"
                  />
                </Card>
              </Col>

              {/* STANO Display */}
              <Col span={8}>
                <Card size="small">
                  <Text strong>STANO:</Text>
                  <div style={{
                    marginTop: 8,
                    border: '1px solid #d9d9d9',
                    padding: '8px 16px',
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    background: '#fafafa'
                  }}>
                    {stano}
                  </div>
                </Card>
              </Col>

              {/* Action Buttons */}
              <Col span={24}>
                <Card size="small">
                  <Space wrap>
                    <Button onClick={() => handleAction('reset')}>LPN Reset (F1)</Button>
                    <Button onClick={() => handleAction('print')}>Manual Print (F2)</Button>
                    <Button onClick={() => handleAction('printValidate')}>Manual Print With Validation (F3)</Button>
                    <Button onClick={() => handleAction('toteAssign')}>Tote Assign (F4) (C-T)</Button>
                  </Space>
                </Card>
              </Col>
            </Row>
          </Col>

          {/* Right Panel - LPN List by BOX_ID */}
          <Col xs={24} md={8}>
            <Card
              title="LPN Release View"
              size="small"
              bodyStyle={{ padding: 0, maxHeight: 500, overflow: 'auto' }}
            >
              <Collapse accordion>
                {Object.keys(lpnDataByBox).map((boxId) => (
                  <Panel
                    header={<Text style={{ color: '#1890ff' }}>BOX_ID: {boxId}</Text>}
                    key={boxId}
                  >
                    <Table
                      columns={lpnColumns}
                      dataSource={lpnDataByBox[boxId]}
                      size="small"
                      pagination={false}
                      scroll={{ y: 200 }}
                    />
                  </Panel>
                ))}
              </Collapse>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default XpakStation;
