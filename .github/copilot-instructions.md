# GitHub Copilot Instructions for react-portfolio

## Project Overview
This is a personal portfolio website built with React, TypeScript, Material-UI, and Particle.js. It showcases professional information, projects, and provides an interactive user experience with particle effects and smooth animations.

## Tech Stack
- **Frontend Framework**: React 16.8.1 with TypeScript
- **UI Library**: Material-UI v4.12.4
- **Animation**: Framer Motion v4.1.17
- **Effects**: react-particles-js v2.3.0
- **Routing**: React Router DOM v5.3.4
- **Build Tool**: react-scripts v5.0.1
- **Node Version**: 16.x

## Project Structure
```
/src
  /components     # Reusable React components
    /aboutpage    # About page component
    /buttonlinks  # Social media links component
    /homepage     # Home page component
    /particles    # Particle effects component
  App.tsx         # Main application component with routing
  index.tsx       # Application entry point
  theme.ts        # Material-UI theme configuration
  types.ts        # TypeScript type definitions
```

## Code Style and Conventions

### TypeScript
- Use TypeScript for all new files (`.tsx` for components, `.ts` for utilities)
- Define proper types in `types.ts` for shared interfaces
- Prefer interfaces over type aliases for object shapes
- Use strict type checking (enabled in `tsconfig.json`)

### React Components
- Use functional components with React Hooks
- Use `React.FC<PropsType>` for component type definitions
- Export components using `withStyles` HOC for Material-UI styling
- Component file names should match the component name (e.g., `HomePage.tsx` for `HomePage`)

### Styling
- Use Material-UI's `withStyles` HOC for component-specific styles
- Define styles with the `StylesFunction` type from `types.ts`
- Access theme values through the `theme` parameter in style functions
- Use theme spacing, colors, and typography consistently

### Animation
- Use Framer Motion for page transitions and animations
- Define animation variants outside component functions
- Use `AnimatePresence` for exit animations with `exitBeforeEnter` prop

## Development Commands

### Install Dependencies
```bash
npm ci
```

### Development Server
```bash
npm start
```
Starts the development server at http://localhost:3000

### Build
```bash
npm run build
```
Creates an optimized production build in the `build` directory

### Test
```bash
npm test
```
Runs tests in watch mode using Jest and React Testing Library

### Deploy
```bash
npm run deploy
```
Builds and deploys to GitHub Pages (requires gh-pages package)

## Testing
- Tests are written using Jest and React Testing Library
- Test files should be named `*.test.tsx` or `*.test.ts`
- Place test files next to the components they test
- See `App.test.tsx` for examples

## Important Notes
- This is a portfolio site deployed to GitHub Pages at https://www.sawyerzincone.com/
- The main branch is `master`
- Automatic deployment occurs on push to master via GitHub Actions (`.github/workflows/deploy.yml`)
- The site uses a custom CNAME for the domain

## When Making Changes
1. Ensure TypeScript compilation succeeds without errors
2. Run tests to verify functionality
3. Check that the build completes successfully
4. Maintain consistent styling with Material-UI theme
5. Preserve existing component structure and patterns
6. Test UI changes in the browser to ensure proper rendering and responsiveness
