# MVP 

## Intro & Goal
The problem: Approximately 250,000-500,000 Americans (and some Canadians) use American Sign Language, yet we at Be My Voice believe that number should be higher. Our goal is to make American Sign Language accessible to those who have not yet been exposed to this language and to use these translations to increase knowledge and understanding of ASL. 

Be My Voice is a translation web app that uses tensorflow.js machine learning models to translate American sign language. 

## Who is it for?
The web app is for people who want to translate basic ASL phrases or are interested in learning more about ASL.

## User Story:

Kate lives a block away from Gallaudet University in Washington, DC and wants to be a better neighbor. She hears about the app through her friend Kelsey and signs up to access the translation portion of Be My Voice. She learns that her deaf neighbor has been saying good morning to her everyday when they walk their dogs around the neighborhood, and she is now able to say it back.

Michael has been watching a TV show that includes characters who exclusively use sign language in the show. Although he has captions, he wants to learn more about some of the signs he sees depicted on TV. This helps grow his understanding and interest in learning more about ASL.

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
* As a user, I want to be able to:
  * *As a visitor:*
    * Sign up as a user
       * Name (first and last), email, phone number, camera accessibility
    * Login if your account has already been created
    * Will see demo video on homepage so they know what they're signing up for
    * See a header with Routes to Login, Signup, Home, About
    * See a nice logo :)
   * *As a logged in visitor:*  
     * See a header with Routes to Logout, Home, About, Translate, Lessons
     * See a nice logo :)
     * Can accept or deny access to webcam, if user has already accepted webcam access they don't have to re-accept
     * Put something in local storage that says we have access to this webcam.
     * Can sign 3 phrases(we'll decide those later) and those phrases will be translated on the same page
     * Users will be able to tell when the computer can track their hands, camera was able to pop up because the hand was in the camera view

* As an engineer, I want to:
   * Ensure User data is secure so no one can access or manipulate user information
   * have a well-seeded database so that I am able to simulate a number of different scenarios for the user stories

## Tier 2
* Add more sign language, especially more complicated sign language (sign language with movement, both hands, etc.)
* navigate the website successfully, in a way that is accessible and inclusive.
  * This is a great opportunity to dive into ADA Compliance (screen-reader friendliness, keyboard navigation, colorblind-friendly, etc.).
    * [A11y Checklist](https://www.a11yproject.com/checklist/)

## Tier 3
* We want to attempt to get this working in a React Native mobile app
* A lesson plan for users who are signed up with the app (like RedPanda)
