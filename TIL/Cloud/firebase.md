# Firebase

```bash
npm install -g firebase-tools
```

```bash
firebase login
firebase init
```

## Functions

- initialization

```bash
# arrow down -> space to select -> enter to confirm
>(*) Functions: Configure and deploy Cloud Functions

> Use an existing project

# project-directory (project-name)

# JavaScript || TypeScript

# install depencencies for ESLint

# Firebase initialization complete!
```

- `local_project_directory/functions/index.js`

```js
// initialization
const functions = require('firebase-functions');
const config = functions.config();
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true }); // npm i cors // allow CORS
admin.initializeApp();
```

```bash
# config environment variables
firebase functions:config:set property=${}
firebase functions:config:set user.email='${}' # example
firebase functions:config:set user.password='${}
```

```js
// setup functions - nodemailer example
const transporter = nodemailer.createTestAccount({
  service: 'Gmail',
  auth: {
    user: config.user.email /* from configured variables */,
    pass: config.user.password,
  },
});

exports.sendMail = functions
  .region('asia-northeast3')
  .https.onRequest((request, response) => {
    cors(request, response, () => {
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          response.send(error);
        } else {
          response.send('Message sent successfully.');
        }
      });
    });
  });
```

```bash
# deployment
firebase deploy
```

- calling the function URL will trigger the function
