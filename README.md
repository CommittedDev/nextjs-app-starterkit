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


# Components

## Page
Hoc component to your page
```jsx
import React from 'react';
import Screen from 'src/screens/forgotPassword';
import Page from 'src/components/Page';
import Head from 'next/head';

export default Page({
  loginRequired: false,
  logoutRequired: true,
  adminRequired: false,
  i18n: ['forgotPassword'],
  showLocalButton: true,
  displayName: 'forgotPassword',
})(() => (
  <React.Fragment>
    <Head>
      <title>Forgot Password</title>
    </Head>
    <Screen />
  </React.Fragment>
));
```

## Typography
![
](https://lh3.googleusercontent.com/6yKXvnOCdCBGTlkVMJHH32r-qz--IFoPaagbTnaLEAEG-tr9gGE9Q8Q3ON-PImLNADDokNhoB0AH6Q "Typography")
```jsx
import {
  Danger,
  Info,
  Muted,
  Primary,
  Quote,
  Success,
  Warning,
} from 'src/components/Typography';

const TypographyExample = () => (
  <div>
    <Muted>
      Muted Text
    </Muted>
    <Primary>
      Primary Text
    </Primary>
    <Info>
      Info Text
    </Info>
    <Success>
      Success Text
    </Success>
    <Warning>
      Warning Text
    </Warning>
    <Danger>
      Danger Text
    </Danger>
    <Quote
      text="I will be the leader of a company that ends up being worth billions of dollars, because I got the answers."
      author=" Kanye West, Musician"
    />
  </div>
);
```
## Loader
Display loader base the request status
```jsx
import Loader, { LoaderTypes } from 'src/components/Loader';

// Loader will display when login is loading
<Loader fullScreen loaderType={LoaderTypes.LOGIN} />

// Loader will display when showLoader is true
const showLoader= true;
<Loader fullScreen isLoading={showLoader} />
```
## Error
Display error message base the request status
```jsx
import Loader, { LoaderTypes } from 'src/components/Loader';

// Error will display when login is failed
// the message will be the error message
<Error  errorType={ErrorTypes.LOGIN} />

// Override the error message
<Error  errorType={ErrorTypes.LOGIN} errorText='sorry...' />
```
## RequestStatus
Get info about the reuquest status from store
```jsx
import RequestStatus, {LoaderTypes} from 'src/components/RequestStatus';

<RequestStatus
	loaderType={LoaderTypes.FORGOT_PASSWORD}
>
{({
  isLoading //bollean,
  isEnd // bollean,
  error // null/object/string,
  status: //strinr,
})=> {
	if(isLoading) return 'loading...'
	if(error ) return error;
	if(isEnd) return <MyComponent />
}}
</RequestStatus>
```
## PrivateContent
Show content only when user is logged in
```jsx
import  PrivateContent  from  'src/components/PrivateContent';

// any logged in user can see the content
<PrivateContent>
  <p>Only Authenticate user can see this message</p>
</PrivateContent>

// only admin user can see the content
<PrivateContent checkContext={(user) => user.isAdmin}>
  <p>Only Authenticate admin user can see this message</p>
</PrivateContent>
```
## Button
![enter image description here](https://lh3.googleusercontent.com/7ADY3kopJUhyeuqwrussc3uZUBcLIozmZ63cjS73_fK7usm0eNAgd11K-QaPFGzifhKY37QrdRJT-A "Buttons")
```jsx
import React from 'react';
import Button from 'src/components/Button';
import Favorite from '@material-ui/icons/Favorite';

const classes = {
  icons: {
    width: '17px',
    height: '17px',
    color: '#FFFFFF',
  },
};

const ButtonExample = () => (
  <div id="buttons">
    <p>style</p>
    <Button color="primary">Default</Button>
    <Button color="primary" round>
      round
    </Button>
    <Button color="primary" round>
      <Favorite className={classes.icons} /> with icon
    </Button>
    <Button justIcon round color="primary">
      <Favorite className={classes.icons} />
    </Button>
    <Button color="primary" simple>
      simple
    </Button>
    <p>size</p>
    <Button color="primary" size="sm">
      Small
    </Button>
    <Button color="primary">Regular</Button>
    <Button color="primary" size="lg">
      Large
    </Button>
    <p>color</p>
    <Button>Default</Button>
    <Button color="primary">Primary</Button>
    <Button color="info">Info</Button>
    <Button color="success">Success</Button>
    <Button color="warning">Warning</Button>
    <Button color="danger">Danger</Button>
    <Button color="rose">Rose</Button>
  </div>
);

export default ButtonExample;
```
# Services
## Notifications
![
](https://lh3.googleusercontent.com/JYudn9dQ7DEVgXAkcVVrFrTxfDMFQ_wCJ73iX1E6SiVKL_TlhcTDF1gkPVnvp6hA4hDUOb_sBi6Jiw "Notifications")
notification snackbars (toasts) with [notistack](https://github.com/iamhosseindhv/notistack)


```jsx
// Send new toast from any place in your code
import sendNotification from 'src/services/notification';

// sendNotification(message, type); type can be: info, succsess, warning, error
<button onClick={() => sendNotification('Hello', 'info')}>
  Send Notification
</button>

// From saga
import { sendNotification } from  'src/redux/global/global.actions';

yield  put(sendNotification(notificationMessage, 'success'));

```

## Api
src\services\api\index.js

Add new end points to this file like that:
```jsx
export const END_POINTS = {
  // Add new object
  fakeData: {
    url: 'https://jsonplaceholder.typicode.com/todos',
  },
}

export default class ApiService {
  // Add new method
  static fetchFakeData() {
    return ApiService.getAxios().request({
      url: END_POINTS.fakeData.url,
      method: METHODS.GET,
    });
  }
}
```

To use the axios Instance:
```jsx
// use axios Instance like this:
import  ApiService, { httpRequest } from  'src/services/api';
ApiService.getAxios();
```
# Full saga example
```jsx
import {
  put,
} from 'redux-saga/effects';
import ApiService, { httpRequest } from 'src/services/api';
import { startLoading, stopLoading, LoaderTypes } from 'src/redux/loaders';
import { setFakeData } from '../example.actions';

function* fetchFakeData() {
  try {
    yield put(startLoading({ loaderType: LoaderTypes.FETCH_FAKE_DATA }));
    const response = yield httpRequest(ApiService.fetchFakeData);
    yield put(setFakeData(response.data));
    yield put(stopLoading({ loaderType: LoaderTypes.FETCH_FAKE_DATA }));
  } catch (error) {
    yield put(stopLoading({ loaderType: LoaderTypes.FETCH_FAKE_DATA, error }));
  }
}

export default fetchFakeData;
```
## Loaders state
When you need to handle loading an error, user the loaders reducer

to add new request, add new key to LoaderTypes in this file src\redux\loaders\loaderTypesEnum.js
```jsx
export const LoaderTypes = {
  // Example
  FETCH_FAKE_DATA: 'FETCH_FAKE_DATA',
}
```

After we add FETCH_FAKE_DATA we can see it in the store
![enter image description here](https://lh3.googleusercontent.com/sV4km-ysR-laZQqSxXmIVdShzREVAOWRQf0la3K9_7jV3RCivjUf1GJ0IpWfz9LfpFsbr4FzrfXXJA "Loader")

Now we can use the loaders action to set loaders and errors,
for exmple, see the [full saga example](#full-saga-example)

[To display a loader in your app](#loader)
[To display a error in your app](#error)
