# WCS React POC

## Overview
Proof of concept React application replacing the legacy .NET Framework app with DevExpress dashboards. Uses the same design style as WCS-CENTRAL-REPORTING.

## Tech Stack
- React 19
- Ant Design 6 (antd)
- react-router-dom 7 (HashRouter)

## Pages Implemented
1. **Home** (`/`) - Dashboard stats and quick links
2. **WES Log** (`/log`) - Replaces GridView.aspx - main log viewer with 19 columns, sidebar filters, sticky headers
3. **XPak Station** (`/xpak-station`) - Replaces PNA.aspx - BOX_ID management, LPN input, action buttons
4. **Dashboard** (`/dashboard`) - Replaces DashView.aspx - XPAK data with side panels

## Key Features
- TD SYNNEX branded theme (#003366 primary blue)
- Top navbar with dropdown menus
- Information-dense tables with frozen headers
- Column filtering and sorting
- No authentication (POC only - MSAL removed)

## Session Notes (Feb 2026)

### Fixes Applied
1. **Column headers cramped on WES Log** - Adjusted column widths and increased `scroll.x` from 1800 to 2100
2. **Frozen column transparency bug** - Changed hover background from semi-transparent `rgba()` to opaque `#f5f7f9`

## Run Commands
```bash
npm install
npm start
```
Dev server runs at http://localhost:3000
