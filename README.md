# nextjs app starter kit

### File structure

```
.
├── ...
├── _templates        		  		# Templates For hygen cli
├── pages 					  		# Nextjs pages (each page is a route that render screem)
|   => all the page names are param-case
|   |── _app.js      		 		# inital the redux store and more, read about app in this link https://nextjs.org/docs/#custom-app              
|   |── _ducument.js 		 		# https://nextjs.org/docs/#custom-document
|   |── index.js      				# home page, comes with link to some examples
|   |── singin.js    		 
|   |── singup.js     	     
|   |── verify-account.js
|   ...
├── public
|   |── static						# serving static assets 
|   |── locales						# locales json files for the 18nNext 
├── src
|   |── components            	    # app components
|       => all the components names are PascalCase		
|   	|── DashboardLayout
|   		|── DashboardLayout.js  # The component file
|   		|── index.js			# index file that export the component to make it easy to import
|   |── example            	        # somes screens, components, reducer examples
|   |── i18n						# i18n service
|   |── redux						# app store with saga & reudux
|       |── auth
|			|── workers
|       		|── singin.worker.js
|       	|── auth.actions.js
|       	|── auth.reducer.js
|       	|── auth.selector.js
|       	|── auth.saga.js
|		...
|   |── screens
|       => all screen names are lowercaseFirst
|		|── home
|			|── home.js
|			|── home.scss
|			|── index.js
|		...
|   |── services
|		|── api
|		|── logger
|		|── notification
| 
|   ...
└── ...
```

### How to start
download the template from github , [direct link](https://github.com/doronnahum/nextjs-app-starterkit/archive/master.zip)
**Install the dependencies**
inside the folder:
```
npm i
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

### i18n

**Example of use**
localePath: public/static/locales

```jsx
import React from 'react'
import { withTranslation } from 'src/i18n'

class Footer extends React.Component {
	render() {
		return (
			<footer>{this.props.t('description')}</footer>
		)
	}
} 

export default withTranslation('footer')(Footer)

```

**How to change local?**

```jsx
import {i18n} from 'src/i18n'
i18n.changeLanguage('en');
```

**How to translate error message from the server**

Add your new message to src/i18n/serverMessages.js

### auth
Update your api end point inside  src/services/api/index.js
protect your page using src/components/Page
### example
```jsx
import React from 'react';
import Page from 'src/components/Page';
import Head from 'next/head';
import Screen from 'src/example/screens/exampleScreen';

export default Page({
  loginRequired: true,
  logoutRequired: false,
  adminRequired: false,
  i18n: ['common'],
  showLocalButton: true,
  displayName: 'ExamplePrivatePage',
})(() => (
  <React.Fragment>
    <Head>
      <title>Example Private Page</title>
    </Head>
    <h1>Example Private Page</h1>
    <Screen />
  </React.Fragment>
));
```

**api**
docs in process

**enums**
docs in process