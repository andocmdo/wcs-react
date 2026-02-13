import React, { useState, useMemo } from 'react';
import { Table, Input, Button, Space, Card, Typography, Select, Row, Col } from 'antd';
import { ReloadOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// Sample data matching the legacy WES_LOG table structure
const generateSampleData = () => {
  const shortDescs = ['OUTBOUND', 'INBOUND', 'WES to PLC ACK: ^ROUTE', 'SCAN', 'LANE', 'REJECT'];
  const msgTypes = ['LANE', 'ACK', 'SCAN', 'WES', '0'];
  const types = ['SCAN', 'ACK', 'OUTBOUND', ''];

  return Array.from({ length: 100 }, (_, i) => ({
    key: i,
    INS_DTE: new Date(Date.now() - Math.random() * 86400000 * 3).toLocaleString(),
    SCANNO: Math.floor(Math.random() * 1000 + 8000),
    SHORT_DESC: shortDescs[Math.floor(Math.random() * shortDescs.length)],
    MSG: msgTypes[Math.floor(Math.random() * msgTypes.length)],
    LPN: `CA30035${Math.floor(Math.random() * 90000 + 10000)}`,
    TRACK: Math.floor(Math.random() * 30000 + 29000),
    AUDIT_STA: Math.floor(Math.random() * 2),
    DVT_RESP: Math.floor(Math.random() * 2),
    PE: Math.floor(Math.random() * 2),
    SCAN_STR: `D^${Math.floor(Math.random() * 9000 + 8000)}^ACK^0^`,
    WGT: (Math.random() * 10).toFixed(0),
    DVT_REG: '',
    SEQNO: Math.floor(Math.random() * 30000 + 29000),
    PLC_RESP: '',
    WMS_RESP: '',
    PTL_RESP: '',
    PTR_RESP: '',
    TYPE: types[Math.floor(Math.random() * types.length)],
    GRP: '',
  }));
};

const WesLog = () => {
  const [data] = useState(generateSampleData);
  const [filters, setFilters] = useState({});
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  // Filter options for left sidebar
  const filterOptions = [
    { key: 'All', label: 'All' },
    { key: 'Last5Minutes', label: 'Last 5 Minutes' },
    { key: 'Scans', label: 'Scans' },
    { key: 'Alert', label: 'Alert' },
    { key: 'Exceptions', label: 'Exceptions' },
    { key: 'Dump', label: 'Dump' },
  ];

  // Column filter input renderer
  const getColumnFilterInput = (dataIndex) => (
    <Input
      placeholder="Filter..."
      size="small"
      value={filters[dataIndex] || ''}
      onChange={(e) => setFilters({ ...filters, [dataIndex]: e.target.value })}
      style={{ width: '100%' }}
    />
  );

  // Table columns matching legacy GridView
  const columns = [
    {
      title: 'INS_DTE',
      dataIndex: 'INS_DTE',
      key: 'INS_DTE',
      width: 150,
      fixed: 'left',
      sorter: (a, b) => new Date(a.INS_DTE) - new Date(b.INS_DTE),
      filterDropdown: () => getColumnFilterInput('INS_DTE'),
    },
    {
      title: 'SCANNO',
      dataIndex: 'SCANNO',
      key: 'SCANNO',
      width: 80,
      sorter: (a, b) => a.SCANNO - b.SCANNO,
      filterDropdown: () => getColumnFilterInput('SCANNO'),
    },
    {
      title: 'SHORT_DESC',
      dataIndex: 'SHORT_DESC',
      key: 'SHORT_DESC',
      width: 150,
      filterDropdown: () => getColumnFilterInput('SHORT_DESC'),
    },
    {
      title: 'MSG',
      dataIndex: 'MSG',
      key: 'MSG',
      width: 75,
      filterDropdown: () => getColumnFilterInput('MSG'),
    },
    {
      title: 'LPN',
      dataIndex: 'LPN',
      key: 'LPN',
      width: 130,
      filterDropdown: () => getColumnFilterInput('LPN'),
    },
    {
      title: 'TRACK',
      dataIndex: 'TRACK',
      key: 'TRACK',
      width: 80,
      sorter: (a, b) => a.TRACK - b.TRACK,
      filterDropdown: () => getColumnFilterInput('TRACK'),
    },
    {
      title: 'AUDIT_STA',
      dataIndex: 'AUDIT_STA',
      key: 'AUDIT_STA',
      width: 100,
      filterDropdown: () => getColumnFilterInput('AUDIT_STA'),
    },
    {
      title: 'DVT_RESP',
      dataIndex: 'DVT_RESP',
      key: 'DVT_RESP',
      width: 100,
      filterDropdown: () => getColumnFilterInput('DVT_RESP'),
    },
    {
      title: 'PE',
      dataIndex: 'PE',
      key: 'PE',
      width: 60,
      filterDropdown: () => getColumnFilterInput('PE'),
    },
    {
      title: 'SCAN_STR',
      dataIndex: 'SCAN_STR',
      key: 'SCAN_STR',
      width: 180,
      filterDropdown: () => getColumnFilterInput('SCAN_STR'),
    },
    {
      title: 'WGT',
      dataIndex: 'WGT',
      key: 'WGT',
      width: 70,
      sorter: (a, b) => a.WGT - b.WGT,
      filterDropdown: () => getColumnFilterInput('WGT'),
    },
    {
      title: 'DVT_REG',
      dataIndex: 'DVT_REG',
      key: 'DVT_REG',
      width: 100,
      filterDropdown: () => getColumnFilterInput('DVT_REG'),
    },
    {
      title: 'SEQNO',
      dataIndex: 'SEQNO',
      key: 'SEQNO',
      width: 80,
      sorter: (a, b) => a.SEQNO - b.SEQNO,
      filterDropdown: () => getColumnFilterInput('SEQNO'),
    },
    {
      title: 'PLC_RESP',
      dataIndex: 'PLC_RESP',
      key: 'PLC_RESP',
      width: 100,
      filterDropdown: () => getColumnFilterInput('PLC_RESP'),
    },
    {
      title: 'WMS_RESP',
      dataIndex: 'WMS_RESP',
      key: 'WMS_RESP',
      width: 100,
      filterDropdown: () => getColumnFilterInput('WMS_RESP'),
    },
    {
      title: 'PTL_RESP',
      dataIndex: 'PTL_RESP',
      key: 'PTL_RESP',
      width: 100,
      filterDropdown: () => getColumnFilterInput('PTL_RESP'),
    },
    {
      title: 'TYPE',
      dataIndex: 'TYPE',
      key: 'TYPE',
      width: 80,
      filterDropdown: () => getColumnFilterInput('TYPE'),
    },
    {
      title: 'PTR_RESP',
      dataIndex: 'PTR_RESP',
      key: 'PTR_RESP',
      width: 100,
      filterDropdown: () => getColumnFilterInput('PTR_RESP'),
    },
    {
      title: 'GRP',
      dataIndex: 'GRP',
      key: 'GRP',
      width: 100,
      filterDropdown: () => getColumnFilterInput('GRP'),
    },
  ];

  // Apply filters to data
  const filteredData = useMemo(() => {
    let result = data;

    // Apply column filters
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        result = result.filter((item) =>
          String(item[key]).toLowerCase().includes(filters[key].toLowerCase())
        );
      }
    });

    // Apply search text
    if (searchText) {
      result = result.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }

    // Apply sidebar filter
    if (activeFilter === 'Last5Minutes') {
      const fiveMinAgo = Date.now() - 5 * 60 * 1000;
      result = result.filter((item) => new Date(item.INS_DTE).getTime() > fiveMinAgo);
    } else if (activeFilter === 'Scans') {
      result = result.filter((item) => item.SHORT_DESC === 'SCAN' || item.TYPE === 'SCAN');
    }

    return result;
  }, [data, filters, searchText, activeFilter]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 65px - 52px)' }}>
      {/* Left Sidebar - Filters */}
      <div style={{ width: 200, padding: 16, background: '#fff', borderRight: '1px solid #e8e8e8' }}>
        <Card size="small" title="Filters" bordered={false}>
          <ul className="filter-list">
            {filterOptions.map((opt) => (
              <li
                key={opt.key}
                className={activeFilter === opt.key ? 'active' : ''}
                onClick={() => setActiveFilter(opt.key)}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Page Toolbar */}
        <div className="page-toolbar">
          <Title level={4} className="page-title" style={{ margin: 0 }}>
            WES Log
          </Title>
          <Text className="page-subtitle">-ALL-ALL</Text>
          <div style={{ flex: 1 }} />
          <Space>
            <Input
              placeholder="Enter text to search..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 250 }}
              allowClear
            />
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

        {/* Data Table */}
        <div style={{ flex: 1, padding: 16, overflow: 'auto', background: '#f4f4f4' }}>
          <Table
            className="data-table"
            columns={columns}
            dataSource={filteredData}
            loading={loading}
            size="small"
            scroll={{ x: 1800, y: 'calc(100vh - 300px)' }}
            sticky
            pagination={{
              pageSize: 50,
              showSizeChanger: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              pageSizeOptions: ['25', '50', '100', '200'],
            }}
            rowClassName={(record, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}
          />
        </div>
      </div>
    </div>
  );
};

export default WesLog;
