# TMS-Light (v1)
* Initial project created similar in structure to the Heroku & Bruno B. tutorial
* API testing & JWT Implementation from Austin Kabiru's Rails API article on Scotch.io

## Testing
`rake rspec` 
* Run all specs with `--documentation` formatting

## Booting the dev server
`rake start`
* Spins up Foreman with the API on port 3001 and the react app on port 3000

## Deploying for Production
* must create ENV variable for SECRET_KEY_BASE in order for JWT to function properly

# Todo
* ensure css lump is minizmized upon production deploy