# TMS-Light (v1)

## Testing
`rake rspec` 
* Run all API/rails specs with `--documentation` formatting

## Booting the dev server
`rake start`
* Spins up Foreman with the API on port 3001 and the react app on port 3000 (with watcher for postcss+tailwind)

## Deploying for Production
* must create ENV variable for SECRET_KEY_BASE in order for JWT to function properly

## Misc. Notes
* Due to some limitations with Tailwind/PostCSS + create-react-app, modify CSS in /client/src/styles/src/ folder (they will compile to /client/src/styles/ root)

## Todo
* ensure css lump is minizmized upon production deploy
* consider changing Private/PublicRoute's auth check to come from auth on state (which will ONLY set when valid token) rather than local storage (initially having trouble due to async nature of the state setting)
* Figure out how to properly route the catch all or '/' redirect to login appropriately with my Route HOCs
* better error handling in auth actions
* There is some race condition getting weird between my reAuth on index.js and manual type of /logout route
* Test my API User model/controller a bit more (validations + no same user)
* Look at the hacky way I'm using token in AUTH ACTION handleUserLogin() => shared action handleGetInitialData() => api getInitialData() => individual API calls
* * I wanted to pull it straight from local storage in the API service library, but that doesn't work with the asynchronous nature of the signin
* * This means I'm going to have to pass a token in for every request as such, or they will fail unless the page was mounted on a refresh due to the handle reAuth being able to call from token directly

## Resources
* Initial project created similar in structure to the Heroku & Bruno B. tutorial
* API testing & JWT Implementation from Austin Kabiru's Rails API article on Scotch.io
* tailwindcss + create-react-app setup found here: https://dev.to/nards_paragas/setup-create-react-app-with-tailwind-css-394e