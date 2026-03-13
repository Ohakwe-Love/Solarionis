# Solarionis Frontend (React + Vite)

Frontend application for public pages, user dashboard, wallet operations, and admin panel.

## Requirements

- Node.js 20+
- npm

## Setup

1. Install dependencies:
```bash
npm install
```
2. Create env file:
```bash
cp .env.example .env
```
3. Configure API base URL:
```env
VITE_API_BASE_URL=http://localhost:8000
```
4. Start dev server:
```bash
npm run dev
```

Default local app URL:

- `http://localhost:5173`

## Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run lint` - eslint checks
- `npm run preview` - preview production build

## Notes

- User and admin tokens are attached to API requests via Bearer auth.
- Wallet page supports both deposit creation and withdrawal request flows.
- Admin deposits/withdrawals pages support server-side pagination.
