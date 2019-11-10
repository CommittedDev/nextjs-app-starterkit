# nextjs app starter kit


### How to start
download the template from github , [direct link](https://github.com/doronnahum/nextjs-app-starterkit/archive/master.zip)
**Install the dependencies**
```
and run npm i inside the folder
```
**run the app**
```
npm run local
```
**update seo site info**

 1. update site title and description in this file *./siteConfig.js*
 2. update file assets *public/static/graphics*

### Cli
Create pages, components, reducers from your cmd

 - create new **page** 
 ```npm run create-page```
 
 - create new **component**
 ```npm run create-comp```
 
 - create new **reducer**
 ```npm run create-reducer```
 
### Env
Add Environment Variables to *./env.js*
run the app in a specific env:
- **production** - ``` npm start ```
- **development**  - ``` npm run dev ```
- **local** - ``` npm run local```
- **qa** - ``` npm run qa ```

### ESLint
```npm run format ``` to clean your code with eslint --fix

### Static web site
export your APP as a static HTML app
- **build** : ``` npm run build:static_export```
- **build and run** : ``` npm run build:serve-static```
- **run** : ``` npm run serve-static```
<small>navigate to /index to see your app http://192.168.0.104:8080/index</small>

**i18n**
docs in process

**auth**
docs in process

**api**
docs in process

**enums**
docs in process