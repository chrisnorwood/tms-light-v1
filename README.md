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
* consider dispatching handleGetInitialData within the APP somewhere, rather than in the action ???? then the token can come from the store, but problem is I will still be passing the damn token
* consider my delete reduct actions/reducer, with that helper function?  is it hacky???
* should pass in my Contact and Its parents through props to the modal component as opposed to doing the full fresh recalculation every time in the freakin modal components

## Resources
* Initial project created similar in structure to the Heroku & Bruno B. tutorial
* API testing & JWT Implementation from Austin Kabiru's Rails API article on Scotch.io
* tailwindcss + create-react-app setup found here: https://dev.to/nards_paragas/setup-create-react-app-with-tailwind-css-394e