# TMS-Light (v1)

## Testing
`rake rspec` 
* Run all API/rails specs with `--documentation` formatting

## Booting the dev server
`rake start`
* Spins up Foreman with the API on port 3001 and the react app on port 3000 (with watcher for postcss+tailwind)

## Deploying for Production
### To Heroku:
`heroku apps:create`
`heroku buildpacks:add heroku/nodejs --index 1`
`heroku buildpacks:add heroku/ruby --index 2`
`heroku config:set YARN_PRODUCTION=false`
`git push heroku master`

(Note: the YARN_PRODUCTION environment variable needs to be configured as such, so that the DevDependencies will from the /client package.json will be available to properly build our react app)

## Misc. Notes
* Due to some limitations with Tailwind/PostCSS + create-react-app, modify CSS in /client/src/styles/src/ folder (they will compile to /client/src/styles/ root)

## Resources
* Initial project created similar in structure to the Heroku & Bruno B. tutorial
* API testing & JWT Implementation from Austin Kabiru's Rails API article on Scotch.io
* tailwindcss + create-react-app setup found here: https://dev.to/nards_paragas/setup-create-react-app-with-tailwind-css-394e