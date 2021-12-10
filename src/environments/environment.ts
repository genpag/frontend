// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // firebase: {
  //   apiKey: "AIzaSyD8D3bk1U84SWy_Z3CAzSJLQdaDwAe8ZUQ",
  //   authDomain: "front-end-c82b9.firebaseapp.com",
  //   projectId: "front-end-c82b9",
  //   storageBucket: "front-end-c82b9.appspot.com",
  //   messagingSenderId: "790920220344",
  //   appId: "1:790920220344:web:c89726580e318b441f2e4d",
  //   measurementId: "G-3ZDTGB9WVP"
  // }

  firebase: {
    apiKey: 'AIzaSyAMHqyEThzDCQfexQ5RYy1kwon8l0e0hZE',
    authDomain: 'frontend-6805f.firebaseapp.com',
    projectId: 'frontend-6805f',
    storageBucket: 'frontend-6805f.appspot.com',
    messagingSenderId: '130451598115',
    appId: '1:130451598115:web:d65b490f8f88331cad7a96',
    measurementId: '${config.measurementId}',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
