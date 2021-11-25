# react-cognito-starter-kit
React App with Cognito integration to signup, signin and forgot password

1. Set up your user and identity pools
1. Go to the AWS Console and create a user pool and a federated identity pool. 
2. The user pool needs an associated app which must NOT have a secret. 
3. First build the library, and then the examples, then change into the htdocs directory and run the webserver:

**Running the app**

`npm install & npm start`

Your browser should open at
http://localhost:3000

**Create a test user:**

1. Go to your user pool and go to "Users and groups"
2. Click "create user"
3. Complete the form:
4. Enter a username
5. Enter a password that conforms to the rules of the user pool
6. Uncheck 'Mark phone number as verified?'
7. Uncheck 'Mark email as verified?'
8. Enter a valid email address
9. Click 'Create User'
10. First time login
11. Go to your deployed example application webserver
12. You should see the login form
13. Enter the username and password created above
14. You should be asked for a new password, since this is your first login
15. Enter a new password. It must conform to the rules of the user pool.
16. You should then be taken to a verification code entry screen. check your email and enter the code.
17. You should now see the logged in screen, showing your attributes and giving you some options.

Note that during this flow quitting and reloading the browser, then navigating back to this page, will result in you returning to the correct step.

**Logout and Login:**

1. Click 'log out'
2. You should see the login form
3. Login again using your username and the new password you chose above.
4. You should be taken to the logged in screen
5. Password changing
6. Click 'Change password'
7. Enter your existing password and a new password
8. Click set new password
9. you should see a message saying your password has been changed
10. Click 'Home'
11. Change email address
12. Click 'Change email address'
13. You should see a form with your existing email address
14. Enter a new valid email address
15. You should be asked for a verification code. Check your email for the code.
16. Enter the code.
17. You will be taken to the logged in screen.

Note that you can also reload the page after step 4, or close your browser, and you will be required to enter the verification code.
