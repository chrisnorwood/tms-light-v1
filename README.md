# TMS-Light (v1)

## Testing
`rake rspec` 
* Run all API/rails specs with `--documentation` formatting

## Booting the dev server
`rake start`
* Spins up Foreman with the API on port 3001 and the react app on port 3000 (with watcher for postcss+tailwind)

## Deploying for Production
* must create ENV variable for SECRET_KEY_BASE in order for JWT to function properly

## Todo
* ensure css lump is minizmized upon production deploy
* consider changing Private/PublicRoute's auth check to come from auth on state (which will ONLY set when valid token) rather than local storage (initially having trouble due to async nature of the state setting)
* Figure out how to properly route the catch all or '/' redirect to login appropriately with my Route HOCs
* better error handling in auth actions
* There is some race condition getting weird between my reAuth on index.js and manual type of /logout route

## Resources
* Initial project created similar in structure to the Heroku & Bruno B. tutorial
* API testing & JWT Implementation from Austin Kabiru's Rails API article on Scotch.io
* tailwindcss + create-react-app setup found here: https://dev.to/nards_paragas/setup-create-react-app-with-tailwind-css-394e