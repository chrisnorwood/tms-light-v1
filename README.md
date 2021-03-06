# TMS-Light (v1)

## Table of Contents
* [Preview](#preview)
* [About](#about)
* [Demo](#about)
* [Booting the Dev Server](#booting-the-dev-server)
* [Testing](#testing)
* [Deploying to Heroku](#deploying-for-production)
* [Misc. Notes](#misc-notes)
* [Todo](#todo)
* [Resources](#resources)

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
```console
~/tms-light-v1$ rake start
```
* Spins up Foreman with the API on port 3001 and the react app on port 3000 (with watcher for postcss+tailwind)

## Testing
```console
~/tms-light-v1$ rake rspec
```
* Runs all API specs with `--documentation` formatting
* There are currently 124 passing examples (model and request specs)

## Deploying for Production
### To Heroku:
With heroku cli installed, run the following commands:
```console
~/tms-light-v1$ git add -A && git commit -m "Ready for production"
~/tms-light-v1$ heroku apps:create
~/tms-light-v1$ heroku buildpacks:add heroku/nodejs --index 1
~/tms-light-v1$ heroku buildpacks:add heroku/ruby --index 2
~/tms-light-v1$ heroku config:set YARN_PRODUCTION=false
~/tms-light-v1$ git push heroku master 
~/tms-light-v1$ heroku run rake db:migrate
~/tms-light-v1$ heroku run rake db:seed
```
***Note**: YARN_PRODUCTION env. variable set to false, so `client/` devDependencies will properly build react app using npm-run-all, postcss, and purgecss. `react-scripts` still generates a minified production build without devDependencies, so this should not affect build size.*

## Misc. Notes
* Modify any user-created CSS in /client/src/styles/src/ folder (they will compile to /client/src/styles/ root)
* PurgeCSS minimizes the CSS chunk from ~600kb to 35kb, so the postinstall script in /client is key

## Todo
- [ ] DRY up the front-end code, particularly the modals
- [ ] Begin testing the front-end (unit tests?) (integration?)

## Resources
* Initial project created similar in structure to the Heroku & Bruno B. tutorial
* API testing & JWT Implementation from Austin Kabiru's Rails API article on Scotch.io
* tailwindcss + create-react-app setup found here: https://dev.to/nards_paragas/setup-create-react-app-with-tailwind-css-394e