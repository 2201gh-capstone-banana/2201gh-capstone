# MVP 
## Intro & Goal
The problem: Approximately 250,000-500,000 Americans (and some Canadians) use American Sign Langugage, yet we at Be My Voice believe that number should be higher. Our goal is to make American Sign Language accessible to those who have not yet been exposed to this language and to use these translations to increase knowledge and understanding of ASL. 

Be My Voice is a translation app that uses tensorflow.js machine learning models to translate American sign language. 

## Who is it for?
The app is for people who want to translate basic ASL phrases or are interested in learning more about ASL.

## Proof of concept iteration Goals
1. We have a machine learning model that uses a webcam to detect sign language in the users hand and fingers
2. React webpage that accesses and displays the camera view
3. (At some point) Our model actually detects movement and nuances in sign language

## Tech Stack
* React
* Node.js
* Tensorflow.js
* Sequelize
* Express
* Redux
* React webcam
* Heroku

## Tier 1
# As a user, I want to be able to:
* As a visitor:
  * Sign up as a user
    * Name (first and last), email, phone number, camera accessibility
  * Login if your account has already been created
  * Will see demo video on homepage so they know what they're signing up for
  * See a header with Routes to Login, Signup, Home, About
  * See a nice logo :)
* As a logged in visitor: 
  * Users will be able to tell when the computer can track their hands, camera was able to see it because the hand was in the camera view
  * See a header with Routes to Logout, Home, About, Translate, Lessons
  * See a nice logo :)
  * Can accept or deny access to webcam, if user has already accepted webcam access they don't have to re-accept
  * Can sign 3 phrases(we'll decide those later) and those phrases will be translated on the same page
  * 

## As an engineer, I want to:
* Ensure User data is secure so no one can access or manipulate user information
* have a well-seeded database so that I am able to simulate a number of different scenarios for the user stories

## Tier 2
* Add more sign language, especially more complicated sign language (sign language with movement, both hands, etc.)

## Tier 3
* We want to attempt to get this working in a React Native mobile app

Quesetions for our instructors:
Seeking advice on what models to use, especially when we might want to include movement of hands at some point
