# TMS-Light (v1)

## Preview
![tms-light](https://user-images.githubusercontent.com/18252139/67624807-94a8a900-f7ea-11e9-9299-380d17a0547b.gif)

## About
This is a very basic "Transportation Management System" CRUD app, created to demonstrate a combined Rails API + React/Redux SPA. 

There are 4 primary relational database models: "Loads, Contacts, Shippers & Carriers", plus a 5th "User" model that these all belong to.

The application has a basic authentication scheme. The API generates a JWT upons successful login, and the React App passes this along from local storage via the `Authentication` header for subsequent requests.

Technologies used include:
* Rails 6, in API mode
* RSpec API test suite
* React + Redux + react-router
* TailwindCSS
* Webpacker, with PostCSS/PurgeCSS

## Demo
[Click here](https://tms-light-demo.herokuapp.com/) for a live demo.
* Use the following credentials to view seeded DB records
  * email: `foo@bar.com`
  * password: `foobar`

## Booting the dev server
`rake start`
* Spins up Foreman with the API on port 3001 and the react app on port 3000 (with watcher for postcss+tailwind)

## Testing
`rake rspec` 
* Runs all API specs with `--documentation` formatting
* There are currently 124 passing examples (model and request specs)

## Deploying for Production
### To Heroku:
With heroku cli installed, run the following commands:
1. `heroku apps:create`
2. `heroku buildpacks:add heroku/nodejs --index 1`
3. `heroku buildpacks:add heroku/ruby --index 2`
4. `heroku config:set YARN_PRODUCTION=false`
5. `git push heroku master` 
6. `heroku run rake db:migrate`
7. `heroku run rake db:seed`

*Note*: the YARN_PRODUCTION environment variable gets configured as such, so that the devDependencies will from the /client/ subdirectory's package.json will be available to properly build our react app. `react-scripts` still generates a minified production build without devDependencies, so this should not effect build size.

## Misc. Notes
* Modify any user-created CSS in /client/src/styles/src/ folder (they will compile to /client/src/styles/ root)
* PurgeCSS minimizes the CSS chunk from ~600kb to 35kb, so the postinstall script in /client is key

## Resources
* Initial project created similar in structure to the Heroku & Bruno B. tutorial
* API testing & JWT Implementation from Austin Kabiru's Rails API article on Scotch.io
* tailwindcss + create-react-app setup found here: https://dev.to/nards_paragas/setup-create-react-app-with-tailwind-css-394e