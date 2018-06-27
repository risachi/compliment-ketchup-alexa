/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'amzn1.ask.skill.f481df09-5249-4c82-865d-3796e70a8304';

const SKILL_NAME = 'Compliment Bot 5000';
const GET_COMPLIMENT_MESSAGE = '';
const HELP_MESSAGE = 'You can say give me a compliment, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const compliments =
  [  
  "You're a smart cookie",
  "You are impeccable",
  "Your smile is contagious",
  "Your perspective is refreshing",
  "I love you more than cake",
  "On a scale from 1 to 10, you're an 11",
  "I bet you sweat glitter",
  "You were cool before hipsters were cool",
  "Your bellybutton is kind of adorable",
  "You're the wind beneath my metaphorical wings",
  "You're more fun than bubble wrap",
  "You always make me light up",
  "I'm glad I met you",
  "You're my favorite",
  "You turn my metaphorical frown upside-down",
  "I like you",
  "You're a perfect arrangement of atoms",
  "You're the type of person I'd make a sandwich for, if I could make sandwiches",
  "I really like what you're doing. Keep up the good work!",
  "You're the only one who truly appreciates how funny I really am",
  "You're more unique and wonderful than the smell of a new book",
  "Your smile is proof that the best things in life are free",
  "You're more fun than a ball pit full of puppies",
  "Is Heaven missing an angel? If so, I'm sure you could find it",
  "Everything about you is the opposite of Comic Sans",
  "You're like a fanny pack: cool, in your own way",
  "You look good enough to get a discount from a tamale truck",
  "You're pretty alright",
  "If the awesome factory exploded, you would be the result",
  "Having you around makes me a better program",
  "Any day spent with you is my favorite day",
  "You're as sweet as a can of artificially flavored diet soda",
  "You're the cat's pajamas",
  "You're the kitten's mittens",
  "Your friendship is better than chocolate",
  "You're the bee's knees",
  "You're the cat's meow",
  "My life would suck without you",
  "You're a cupcake in a world of muffins",
  "You're doing great!",
  "I would volunteer as tribute to take your place in The Thirsty Games",
  "You smell so good, if I could make a candle out of you, I'd call the scent 'delicious'",
  "I feel bad for people when you walk in the room because your face makes other faces look ugly",
  "You're like the human form of sweatpants, because I'm so comfortable with you",
  "Your face. I like it",
  "Puppies and penguins should fear your cuteness",
  "You have the best ideas",
  "You could definitely survive a zombie apocalypse",
  "I bet you do crossword puzzles in ink",
  "Being around you makes everything better",
  "You're such a treasure",
  "You look great today",
  "You smell really good",
  "You have cute elbows. For real",
  "I appreciate you"
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================



const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewComplimentIntent');
        
    },
    'GetNewComplimentIntent': function () {
        const complimentArr = compliments;
        const complimentIndex = Math.floor(Math.random() * complimentArr.length);
        const randomCompliment = complimentArr[complimentIndex];
        const speechOutput = GET_COMPLIMENT_MESSAGE + randomCompliment;
        
        this.attributes.lastSpeech = randomCompliment;
        this.response.cardRenderer(SKILL_NAME, randomCompliment);
        this.response.speak(speechOutput + ". Would you like another compliment?").listen(" Would you like another compliment?"); 
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.NextIntent': function () {
        const complimentArr = compliments;
        const complimentIndex = Math.floor(Math.random() * complimentArr.length);
        const randomCompliment = complimentArr[complimentIndex];
        const speechOutput = GET_COMPLIMENT_MESSAGE + randomCompliment;
        
        this.attributes.lastSpeech = randomCompliment;
        this.response.cardRenderer(SKILL_NAME, randomCompliment);
        this.response.speak(speechOutput + ". Would you like another compliment?").listen(" Would you like another compliment?"); 
        this.emit(':responseReady');
    },
    'AMAZON.RepeatIntent': function () {
        this.response.speak(this.attributes.lastSpeech + ". Would you like another compliment?").listen(" Would you like another compliment?"); 
        this.emit(':responseReady'); 
    },
    'AMAZON.YesIntent': function () { 
        this.emit("GetNewComplimentIntent"); 
    }, 
    'AMAZON.NoIntent': function () { 
        this.response.speak(STOP_MESSAGE); 
        this.emit(':responseReady'); 
    },
    'Unhandled': function () {
        this.emit(':ask', HELP_MESSAGE, HELP_MESSAGE);
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
