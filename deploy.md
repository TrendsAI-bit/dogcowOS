# Deployment Instructions

## Vercel Deployment (Recommended)

### Option 1: Automatic Deployment via GitHub

1. Go to [Vercel](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your `dogcowOS` repository from GitHub
5. Configure the project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click "Deploy"

Your application will be automatically deployed and you'll get a live URL.

### Option 2: Manual Deployment via CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from the project directory:
```bash
vercel --prod
```

## Local Development

To run the project locally:

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:3000`

## Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Features Included

✅ **macOS Ventura Interface**: Complete with menu bar, dock, and desktop
✅ **Clarus the DogCow**: Interactive AI companion with multiple moods
✅ **Chat Interface**: Talk to Clarus with voice recognition support
✅ **Interactive Games**: Memory match, clicker game, and DogCow trivia
✅ **Sound Effects**: Authentic "moof" sounds
✅ **Multiple Themes**: Various wallpaper options
✅ **Responsive Design**: Works on desktop and mobile
✅ **TypeScript**: Full type safety
✅ **Modern Stack**: React 18 + Vite + Tailwind CSS + Framer Motion

## Repository

GitHub: https://github.com/TrendsAI-bit/dogcowOS

The project is ready for deployment to Vercel! 🚀
