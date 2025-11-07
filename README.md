# Services Hub

React application combining the Dr. Ray services dashboard and medical records request form.

## Tech Stack
- React 19
- Vite (build tool)
- Tailwind CSS
- React Router DOM
- Lucide React (icons)

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Routes
- `/` - Services dashboard (landing page)
- `/records` - Medical records request form

## Deployment

Deployed via AWS Amplify with automatic builds on push to `main`.

**Build command**: `npm run build`
**Output directory**: `dist`

## Features

### Services Dashboard
- Navigation hub for all Dr. Ray applications
- Links to Fax Viewer, Document Generator, RabbitSign, Patient Communications
- Internal routing to Records Request

### Records Request
- Patient search via Make.com/Airtable API
- Auto-populate form fields from search results
- Manual form input supported
- Generates Fillout.com URL with pre-filled parameters
- Copy to clipboard functionality

## API Integration

**Make.com Search API**:
- Endpoint: `https://hook.us2.make.com/krhoot7d1vkdghc02i127pz990rmtg8e`
- Auth: API key in `x-make-apikey` header
- Returns patient records from Airtable

**Fillout Form**: `https://drjuliaray.fillout.com/t/uxQBKJHWkyus`

## Security Note

API credentials are client-side exposed (visible in browser). For production use with sensitive data, consider proxying through Lambda to protect credentials.
