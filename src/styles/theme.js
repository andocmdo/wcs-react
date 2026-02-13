export const wcsTheme = {
  token: {
    // Primary colors matching TD SYNNEX branding
    colorPrimary: '#003366',
    colorBgLayout: '#f4f4f4',
    colorBgContainer: '#ffffff',

    // Header colors
    colorBgHeader: 'rgb(232, 239, 243)',
    colorTextHeader: '#003366',

    // Menu colors
    colorBgMenu: 'rgb(232, 239, 243)',
    colorTextMenu: '#003366',
    colorItemBg: 'transparent',
    colorItemBgSelected: 'rgba(0, 51, 102, 0.1)',
    colorItemBgHover: 'rgba(0, 51, 102, 0.05)',

    // Border and text
    colorBorder: '#d9d9d9',
    colorText: '#333333',
    colorTextSecondary: '#666666',

    // Font
    fontFamily: 'Arial, sans-serif',
  },
  components: {
    Layout: {
      headerBg: 'rgb(232, 239, 243)',
      headerColor: '#003366',
      headerHeight: 65,
      footerBg: 'rgb(232, 239, 243)',
      footerPadding: '10px 20px',
    },
    Menu: {
      itemBg: 'transparent',
      itemColor: '#003366',
      itemHoverBg: 'rgba(0, 51, 102, 0.05)',
      itemHoverColor: '#003366',
      itemSelectedBg: 'rgba(0, 51, 102, 0.1)',
      itemSelectedColor: '#003366',
      horizontalItemBorderRadius: 0,
    },
    Button: {
      primaryColor: '#ffffff',
      primaryBg: '#003366',
    },
    Table: {
      headerBg: '#f0f0f0',
      headerColor: '#003366',
      rowHoverBg: 'rgba(0, 51, 102, 0.04)',
      borderColor: '#e8e8e8',
    },
  }
};
