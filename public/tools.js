(function() {
  var url = location.href;
  var args = (url.split(/\?/)[1] || "").split(/\&/);
  var params = {};
  for(var idx in args) {
    var arg = args[idx].split(/\=/);
    var key = arg[0];
    var value = arg[1];
    if(key && value) {
      params[key] = decodeURIComponent(value);
    }
  }
  if(params['selection_directive'] != "embed_content" || !params['launch_presentation_return_url']) {
    alert("This page is normally used an an example of embedding content, but you've referenced it some other way. As such, it's not going to be very useful to you. Sorry.");
    callbackUrl = null;
  } else if(!params['launch_presentation_return_url'].match(/\?/)) {
    params['launch_presentation_return_url'] = params['launch_presentation_return_url'] + "?";
  }
  var returnUrl = params['launch_presentation_return_url'];

  var searchMode = "tools";
  var tools = [
    {
      name: "Khan Academy",
      logo_url: "/tools/khan.png",
      description: "Online video lessons for math, science, etc.",
      markets: "",
      launch_url: "/khan.html"
    },
    {
      name: "USA Today",
      logo_url: "/tools/usa_today.png",
      description: "Search articles on USA Today",
      markets: "",
      launch_url: "/usatoday.html"
    },
    {
      name: "Graph Builder",
      logo_url: "/tools/graph_tk.png",
      description: "Build and embed rich interactive graphs into course content",
      markets: "",
      launch_url: "/graph.html"
    },
    {
      name: "Quizlet Flash Cards",
      logo_url: "/tools/quizlet.png",
      description: "Search Quizlet for flash card and study tools",
      markets: "",
      launch_url: "/quizlet.html"
    },
    {
      name: "Codecademy",
      logo_url: "/tools/codecademy.png",
      description: "Interactive programming lessons",
      markets: "",
      resources:
[
  {
    "description": "Javascript Glossary",
    "image_url": "/prompt.png",
    "name": "Javascript Glossary",
    "url": "http://www.codecademy.com/glossary"
  },
  {
    "description": "1. Getting to Know You, Part I. See what you can do with programming!",
    "image_url": "/prompt.png",
    "name": "Introduction: 1. Getting to Know You, Part I",
    "url": "http://www.codecademy.com/courses/programming-intro/0"
  },
  {
    "description": "2. Confirm or Deny. Alerting users and more.",
    "image_url": "/prompt.png",
    "name": "Introduction: 2. Confirm or Deny",
    "url": "http://www.codecademy.com/courses/programming-intro/1"
  },
  {
    "description": "3. Variables. Let's start saving what you're working on!",
    "image_url": "/prompt.png",
    "name": "Introduction: 3. Variables",
    "url": "http://www.codecademy.com/courses/programming-intro/2"
  },
  {
    "description": "4. Numbers n' Strings. Learning what separates text from numbers and more",
    "image_url": "/prompt.png",
    "name": "Introduction: 4. Numbers n' Strings",
    "url": "http://www.codecademy.com/courses/programming-intro/3"
  },
  {
    "description": "5. Editor and Arrays. The console's not the only game in town.",
    "image_url": "/prompt.png",
    "name": "Introduction: 5. Editor and Arrays",
    "url": "http://www.codecademy.com/courses/programming-intro/4"
  },
  {
    "description": "6. What If?. If Statements and More",
    "image_url": "/prompt.png",
    "name": "Introduction: 6. What If?",
    "url": "http://www.codecademy.com/courses/programming-intro/5"
  },
  {
    "description": "7. Bringing It Up (and Down). Incrementing and Decrementing",
    "image_url": "/prompt.png",
    "name": "Introduction: 7. Bringing It Up (and Down)",
    "url": "http://www.codecademy.com/courses/programming-intro/6"
  },
  {
    "description": "8. While You Wait. The while loop is just as useful as for!",
    "image_url": "/prompt.png",
    "name": "Introduction: 8. While You Wait",
    "url": "http://www.codecademy.com/courses/programming-intro/7"
  },
  {
    "description": "The only thing more fun than playing games is automating games.",
    "image_url": "/prompt.png",
    "name": "Introduction Project: Fizzing and Buzzing",
    "url": "http://www.codecademy.com/courses/4f08e38e9bced80001000e58"
  },
  {
    "description": "1. Defining Functions. How to define functions.",
    "image_url": "/prompt.png",
    "name": "Functions: 1. Defining Functions",
    "url": "http://www.codecademy.com/courses/functions-in-javascript-2-0/0"
  },
  {
    "description": "2. Variables in functions. Declaring and using variables within functions.",
    "image_url": "/prompt.png",
    "name": "Functions: 2. Variables in functions",
    "url": "http://www.codecademy.com/courses/functions-in-javascript-2-0/1"
  },
  {
    "description": "3. Return. Making use of 'return' in a function.",
    "image_url": "/prompt.png",
    "name": "Functions: 3. Return",
    "url": "http://www.codecademy.com/courses/functions-in-javascript-2-0/2"
  },
  {
    "description": "4. Function calls as values. Learning about how functions can interact.",
    "image_url": "/prompt.png",
    "name": "Functions: 4. Function calls as values",
    "url": "http://www.codecademy.com/courses/functions-in-javascript-2-0/3"
  },
  {
    "description": "5. Understanding parameters. How to have more than one parameter in the function.",
    "image_url": "/prompt.png",
    "name": "Functions: 5. Understanding parameters",
    "url": "http://www.codecademy.com/courses/functions-in-javascript-2-0/4"
  },
  {
    "description": "1. Introducing Functions. See how a function is defined and used.  Learn to define your first simple function.",
    "image_url": "/prompt.png",
    "name": "Functions: 1. Introducing Functions",
    "url": "http://www.codecademy.com/courses/functions_in_javascript/0"
  },
  {
    "description": "2. Understanding Parameters. Functions can accept input known as arguments. We'll explore how to work with arguments.",
    "image_url": "/prompt.png",
    "name": "Functions: 2. Understanding Parameters",
    "url": "http://www.codecademy.com/courses/functions_in_javascript/1"
  },
  {
    "description": "3. Local Variables. Storing data, such as intermediate values of a calculation, in variables inside of a function.",
    "image_url": "/prompt.png",
    "name": "Functions: 3. Local Variables",
    "url": "http://www.codecademy.com/courses/functions_in_javascript/2"
  },
  {
    "description": "Let's combine all the basics covered in the getting started lesson to create a program that calculates taxi fare based upon distance traveled and the time of day.",
    "image_url": "/prompt.png",
    "name": "Functions Project: New York, New York",
    "url": "http://www.codecademy.com/courses/hello_new_york"
  },
  {
    "description": "It's an Olympic year! Write a program to determine who qualifies for the Olympic team. We'll be covering primitives, functions, arrays and loops!",
    "image_url": "/prompt.png",
    "name": "Functions Project: Time Trials",
    "url": "http://www.codecademy.com/courses/olympic-trials"
  },
  {
    "description": "1. Review: The story so far.... We review concepts learned in previous weeks!",
    "image_url": "/prompt.png",
    "name": "Conditionals: 1. Review: The story so far...",
    "url": "http://www.codecademy.com/courses/conditionals-in-javascript/0"
  },
  {
    "description": "2. If else statements. Review the fundamentals of using if else statements",
    "image_url": "/prompt.png",
    "name": "Conditionals: 2. If else statements",
    "url": "http://www.codecademy.com/courses/conditionals-in-javascript/1"
  },
  {
    "description": "3. Using if else statements in functions. We want to see how functions can use if else statements, and how if else statements can use functions",
    "image_url": "/prompt.png",
    "name": "Conditionals: 3. Using if else statements in functions",
    "url": "http://www.codecademy.com/courses/conditionals-in-javascript/2"
  },
  {
    "description": "4. Introducing the Switch statement. Switch statements can help simplify long if else statements!",
    "image_url": "/prompt.png",
    "name": "Conditionals: 4. Introducing the Switch statement",
    "url": "http://www.codecademy.com/courses/conditionals-in-javascript/3"
  },
  {
    "description": "5. Ternary operators. We look at some nice shortcuts to make writing conditional statements easier!",
    "image_url": "/prompt.png",
    "name": "Conditionals: 5. Ternary operators",
    "url": "http://www.codecademy.com/courses/conditionals-in-javascript/4"
  },
  {
    "description": "6. Summary of conditionals. We provide a recap of some of the key concepts learned in this course",
    "image_url": "/prompt.png",
    "name": "Conditionals: 6. Summary of conditionals",
    "url": "http://www.codecademy.com/courses/conditionals-in-javascript/5"
  },
  {
    "description": "1. Review: The story so far.... We cover three issues that users have emailed asking about.",
    "image_url": "/prompt.png",
    "name": "Review: 1. Review: The story so far...",
    "url": "http://www.codecademy.com/courses/primitives-development-course/0"
  },
  {
    "description": "2. Strings and numbers are values. Primitive data types include both \"strings\" and numb3rs.",
    "image_url": "/prompt.png",
    "name": "Review: 2. Strings and numbers are values",
    "url": "http://www.codecademy.com/courses/primitives-development-course/1"
  },
  {
    "description": "3. Can it be true?. Booleans are primitives too!",
    "image_url": "/prompt.png",
    "name": "Review: 3. Can it be true?",
    "url": "http://www.codecademy.com/courses/primitives-development-course/2"
  },
  {
    "description": "4. Boolean in the wild. The many talents of the Boolean data type.",
    "image_url": "/prompt.png",
    "name": "Review: 4. Boolean in the wild",
    "url": "http://www.codecademy.com/courses/primitives-development-course/3"
  },
  {
    "description": "5. More on arrays. We can store primitive values in arrays, and then manipulate them. Sounds like fun.",
    "image_url": "/prompt.png",
    "name": "Review: 5. More on arrays",
    "url": "http://www.codecademy.com/courses/primitives-development-course/4"
  },
  {
    "description": "6. Random stuff!. Let's learn how to generate numbers between 1 and any number!",
    "image_url": "/prompt.png",
    "name": "Review: 6. Random stuff!",
    "url": "http://www.codecademy.com/courses/primitives-development-course/5"
  },
  {
    "description": "7. Summary of primitive data types. We've learned a lot about primitives. Let's make sure we remember it all.",
    "image_url": "/prompt.png",
    "name": "Review: 7. Summary of primitive data types",
    "url": "http://www.codecademy.com/courses/primitives-development-course/6"
  },
  {
    "description": "1. Review: The story so far.... Can you believe we've done a month of courses? Let's reminisce about all those sweet coding memories!",
    "image_url": "/prompt.png",
    "name": "Objects: 1. Review: The story so far...",
    "url": "http://www.codecademy.com/courses/spencer-sandbox/0"
  },
  {
    "description": "2. What's an Object. Let's start by learning how to create objects and use the information inside them",
    "image_url": "/prompt.png",
    "name": "Objects: 2. What's an Object",
    "url": "http://www.codecademy.com/courses/spencer-sandbox/1"
  },
  {
    "description": "3. A Method to the Madness. Learn to add methods to objects and create objects through constructors",
    "image_url": "/prompt.png",
    "name": "Objects: 3. A Method to the Madness",
    "url": "http://www.codecademy.com/courses/spencer-sandbox/2"
  },
  {
    "description": "4. Construction Junction. Learn to how to make constructors for objects, which allow you to define properties and methods as you create the object.",
    "image_url": "/prompt.png",
    "name": "Objects: 4. Construction Junction",
    "url": "http://www.codecademy.com/courses/spencer-sandbox/3"
  },
  {
    "description": "5. Combining Objects With Our Other Tools. See how objects can be used with conditionals, functions, arrays, and loops",
    "image_url": "/prompt.png",
    "name": "Objects: 5. Combining Objects With Our Other Tools",
    "url": "http://www.codecademy.com/courses/spencer-sandbox/4"
  },
  {
    "description": "6. Objects In Review. We review all the important aspects from this first lesson in objects.",
    "image_url": "/prompt.png",
    "name": "Objects: 6. Objects In Review",
    "url": "http://www.codecademy.com/courses/spencer-sandbox/5"
  },
  {
    "description": "1. Review: The story so far.... Let's review objects and introduce some new concepts to familiar constructions",
    "image_url": "/prompt.png",
    "name": "Objects: 1. Review: The story so far...",
    "url": "http://www.codecademy.com/courses/objects-ii/0"
  },
  {
    "description": "2. Objects, Objects Everywhere. A deeper look into the true nature of objects in JavaScript",
    "image_url": "/prompt.png",
    "name": "Objects: 2. Objects, Objects Everywhere",
    "url": "http://www.codecademy.com/courses/objects-ii/1"
  },
  {
    "description": "3. You Down With OOP?. Introduction to classes and the prototype",
    "image_url": "/prompt.png",
    "name": "Objects: 3. You Down With OOP?",
    "url": "http://www.codecademy.com/courses/objects-ii/2"
  },
  {
    "description": "4. Inheriting a Fortune. Inheritance in object-oriented programming",
    "image_url": "/prompt.png",
    "name": "Objects: 4. Inheriting a Fortune",
    "url": "http://www.codecademy.com/courses/objects-ii/3"
  },
  {
    "description": "5. Privacy Please!. Public and private properties and methods of objects",
    "image_url": "/prompt.png",
    "name": "Objects: 5. Privacy Please!",
    "url": "http://www.codecademy.com/courses/objects-ii/4"
  },
  {
    "description": "6. Objects in Review Are Closer Than They Appear. Reviewing the nature of objects and introduction to object-oriented programming",
    "image_url": "/prompt.png",
    "name": "Objects: 6. Objects in Review Are Closer Than They Appear",
    "url": "http://www.codecademy.com/courses/objects-ii/5"
  },
  {
    "description": "We make use of arrays, functions and for loops.",
    "image_url": "/prompt.png",
    "name": "Objects Project: Objects in address books are fun!",
    "url": "http://www.codecademy.com/courses/building-an-address-book"
  },
  {
    "description": "Save the day and build a cash register!",
    "image_url": "/prompt.png",
    "name": "Objects Project: Cha Ching",
    "url": "http://www.codecademy.com/courses/close-the-super-makert"
  },
  {
    "description": "1. Review: The story so far.... Let's review some things about objects before diving into loops!",
    "image_url": "/prompt.png",
    "name": "For / While Loops: 1. Review: The story so far...",
    "url": "http://www.codecademy.com/courses/loops/0"
  },
  {
    "description": "2. Review continued.... So much review we put it into TWO sections!",
    "image_url": "/prompt.png",
    "name": "For / While Loops: 2. Review continued...",
    "url": "http://www.codecademy.com/courses/loops/1"
  },
  {
    "description": "3. Counting with Loops. An overview of what you can do with `for` loops",
    "image_url": "/prompt.png",
    "name": "For / While Loops: 3. Counting with Loops",
    "url": "http://www.codecademy.com/courses/loops/2"
  },
  {
    "description": "4. Looping in Arrays and Strings. Printing arrays and strings; manipulating strings",
    "image_url": "/prompt.png",
    "name": "For / While Loops: 4. Looping in Arrays and Strings",
    "url": "http://www.codecademy.com/courses/loops/3"
  },
  {
    "description": "5. While Loops. Learning to use condition-based loops",
    "image_url": "/prompt.png",
    "name": "For / While Loops: 5. While Loops",
    "url": "http://www.codecademy.com/courses/loops/4"
  },
  {
    "description": "6. Recursion. It's recursion!",
    "image_url": "/prompt.png",
    "name": "For / While Loops: 6. Recursion",
    "url": "http://www.codecademy.com/courses/loops/5"
  },
  {
    "description": "7. Extra Tricks. Nesting loops, looping through objects, and using `break`",
    "image_url": "/prompt.png",
    "name": "For / While Loops: 7. Extra Tricks",
    "url": "http://www.codecademy.com/courses/loops/6"
  },
  {
    "description": "We cover loops and arrays!",
    "image_url": "/prompt.png",
    "name": "For / While Loops Project: Getting Dicey",
    "url": "http://www.codecademy.com/courses/4f1f8f67aef7bc000100e2cd"
  }
]
    },
    {
      name: "Elementary Paper",
      logo_url: "/tools/elementary_paper.png",
      description: "Browse printable writing practice sheets",
      markets: "",
      resources: 
[
  {
    "url": "http://www.ElementaryPaper.com/practice.php?template=185",
    "image_url": "/elementary_paper/alphabet.png",
    "name": "Alphabet",
    "description": "All letters of the Alphabet."
  },
  {
    "url": "http://www.ElementaryPaper.com/practice.php?template=188",
    "image_url": "/elementary_paper/months.png",
    "name": "Calendar Months",
    "description": "All the months in a calendar year."
  },
  {
    "url": "http://www.ElementaryPaper.com/practice.php?template=187",
    "image_url": "/elementary_paper/days.png",
    "name": "Days of the Week",
    "description": "All the days of the week."
  },
  {
    "url": "http://www.ElementaryPaper.com/practice.php?template=186",
    "image_url": "/elementary_paper/numbers.png",
    "name": "Numbers",
    "description": "The numbers 0 through 9."
  },
  {
    "url": "http://www.ElementaryPaper.com/practice.php?template=183",
    "image_url": "/elementary_paper/colors.png",
    "name": "Rainbow",
    "description": "All the colors in the rainbow."
  },
  {
    "url": "http://www.ElementaryPaper.com/practice.php?template=184",
    "image_url": "/elementary_paper/colors_in_color.png",
    "name": "Rainbow (with Colors)",
    "description": "All the colors in the rainbow - set on a worksheet with colored lines and font."
  }
]
    },
    {
      name: "Hooda Math",
      logo_url: "/tools/hooda_math.png",
      description: "Link to online math learning games",
      markets: "",
      resources: 
[
  {
    "description": "The goal of the game is to move the DuBlox from the green tiles to the red tiles on each level. Use arrow keys to move DuBlox.\nWatch out for glass tiles! If the DuBlox lays flat on them you will have to start the level over.\nGreen Square Buttons create extra green tiles that you can use to get the DuBlox to the end of the level. Press the Green Square Button again and the tiles will disappear.\nFor Orange Diamond Buttons to work they must be pressed down at the same time with the DuBlox standing-up. These Buttons create orange tiles that can be used to get the DuBlox to the end of the level.\nThe Yellow Circle button is a mystery. Press it and see what happens. Good Luck!!!",
    "url": "http://hoodamath.com//games/dublox.php",
    "name": "DuBlox",
    "image_url": "http://www.hooda.info/math-games/images/dublox.jpg"
  },
  {
    "description": "- The raft can carry only 2 people/animals crossing.\n- The black goat cannot be left with any of the white goatlings unless the white goat is present.\n- The white goat cannot be left with any of the black goatlings unless the black goat is present.\n- The wolf cannot stay with any of the goats unless the farmer is present.\n- Only the black goat, white goat, and farmer know how to use the raft for crossing.\n- Click on the paddle to make the raft cross.",
    "url": "http://hoodamath.com//games/goatcrossing.php",
    "name": "Goat Crossing",
    "image_url": "http://www.hooda.info/math-games/images/goatcrossing.jpg"
  },
  {
    "description": "Goal is to get the Briker 2 to the gold plate on each level. Normal blue plates will support the Briker 2 in any position. Wood plates can only support half of the Briker's weight. Plates with holes only support the Briker 2 once, then they break, they are fragile. Pink plates with arrows, spring your briker 2 in all kinds of directions. To avoid this, make sure you put all your briker's weight on a springy plate. Green plates teleport the briker 2 to a new position on the board. Red plates on bridge plates, and will create more plates on the board if the briker 2 puts all of its weight on them. Finally windows, will restrict your movement on the board. So make sure your briker does not fall on them.",
    "url": "http://hoodamath.com//games/briker2.php",
    "name": "Briker 2",
    "image_url": "http://www.hooda.info/math-games/images/briker2.jpg"
  },
  {
    "description": "Your goal is to make enough money selling ice cream to move on to the next city. You will have ten days to reach the required amount of money. You will need to make more money for each city as you pass to higher levels.",
    "url": "http://hoodamath.com//games/icecreamtruck.php",
    "name": "Ice Cream Truck",
    "image_url": "http://www.hooda.info/math-games/images/icecreamtruck.jpg"
  },
  {
    "description": "Choose to Play the Computer or a Friend in a game of Water Balloons. Hold down mouse button and drag to prepare water balloons toss. Let go of the mouse button when you have the correct angle and velocity, you want for the water balloons game.",
    "url": "http://hoodamath.com//games/waterballoons.php",
    "name": "Water Balloons",
    "image_url": "http://www.hooda.info/math-games/images/waterballoons.jpg"
  },
  {
    "description": "You must remove all orange shapes in order to win. Click on the orange shape to remove it! You cannot click on the orange shapes with sunglasses. However, you can click on all the blue shapes! You must save all green shapes! You cannot click on the green shapes. You can press the \"R\" key to restart. There are 4 different gravity forces in Orange Alert. Check the face of each shape to see the direction they will fall. Try to pass all 50 levels of Orange Alert and then go play or create custom Orange Alert levels.",
    "url": "http://hoodamath.com//games/orangealert.php",
    "name": "Orange Alert",
    "image_url": "http://www.hooda.info/math-games/images/orangealert.jpg"
  },
  {
    "description": "Help Annie and Mark get together in this adventure.\n            Click on the red magic boxes and Annie and Mark's Adventure begins.\n            Every level has a new trick for you to solve as Annie and Mark go on their adventure.\n            Don't forget to submit your Annie and Mark's Adventure high score.\n            Share with your friends by clicking the \"t\" for twitter and the \"f\" for facebook.",
    "url": "http://hoodamath.com//games/annieandmarksadventure.php",
    "name": "Annie and Mark's Adventure",
    "image_url": "http://www.hooda.info/math-games/images/annieandmarksadventure.jpg"
  },
  {
    "description": "Click panels in your selected order. Items you click will grow and grow with each turn. You will complete the game when all panels' level is max. They effect each other as they grow. So you have to think about the clicking order.",
    "url": "http://hoodamath.com//games/growfarm.php",
    "name": "Grow Farm",
    "image_url": "http://www.hooda.info/math-games/images/growfarm.jpg"
  },
  {
    "description": "Stack Toys!\n      - 25 levels of toy stacking fun\n      - 3 themes \n      - Unlike other stacking games, here you stack toys and other random objects!",
    "url": "http://hoodamath.com//games/toystackers.php",
    "name": "Toy Stackers",
    "image_url": "http://www.hooda.info/math-games/images/toystackers.jpg"
  },
  {
    "description": "- The object of the game is to spend exactly the goal amount.\n- First you must dress the girl in a top, bottom, and shoes.\n- Pick a clothing item and drag it over to the girl\n- Pay attention to the \"Spent\" amount to match it with the \"Goal\" amount\n- If not the correct amount, try another outfit.\n- Dress Up Math is now available on the Ipad.",
    "url": "http://hoodamath.com//games/dressupmath.php",
    "name": "Dress Up Math",
    "image_url": "http://www.hooda.info/math-games/images/dressupmath.jpg"
  },
  {
    "description": "Pick a boy or girl skater.\n            Choose your skater math arithmetic subject.\n            You can use your mouse or the number keys to answer the skater math questions.\n            Make sure you don't press the correct answer until your skater is ready to jump over the obstruction.\n            You have 3 guys to go as far as you can in skater math.\n            Are you the top skater math skateboarder?",
    "url": "http://hoodamath.com//games/skatermath.php",
    "name": "Skater Math",
    "image_url": "http://www.hooda.info/math-games/images/skatermath.jpg"
  },
  {
    "description": "Choose Arithmetic Subject.\n            Choose Practice to play without Monsters.\n            Choose Play to compete for high scores.\n            You use arrow keys to move and space bar to eat.\n            Or you can click on the correct answers and the Green Guy will move automatically.",
    "url": "http://hoodamath.com//games/numbereaters.php",
    "name": "Number Eaters",
    "image_url": "http://www.hooda.info/math-games/images/numbereaters.jpg"
  },
  {
    "description": "Navigate the light to the exit. Left or Up Arrow light goes up. Right or Down Arrow light goes down. P Key to pause the game.",
    "url": "http://hoodamath.com//games/lighto.php",
    "name": "Lighto",
    "image_url": "http://www.hooda.info/math-games/images/lighto.jpg"
  },
  {
    "description": "To Start: Levels 1, 2, and 3 are Tutorials. Click Once on each of the buttons that are surrounded by glowing waves. You will be Saving My Robotos by first programming what the Robotos should do (yes they all move to the same program). Then by pressing the Play button you will save my Robotos to the green teleport points. If something goes wrong, press the 'Stop' button, make necessary changes in program and try again to save my robotos. You can clear your program in two ways: You can delete\n          each instruction one by one using the back button or you can press the \"c\" to clear all.",
    "url": "http://hoodamath.com//games/savemyrobotos.php",
    "name": "Save My Robotos",
    "image_url": "http://www.hooda.info/math-games/images/savemyrobotos.jpg"
  },
  {
    "description": "Drag and Drop direction signs for Blindy to follow. Click door to start. Get all slices of cheese to finish each level. Direct Blindy to the exit door. Large cheese circles are Bonus points. Avoid mouse traps, water, cats and electric shockers. Don't forget to submit your high score.",
    "url": "http://hoodamath.com//games/blindy.php",
    "name": "Blindy",
    "image_url": "http://www.hooda.info/math-games/images/blindy.jpg"
  },
  {
    "description": "Choose your operation ( + , - , x , / ). Pick a Tiara and a Gown. Make sure the numbers for each fit the equation on the upper right. Each level adds new tiaras and gowns. Pass all ten levels and enter your score. You win 3 minutes to dress up the princess any way you like!",
    "url": "http://hoodamath.com//games/princessmath.php",
    "name": "Princess Math",
    "image_url": "http://www.hooda.info/math-games/images/princessmath.jpg"
  },
  {
    "description": "Use your multiplication facts to beat the computer. Use your mouse to move the markers. You and the computer take turns moving one marker at a time. Get 4 in a row before the computer and you win.",
    "url": "http://hoodamath.com//games/multiplicationgame.php",
    "name": "Multiplication Game",
    "image_url": "http://www.hooda.info/math-games/images/multiplicationgame.jpg"
  },
  {
    "description": "To complete a Magnetic Moment level put the white Magnetic Moment ball in the basket. Use the magnets to move the ball. Red magnets draw in the ball. Blue Magnets push the ball away. After you set-up the magnets to create a Magnetic Moment press the play button to see if your Magnetic Moment puts the ball in the basket.",
    "url": "http://hoodamath.com//games/magneticmoment.php",
    "name": "Magnetic Moment",
    "image_url": "http://www.hooda.info/math-games/images/magneticmoment.jpg"
  },
  {
    "description": "Pi plus Simon equals Pimon. Repeat the pattern the computer plays first. Remember you are memorizing Pi. So the more numbers you memorize of Pi, the further you can get each time you play",
    "url": "http://hoodamath.com//games/pimon.php",
    "name": "Pimon",
    "image_url": "http://www.hooda.info/math-games/images/pimon.jpg"
  },
  {
    "description": "Use Arrow Keys to move. Eat factors of the given multiple. Avoid numbers that are not factors of the given multiple. Avoid Monsters. Left over Bonus Time is added to the Score at the end of each level.",
    "url": "http://hoodamath.com//games/factorfeeder.php",
    "name": "Factor Feeder",
    "image_url": "http://www.hooda.info/math-games/images/factorfeeder.jpg"
  },
  {
    "description": "Match Rows and Columns of Pickies of the same color to remove them from the board.\nNinja removes removes 1 Pickie from the board.\nJoker matches any color in a row.\nExplosive removes complete rows and columns of Pickies it intersects.\nStars catch it to get a bonus.\nComplete enough rows and columns of Pickies to complete a level.",
    "url": "http://hoodamath.com//games/pickies2.php",
    "name": "Pickies 2",
    "image_url": "http://www.hooda.info/math-games/images/pickies2.jpg"
  },
  {
    "description": "Your goal is to reach enemy ground, the red area on the top. You are moving by drawing a line. You can move only by one square (vertical, horizontal, diagonal moves are allowed). You can’t draw new line on existing line. If you end your move on point where another line ends, or a few other lines has a joint, you are able to perform another move. In this way you can do many moves in one turn, it’s even possible to go cross all map by doing one huge combo. There are 5 modes of game depending on intelligence of your computer opponent.",
    "url": "http://hoodamath.com//games/linebounder.php",
    "name": "Line Bounder",
    "image_url": "http://www.hooda.info/math-games/images/linebounder.jpg"
  },
  {
    "description": "First, click a creation button to create a block.\nIf the block coincides with the structure, the construction bar (yellow) will increase, otherwise the error bar (red) will be increased.\nPlace the cursor on the construction bar to determine the actual percentage of the construction that is completed and the necessary percentage to finish the level.\nPosition the cursor on the error bar to find the current and maximum error for the current level.\nClick on the building arrow to change the position of the created blocks.\nRemember: you can use additional blocks to complete the construction, but do not exceed the max error margin.\nYou can continue to improve the structure (for a higher score) or press the \"next\" button to go to the next level.",
    "url": "http://hoodamath.com//games/babeltowerbuilder.php",
    "name": "Babel Tower Builder",
    "image_url": "http://www.hooda.info/math-games/images/babeltowerbuilder.jpg"
  },
  {
    "description": "Click on the NeiroNet units to pick them up. Click again to place them in the location of your choice. When you have all the units set, press Start. The object is to get the ball from the starting point to the ending point. The ball needs to be the color of the arrows to be redirected. There are also color changers and color mixers.",
    "url": "http://hoodamath.com//games/neironet.php",
    "name": "NeiroNet",
    "image_url": "http://www.hooda.info/math-games/images/neironet.jpg"
  },
  {
    "description": "Your Mission: To get each color SpreadPath eyeball to its matching color tile.\n Press [SPACEBAR] or Mouse Click a creature to make all the creatures with Petals spread. Those eyeballs without petals cannot spread down any path.\n Mouse Click buttons to open or to close spreadpath. Closed Buttons, creatures don't spread over them.\n Portals are connected in a mysterious way, use them to spread path.\n Mix a red SpreadPath creature and a blue SpreadPath creature to produce a purple SpreadPath creature.\n Water drops change the color of the SpreadPath creature who drinks it.\n SpreadPath creatures don't spread over a stone. Move it to control spreadpaths.\n Drag empty bridges through water. Spreadpath creatures don't spread over water, but they can spread on bridges. You cannot move bridges with Spreadpath creatures on them.\n Click on a bomb to explode it. Bombs destroy all the SpreadPath creatures in its neighboring cells.\n Portals have the power to double things, like stones.",
    "url": "http://hoodamath.com//games/spreadpath.php",
    "name": "SpreadPath",
    "image_url": "http://www.hooda.info/math-games/images/spreadpath.jpg"
  },
  {
    "description": "Press the button once to Deal. Click on the equivalent fractions, then press the Draw button. You get 2 points for one pair, 4 points for two pairs, 6 points for three of a kind, 18 points for a full house, and 40 points for 4 of a kind. Cash out when you are ready to save your high score.",
    "url": "http://hoodamath.com//games/fractionpoker.php",
    "name": "Fraction Poker",
    "image_url": "http://www.hooda.info/math-games/images/fractionpoker.jpg"
  },
  {
    "description": "Select the heaviest object. Compare the toys on the see saws and use logic to figure out which toy is the heaviest.",
    "url": "http://hoodamath.com//games/seesawlogic.php",
    "name": "Seesaw Logic",
    "image_url": "http://www.hooda.info/math-games/images/seesawlogic.jpg"
  },
  {
    "description": "Use your mouse to move the desks and tables around. Your goal is to remove the desk that has a blue glow under it and a globe on top of it. The door is at the lower left of the room that is where you want to move the teachers desk to. Pay attention to the chalk board and write down the level code you are stuck on. Next time you come play Desk Movement you can enter the code and start where you left off.",
    "url": "http://hoodamath.com//games/deskmovement.php",
    "name": "Desk Movement",
    "image_url": "http://www.hooda.info/math-games/images/deskmovement.jpg"
  },
  {
    "description": "Help the carpenter with his job. Before you cut a plank, there are no second chances if you make a mistake. So remember the carpenter's saying: Measure Twice and Cut Once!",
    "url": "http://hoodamath.com//games/carpenterscut.php",
    "name": "Carpenter's Cut",
    "image_url": "http://www.hooda.info/math-games/images/carpenterscut.jpg"
  },
  {
    "description": "A correct answer makes your tree grow stronger with roots and trunk. An incorrect answer makes the trunk grow without the roots of life and your tree can begin to tip. After 2 wrong answers the tree will begin to wobble, and your game is over when you have 3 wrong answers, so take your time.",
    "url": "http://hoodamath.com//games/therootsoflife.php",
    "name": "The Roots of Life",
    "image_url": "http://www.hooda.info/math-games/images/therootsoflife.jpg"
  },
  {
    "description": "Click in the center of a number. Drag straightly from left to right. Make an ascending/descending diagonal or a horizontal line. When you reach the end of your formula, release mouse button.",
    "url": "http://hoodamath.com//games/mathfind.php",
    "name": "Math Find",
    "image_url": "http://www.hooda.info/math-games/images/mathfind.jpg"
  },
  {
    "description": "Drag lines across Shape to divide. 1)2 tells you how many pieces you need to divide the shape into. 1x 1, tells you how many lines you can draw.",
    "url": "http://hoodamath.com//games/slicegeom.php",
    "name": "Slice Geom",
    "image_url": "http://www.hooda.info/math-games/images/slicegeom.jpg"
  },
  {
    "description": "Press \"Y\" if the number is Prime. Press \"N\" if the number is Composite (not prime). You have 3 prime landing ships, so play carefully and get each prime landing to the platform before it crashes.",
    "url": "http://hoodamath.com//games/primelanding.php",
    "name": "Prime Landing",
    "image_url": "http://www.hooda.info/math-games/images/primelanding.jpg"
  }
]
    },
    {
      name: "educreations",
      logo_url: "/tools/educreations.png",
      description: "Teacher-recorded whiteboard sessions",
      markets: "",
      resources:
[
  {
    "name": "1492-1650s New France, New Netherland, Roanoke",
    "image_url": "http://media.educreations.com/recordings/fb7/301522/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/1492-1650s-new-france-new-netherland-roanoke/301522/",
    "description": "\n1492-1650s New France, New Netherland, Roanoke\n\nby R Weiss"
  },
  {
    "name": "3.8 Convert From Slope-Intercept To Standard Form",
    "image_url": "http://media.educreations.com/recordings/ce1/339915/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/convert-from-slope-intercept-to-standard-form/339915/",
    "description": "\n3.8 Convert From Slope-Intercept To Standard Form\n\nby Debra Schneider"
  },
  {
    "name": "3.8 Convert Standard Form To Slope-Intercept Form",
    "image_url": "http://media.educreations.com/recordings/477/334520/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/convert-standard-form-to-slope-intercept-form/334520/",
    "description": "\n3.8 Convert Standard Form To Slope-Intercept Form\n\nby Debra Schneider"
  },
  {
    "name": "8 Literary Devices",
    "image_url": "http://media.educreations.com/recordings/294/293405/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/8-literary-devices/293405/",
    "description": "\n8 Literary Devices\n\nby Lorie Briggs"
  },
  {
    "name": "Adding & Subtracting Fractions With Unlike Denominators",
    "image_url": "http://media.educreations.com/recordings/17c/308907/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/adding-subtracting-fractions-with-unlike-denominat/308907/",
    "description": "\nAdding & Subtracting Fractions With Unlike Denominators\n\nby Nicole Garcia"
  },
  {
    "name": "Adding And Subtracting Mixed Numbers",
    "image_url": "http://media.educreations.com/recordings/c5e/296905/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/adding-and-subtracting-mixed-numbers/296905/",
    "description": "\nAdding And Subtracting Mixed Numbers\n\nby Suzanne Barker"
  },
  {
    "name": "Adding and Subtracting Polynomials",
    "image_url": "http://media.educreations.com/recordings/b7b/339862/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/adding-and-subtracting-polynomials/339862/",
    "description": "\nAdding and Subtracting Polynomials\n\nby Lisa Henry"
  },
  {
    "name": "Adj Basic One",
    "image_url": "http://media.educreations.com/recordings/559/324059/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/adj-basic-one/324059/",
    "description": "\nAdj Basic One\n\nby Amanda Bautista"
  },
  {
    "name": "Agonist/Antagonist Muscle Pairings",
    "image_url": "http://media.educreations.com/recordings/d3e/375924/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/agonistantagonist-muscle-pairings/375924/",
    "description": "\nAgonist/Antagonist Muscle Pairings\n\nby Allistair Williamson"
  },
  {
    "name": "Algebra LT 6.5",
    "image_url": "http://media.educreations.com/recordings/d7f/300328/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/algebra-lt-65/300328/",
    "description": "\nAlgebra LT 6.5\n\nby Madison Atwood"
  },
  {
    "name": "Algebra LT 6.7",
    "image_url": "http://media.educreations.com/recordings/4c9/300076/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/algebra-lt-67/300076/",
    "description": "\nAlgebra LT 6.7\n\nby Madison Atwood"
  },
  {
    "name": "Angle Bisectors / Incenter",
    "image_url": "http://media.educreations.com/recordings/9da/335337/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/angle-bisectors-incenter/335337/",
    "description": "\nAngle Bisectors / Incenter\n\nby Latryce Cole"
  },
  {
    "name": "AR Verb Conjugation part 2",
    "image_url": "http://media.educreations.com/recordings/dfa/334516/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/ar-verb-conjugation-part-2/334516/",
    "description": "\nAR Verb Conjugation part 2\n\nby Christopher Wong"
  },
  {
    "name": "Area Under The Curve",
    "image_url": "http://media.educreations.com/recordings/b36/352301/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/area-under-the-curve/352301/",
    "description": "\nArea Under The Curve\n\nby Peter Tomilson"
  },
  {
    "name": "Atomic Theory",
    "image_url": "http://media.educreations.com/recordings/801/374241/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/atomic-theory/374241/",
    "description": "\nAtomic Theory\n\nby Chris Ming"
  },
  {
    "name": "Balancing Equations",
    "image_url": "http://media.educreations.com/recordings/dad/393718/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/balancing-equations/393718/",
    "description": "\nBalancing Equations\n\nby Diann Mazingo"
  },
  {
    "name": "Basic Alkane Name Combustion",
    "image_url": "http://media.educreations.com/recordings/6b9/322217/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/basic-alkane-name-combustion/322217/",
    "description": "\nBasic Alkane Name Combustion\n\nby Frank Dill"
  },
  {
    "name": "Bb Major Scale In concert Pitch",
    "image_url": "http://media.educreations.com/recordings/f41/347510/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/bb-major-scale-in-concert-pitch/347510/",
    "description": "\nBb Major Scale In concert Pitch\n\nby Nate Weiss"
  },
  {
    "name": "Binary Numbers",
    "image_url": "http://media.educreations.com/recordings/7c7/472220/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/binary-numbers/472220/",
    "description": "\nBinary Numbers\n\nby Jenny Smith"
  },
  {
    "name": "Body Paragraph-TIEE",
    "image_url": "http://media.educreations.com/recordings/817/420122/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/body-paragraph-tiee/420122/",
    "description": "\nBody Paragraph-TIEE\n\nby Ms. Mumley"
  },
  {
    "name": "Bunt Coverage Runner On 1st",
    "image_url": "http://media.educreations.com/recordings/aa2/465098/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/bunt-coverage-runner-on-1st/465098/",
    "description": "\nBunt Coverage Runner On 1st\n\nby Danny Harbert"
  },
  {
    "name": "Butte",
    "image_url": "http://media.educreations.com/recordings/3bf/296631/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/butte/296631/",
    "description": "\nButte\n\nby Jill Brandeberry"
  },
  {
    "name": "Calcium Chloride",
    "image_url": "http://media.educreations.com/recordings/a79/299082/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/calcium-chloride/299082/",
    "description": "\nCalcium Chloride\n\nby Christopher Rozitis"
  },
  {
    "name": "Calculus Optimization of Volume",
    "image_url": "http://media.educreations.com/recordings/55c/390770/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/calculus-optimization-of-volume/390770/",
    "description": "\nCalculus Optimization of Volume\n\nby David Johns"
  },
  {
    "name": "Carbohydrates",
    "image_url": "http://media.educreations.com/recordings/49a/394743/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/carbohydrates/394743/",
    "description": "\nCarbohydrates\n\nby Praci S"
  },
  {
    "name": "Cell Division",
    "image_url": "http://media.educreations.com/recordings/32c/336487/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/cell-division/336487/",
    "description": "\nCell Division\n\nby Barbara Gibson"
  },
  {
    "name": "Chords",
    "image_url": "http://media.educreations.com/recordings/726/345511/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/chords/345511/",
    "description": "\nChords\n\nby Kate Cheal"
  },
  {
    "name": "Classifying Triangles",
    "image_url": "http://media.educreations.com/recordings/2b7/335365/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/classifying-triangles/335365/",
    "description": "\nClassifying Triangles\n\nby Latryce Cole"
  },
  {
    "name": "Columbian Exchange and Exploration, Spain And The Protestant Reformation",
    "image_url": "http://media.educreations.com/recordings/319/301467/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/columbian-exchange-and-exploration-spain-and-the-p/301467/",
    "description": "\nColumbian Exchange and Exploration, Spain And The Protestant Reformation\n\nby R Weiss"
  },
  {
    "name": "Confederate States",
    "image_url": "http://media.educreations.com/recordings/9e8/494821/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/confederate-states/494821/",
    "description": "\nConfederate States\n\nby Kevin Aycock"
  },
  {
    "name": "Conflicts in 2 Stories - Analyzing Plot",
    "image_url": "http://media.educreations.com/recordings/357/182370/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/conflicts-in-2-stories-analyzing-plot/182370/",
    "description": "\nConflicts in 2 Stories - Analyzing Plot\n\nby Joan Griffin"
  },
  {
    "name": "Creating Citations with Links",
    "image_url": "http://media.educreations.com/recordings/644/353591/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/creating-citations-with-links/353591/",
    "description": "\nCreating Citations with Links\n\nby Ian Fraser"
  },
  {
    "name": "Definite Integral",
    "image_url": "http://media.educreations.com/recordings/fa5/314635/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/definite-integral/314635/",
    "description": "\nDefinite Integral\n\nby Nate Speidel"
  },
  {
    "name": "Density Problems",
    "image_url": "http://media.educreations.com/recordings/eaa/335019/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/density-problems/335019/",
    "description": "\nDensity Problems\n\nby Cathy Longley-Cook"
  },
  {
    "name": "Derivative Of Inverse Trig Functions",
    "image_url": "http://media.educreations.com/recordings/082/453945/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/derivative-of-inverse-trig-functions/453945/",
    "description": "\nDerivative Of Inverse Trig Functions\n\nby Kellie Gabriel"
  },
  {
    "name": "Derivative Of Log base a",
    "image_url": "http://media.educreations.com/recordings/539/437475/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/derivative-of-log-base-a/437475/",
    "description": "\nDerivative Of Log base a\n\nby Kellie Gabriel"
  },
  {
    "name": "Derivative Of Natural Log Function",
    "image_url": "http://media.educreations.com/recordings/078/372249/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/derivative-of-natural-log-function/372249/",
    "description": "\nDerivative Of Natural Log Function\n\nby Kellie Gabriel"
  },
  {
    "name": "Diamond Press",
    "image_url": "http://media.educreations.com/recordings/440/289683/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/diamond-press/289683/",
    "description": "\nDiamond Press\n\nby Joe Driscoll"
  },
  {
    "name": "Dihybrid Cross",
    "image_url": "http://media.educreations.com/recordings/660/352799/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/dihybrid-cross/352799/",
    "description": "\nDihybrid Cross\n\nby Joanne Purdy"
  },
  {
    "name": "DNA Structure Intro",
    "image_url": "http://media.educreations.com/recordings/ac7/369420/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/dna-structure-intro/369420/",
    "description": "\nDNA Structure Intro\n\nby Mark Davis"
  },
  {
    "name": "Eg6 V2",
    "image_url": "http://media.educreations.com/recordings/1e3/296160/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/eg6-v2/296160/",
    "description": "\nEg6 V2\n\nby Luis Lioe"
  },
  {
    "name": "Electron Configuration Lesson",
    "image_url": "http://media.educreations.com/recordings/63e/295024/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/electron-configuration-lesson/295024/",
    "description": "\nElectron Configuration Lesson\n\nby Carma Poppens"
  },
  {
    "name": "Energy Of A Photon",
    "image_url": "http://media.educreations.com/recordings/401/328257/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/energy-of-a-photon/328257/",
    "description": "\nEnergy Of A Photon\n\nby Douglas Errett"
  },
  {
    "name": "Extra Credit",
    "image_url": "http://media.educreations.com/recordings/28e/308360/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/extra-credit/308360/",
    "description": "\nExtra Credit\n\nby James Parsons"
  },
  {
    "name": "Factoring ax^2 + bx + c",
    "image_url": "http://media.educreations.com/recordings/a47/397313/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/factoring-ax2-bx-c/397313/",
    "description": "\nFactoring ax^2 + bx + c\n\nby Lisa Henry"
  },
  {
    "name": "Factoring Quadratics With Leading Coefficient 2",
    "image_url": "http://media.educreations.com/recordings/038/415555/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/factoring-quadratics-with-leading-coefficient-2/415555/",
    "description": "\nFactoring Quadratics With Leading Coefficient 2\n\nby Dominique Huffman"
  },
  {
    "name": "Factoring Using The GCF",
    "image_url": "http://media.educreations.com/recordings/68e/392974/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/factoring-using-the-gcf/392974/",
    "description": "\nFactoring Using The GCF\n\nby Lisa Henry"
  },
  {
    "name": "Fibonacci Sequence Investigation",
    "image_url": "http://media.educreations.com/recordings/c09/294734/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/fibonacci-sequence-investigation/294734/",
    "description": "\nFibonacci Sequence Investigation\n\nby Will Emeny"
  },
  {
    "name": "Final Exam Review - Problem 56",
    "image_url": "http://media.educreations.com/recordings/8ff/335945/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/final-exam-review-problem-56/335945/",
    "description": "\nFinal Exam Review - Problem 56\n\nby Jorge Salas"
  },
  {
    "name": "Final Exam Review - Problem 57",
    "image_url": "http://media.educreations.com/recordings/dc1/335965/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/final-exam-review-problem-57/335965/",
    "description": "\nFinal Exam Review - Problem 57\n\nby Jorge Salas"
  },
  {
    "name": "Final Exam Review - Problem 59",
    "image_url": "http://media.educreations.com/recordings/1f2/336712/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/final-exam-review-problem-59/336712/",
    "description": "\nFinal Exam Review - Problem 59\n\nby Jorge Salas"
  },
  {
    "name": "Finding the mean of a set of numbers",
    "image_url": "http://media.educreations.com/recordings/161/394490/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/finding-the-mean-of-a-set-of-numbers/394490/",
    "description": "\nFinding the mean of a set of numbers\n\nby Janet  Harris"
  },
  {
    "name": "Formation Of The Moon",
    "image_url": "http://media.educreations.com/recordings/d5c/472127/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/formation-of-the-moon/472127/",
    "description": "\nFormation Of The Moon\n\nby Jake Boerhave"
  },
  {
    "name": "Four Types of Confict - Analyzing Plot",
    "image_url": "http://media.educreations.com/recordings/2ce/182367/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/four-types-of-confict-analyzing-plot/182367/",
    "description": "\nFour Types of Confict - Analyzing Plot\n\nby Joan Griffin"
  },
  {
    "name": "Future Tense",
    "image_url": "http://media.educreations.com/recordings/f50/332841/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/future-tense/332841/",
    "description": "\nFuture Tense\n\nby Sarah Robinson"
  },
  {
    "name": "Geometric And Telescoping Infinite Series",
    "image_url": "http://media.educreations.com/recordings/3f0/386563/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/geometric-and-telescoping-infinite-series/386563/",
    "description": "\nGeometric And Telescoping Infinite Series\n\nby Praci S"
  },
  {
    "name": "Heart Disease",
    "image_url": "http://media.educreations.com/recordings/12d/361309/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/heart-disease/361309/",
    "description": "\nHeart Disease\n\nby Mara Natale"
  },
  {
    "name": "Hinduism, Part 2",
    "image_url": "http://media.educreations.com/recordings/415/373099/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/hinduism-part-2/373099/",
    "description": "\nHinduism, Part 2\n\nby Robin Montgomery"
  },
  {
    "name": "House Ed Committee Bills",
    "image_url": "http://media.educreations.com/recordings/4bd/349563/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/house-ed-committee-bills/349563/",
    "description": "\nHouse Ed Committee Bills\n\nby Ben Riley"
  },
  {
    "name": "How Does The Internet Work?",
    "image_url": "http://media.educreations.com/recordings/538/394489/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/how-does-the-internet-work/394489/",
    "description": "\nHow Does The Internet Work?\n\nby Nathan Still"
  },
  {
    "name": "How To Balance A Chemical Equation",
    "image_url": "http://media.educreations.com/recordings/e32/337432/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/how-to-balance-a-chemical-equation/337432/",
    "description": "\nHow To Balance A Chemical Equation\n\nby Britta Lindberg"
  },
  {
    "name": "How To Be Successful In Chemistry",
    "image_url": "http://media.educreations.com/recordings/7c6/337835/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/how-to-be-successful-in-chemistry/337835/",
    "description": "\nHow To Be Successful In Chemistry\n\nby Chris Ming"
  },
  {
    "name": "Impulse Momentum Theorem",
    "image_url": "http://media.educreations.com/recordings/c90/495813/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/impulse-momentum-theorem/495813/",
    "description": "\nImpulse Momentum Theorem\n\nby Mike Maloney"
  },
  {
    "name": "Inf2",
    "image_url": "http://media.educreations.com/recordings/dee/449011/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/inf2/449011/",
    "description": "\nInf2\n\nby Michelle McDonnell"
  },
  {
    "name": "Integration By Parts",
    "image_url": "http://media.educreations.com/recordings/fc4/391768/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/integration-by-parts/391768/",
    "description": "\nIntegration By Parts\n\nby Michael Griffis"
  },
  {
    "name": "Intro To Classical Genetics For 7th Gr",
    "image_url": "http://media.educreations.com/recordings/985/335998/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/intro-to-classical-genetics-for-7th-gr/335998/",
    "description": "\nIntro To Classical Genetics For 7th Gr\n\nby Vicki Turner"
  },
  {
    "name": "Intro to Hinduism",
    "image_url": "http://media.educreations.com/recordings/ae2/365429/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/intro-to-hinduism/365429/",
    "description": "\nIntro to Hinduism\n\nby Robin Montgomery"
  },
  {
    "name": "Introducing Basic Fraction Strings",
    "image_url": "http://media.educreations.com/recordings/e09/182514/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/introducing-basic-fraction-strings/182514/",
    "description": "\nIntroducing Basic Fraction Strings\n\nby Shaun Errichiello"
  },
  {
    "name": "Ions",
    "image_url": "http://media.educreations.com/recordings/206/499095/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/ions/499095/",
    "description": "\nIons\n\nby Chris Ming"
  },
  {
    "name": "Jamming Lesson 02",
    "image_url": "http://media.educreations.com/recordings/936/353378/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/jamming-lesson-02/353378/",
    "description": "\nJamming Lesson 02\n\nby Chris Hutchinson"
  },
  {
    "name": "Jamming Main Task",
    "image_url": "http://media.educreations.com/recordings/479/324588/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/jamming-main-task/324588/",
    "description": "\nJamming Main Task\n\nby Chris Hutchinson"
  },
  {
    "name": "Joint Movements",
    "image_url": "http://media.educreations.com/recordings/76d/376234/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/joint-movements/376234/",
    "description": "\nJoint Movements\n\nby Allistair Williamson"
  },
  {
    "name": "Keynote Tools Menu",
    "image_url": "http://media.educreations.com/recordings/e1a/480838/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/keynote-tools-menu/480838/",
    "description": "\nKeynote Tools Menu\n\nby Tamara Hergert"
  },
  {
    "name": "KHM LT6",
    "image_url": "http://media.educreations.com/recordings/e69/298058/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/khm-lt6/298058/",
    "description": "\nKHM LT6\n\nby Megan Olson"
  },
  {
    "name": "Law of Conservation",
    "image_url": "http://media.educreations.com/recordings/4ec/365754/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/law-of-conservation/365754/",
    "description": "\nLaw of Conservation\n\nby Chris Ming"
  },
  {
    "name": "Lesson 1 Goaltender Academy",
    "image_url": "http://media.educreations.com/recordings/211/389359/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/lesson-1-goaltender-academy/389359/",
    "description": "\nLesson 1 Goaltender Academy\n\nby Andrew Wheelock"
  },
  {
    "name": "Lesson 5.1 Part 2",
    "image_url": "http://media.educreations.com/recordings/d3b/335935/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/lesson-51-part-2/335935/",
    "description": "\nLesson 5.1 Part 2\n\nby Brandon Barrette"
  },
  {
    "name": "Lesson 5.7 - Adding & Subtracting Polynomials",
    "image_url": "http://media.educreations.com/recordings/81b/355433/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/lesson-57-adding-subtracting-polynomials/355433/",
    "description": "\nLesson 5.7 - Adding & Subtracting Polynomials\n\nby Brandon Barrette"
  },
  {
    "name": "Lesson 6.1 - Relations & Functions",
    "image_url": "http://media.educreations.com/recordings/bb9/415742/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/lesson-61-relations-functions/415742/",
    "description": "\nLesson 6.1 - Relations & Functions\n\nby Brandon Barrette"
  },
  {
    "name": "Lesson 6.2 - Evaluating Functions",
    "image_url": "http://media.educreations.com/recordings/388/419217/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/lesson-62-evaluating-functions/419217/",
    "description": "\nLesson 6.2 - Evaluating Functions\n\nby Brandon Barrette"
  },
  {
    "name": "Livy 21.1",
    "image_url": "http://media.educreations.com/recordings/47b/327162/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/livy-211/327162/",
    "description": "\nLivy 21.1\n\nby Bart Natoli"
  },
  {
    "name": "Long Division",
    "image_url": "http://media.educreations.com/recordings/0f0/360016/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/long-division/360016/",
    "description": "\nLong Division\n\nby Aaron Branda"
  },
  {
    "name": "Mathsville: Areas Of Complex Shapes",
    "image_url": "http://media.educreations.com/recordings/5aa/351682/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/mathsville-areas-of-complex-shapes/351682/",
    "description": "\nMathsville: Areas Of Complex Shapes\n\nby Brian Neises"
  },
  {
    "name": "Matter",
    "image_url": "http://media.educreations.com/recordings/a30/348606/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/matter/348606/",
    "description": "\nMatter\n\nby Chris Ming"
  },
  {
    "name": "Mean and Mode",
    "image_url": "http://media.educreations.com/recordings/f3d/423378/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/02012012-lesson/423378/",
    "description": "\nMean and Mode\n\nby Jason Seliskar"
  },
  {
    "name": "Mixtures",
    "image_url": "http://media.educreations.com/recordings/436/365797/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/mixtures/365797/",
    "description": "\nMixtures\n\nby Chris Ming"
  },
  {
    "name": "MLA Header And Heading",
    "image_url": "http://media.educreations.com/recordings/6ef/345157/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/mla-header-and-heading/345157/",
    "description": "\nMLA Header And Heading\n\nby Connie Born"
  },
  {
    "name": "Molarity",
    "image_url": "http://media.educreations.com/recordings/de7/495483/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/molarity/495483/",
    "description": "\nMolarity\n\nby Rhonda Smith"
  },
  {
    "name": "More Examples Of Derivative Of Natural Log Functions",
    "image_url": "http://media.educreations.com/recordings/314/372282/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/more-examples-of-derivative-of-natural-log-functio/372282/",
    "description": "\nMore Examples Of Derivative Of Natural Log Functions\n\nby Kellie Gabriel"
  },
  {
    "name": "Much Ado",
    "image_url": "http://media.educreations.com/recordings/7a7/375799/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/much-ado/375799/",
    "description": "\nMuch Ado\n\nby Praci S"
  },
  {
    "name": "Multiplying Fractions Part 1/2",
    "image_url": "http://media.educreations.com/recordings/4b3/355985/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/multiplying-fractions-part-12/355985/",
    "description": "\nMultiplying Fractions Part 1/2\n\nby Cris Lawson"
  },
  {
    "name": "Multiplying Polynomials",
    "image_url": "http://media.educreations.com/recordings/ba1/391990/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/multiplying-polynomials/391990/",
    "description": "\nMultiplying Polynomials\n\nby gingy Molacek"
  },
  {
    "name": "Multiplying Polynomials",
    "image_url": "http://media.educreations.com/recordings/3ab/349274/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/multiplying-polynomials/349274/",
    "description": "\nMultiplying Polynomials\n\nby Lisa Henry"
  },
  {
    "name": "Muscular System",
    "image_url": "http://media.educreations.com/recordings/cf8/350507/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/muscular-system/350507/",
    "description": "\nMuscular System\n\nby Allistair Williamson"
  },
  {
    "name": "Neuron Parts",
    "image_url": "http://media.educreations.com/recordings/eb9/289672/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/neuron-parts/289672/",
    "description": "\nNeuron Parts\n\nby Joe Driscoll"
  },
  {
    "name": "New Bloom's",
    "image_url": "http://media.educreations.com/recordings/e09/386861/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/new-blooms/386861/",
    "description": "\nNew Bloom's\n\nby Jennifer Shettel"
  },
  {
    "name": "Nuclear Reactions",
    "image_url": "http://media.educreations.com/recordings/1f4/420923/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/nuclear-reactions/420923/",
    "description": "\nNuclear Reactions\n\nby Chris Ming"
  },
  {
    "name": "Of Mice And Men",
    "image_url": "http://media.educreations.com/recordings/476/360800/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/of-mice-and-men/360800/",
    "description": "\nOf Mice And Men\n\nby Rob Reetz"
  },
  {
    "name": "Organizing Your iPad Home Screen: A case Study",
    "image_url": "http://media.educreations.com/recordings/23e/307244/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/organizing-your-ipad-home-screen-a-case-study/307244/",
    "description": "\nOrganizing Your iPad Home Screen: A case Study\n\nby Vicki Davis"
  },
  {
    "name": "Parallel And Intersecting Lines",
    "image_url": "http://media.educreations.com/recordings/f90/335327/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/parallel-and-intersecting-lines/335327/",
    "description": "\nParallel And Intersecting Lines\n\nby Teq PD"
  },
  {
    "name": "Particle Nature Of Light",
    "image_url": "http://media.educreations.com/recordings/349/413768/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/particle-nature-of-light/413768/",
    "description": "\nParticle Nature Of Light\n\nby Chris Ming"
  },
  {
    "name": "Perpendicular Bisector",
    "image_url": "http://media.educreations.com/recordings/7df/326375/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/perpendicular-bisector/326375/",
    "description": "\nPerpendicular Bisector\n\nby Mark Kaercher"
  },
  {
    "name": "Precalc 4.2.3",
    "image_url": "http://media.educreations.com/recordings/b82/381188/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/precalc-423/381188/",
    "description": "\nPrecalc 4.2.3\n\nby Robert Tolar"
  },
  {
    "name": "PreCalculus 4.4 - Finding 6 Trig Values When Given A Constraint",
    "image_url": "http://media.educreations.com/recordings/0e6/349566/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/precalculus-44-finding-6-trig-values-when-given-a/349566/",
    "description": "\nPreCalculus 4.4 - Finding 6 Trig Values When Given A Constraint\n\nby Kyle Kline"
  },
  {
    "name": "Prepositions",
    "image_url": "http://media.educreations.com/recordings/549/459918/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/prepositions/459918/",
    "description": "\nPrepositions\n\nby Sarah Borchert"
  },
  {
    "name": "PS Ch 9. Kinetic Theory, Temp, Thermal En",
    "image_url": "http://media.educreations.com/recordings/893/392127/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/ps-ch-9-kinetic-theory-temp-thermal-en/392127/",
    "description": "\nPS Ch 9. Kinetic Theory, Temp, Thermal En\n\nby Mary Williams"
  },
  {
    "name": "Pythagorean Theorem",
    "image_url": "http://media.educreations.com/recordings/1ab/467745/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/pythagorean-theorem/467745/",
    "description": "\nPythagorean Theorem\n\nby Jason Fournier"
  },
  {
    "name": "Pythagorean Theorem Demo",
    "image_url": "http://media.educreations.com/recordings/686/310406/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/pythagorean-theorem-demo/310406/",
    "description": "\nPythagorean Theorem Demo\n\nby Andrew Abate"
  },
  {
    "name": "Recursive To Closed Via A Table",
    "image_url": "http://media.educreations.com/recordings/7c3/460278/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/recursive-to-closed-via-a-table/460278/",
    "description": "\nRecursive To Closed Via A Table\n\nby Cindy Percival"
  },
  {
    "name": "Related Rates Quiz Question #1",
    "image_url": "http://media.educreations.com/recordings/4b7/385264/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/related-rates-quiz-question-1/385264/",
    "description": "\nRelated Rates Quiz Question #1\n\nby Kris Norris"
  },
  {
    "name": "Repaso Para Steven Johnson",
    "image_url": "http://media.educreations.com/recordings/63b/371839/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/repaso-para-steven-johnson/371839/",
    "description": "\nRepaso Para Steven Johnson\n\nby Alexander J.  Moore"
  },
  {
    "name": "RESPECT Program",
    "image_url": "http://media.educreations.com/recordings/3e8/501836/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/respect-program/501836/",
    "description": "\nRESPECT Program\n\nby Ben Riley"
  },
  {
    "name": "Rule 1 Of Exponents ",
    "image_url": "http://media.educreations.com/recordings/cb0/414030/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/rule-1-of-exponents/414030/",
    "description": "\nRule 1 Of Exponents \n\nby Erin Zaich"
  },
  {
    "name": "Secondary Break",
    "image_url": "http://media.educreations.com/recordings/e9c/292923/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/secondary-break/292923/",
    "description": "\nSecondary Break\n\nby Conor Driscoll"
  },
  {
    "name": "Share An Animoto Video",
    "image_url": "http://media.educreations.com/recordings/fae/380172/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/share-an-animoto-video/380172/",
    "description": "\nShare An Animoto Video\n\nby Tim Landefeld"
  },
  {
    "name": "Simplifying Fractions",
    "image_url": "http://media.educreations.com/recordings/64a/309001/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/simplifying-fractions/309001/",
    "description": "\nSimplifying Fractions\n\nby Nicole Garcia"
  },
  {
    "name": "Slope",
    "image_url": "http://media.educreations.com/recordings/731/329308/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/slope/329308/",
    "description": "\nSlope\n\nby Sarah Waters"
  },
  {
    "name": "Slope And Y-intercept ",
    "image_url": "http://media.educreations.com/recordings/c19/332698/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/slope-and-y-intercept/332698/",
    "description": "\nSlope And Y-intercept \n\nby Brian Sullivan"
  },
  {
    "name": "Soccer Play",
    "image_url": "http://media.educreations.com/recordings/c77/369429/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/soccer-play/369429/",
    "description": "\nSoccer Play\n\nby Kevin Hatch"
  },
  {
    "name": "Solving For Density Of A Gas",
    "image_url": "http://media.educreations.com/recordings/4aa/333783/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/solving-for-density-of-a-gas/333783/",
    "description": "\nSolving For Density Of A Gas\n\nby Megan Streeter"
  },
  {
    "name": "Solving System Of Equations",
    "image_url": "http://media.educreations.com/recordings/dfd/458814/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/solving-system-of-equations/458814/",
    "description": "\nSolving System Of Equations\n\nby Praci S"
  },
  {
    "name": "SOPA & Education",
    "image_url": "http://media.educreations.com/recordings/849/370837/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/sopa-education/370837/",
    "description": "\nSOPA & Education\n\nby Ben Riley"
  },
  {
    "name": "Spanish Gestures",
    "image_url": "http://media.educreations.com/recordings/028/476225/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/spanish-gestures/476225/",
    "description": "\nSpanish Gestures\n\nby Emily  Sparks"
  },
  {
    "name": "Symmetry",
    "image_url": "http://media.educreations.com/recordings/404/444280/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/symmetry/444280/",
    "description": "\nSymmetry\n\nby Kara Martin"
  },
  {
    "name": "Test",
    "image_url": "http://media.educreations.com/recordings/69a/322785/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/test/322785/",
    "description": "\nTest\n\nby Vanessa Hoff"
  },
  {
    "name": "The Keyboard Keys",
    "image_url": "http://media.educreations.com/recordings/65e/471087/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/the-keyboard-keys/471087/",
    "description": "\nThe Keyboard Keys\n\nby Isa Dunaway"
  },
  {
    "name": "The Real Rosie The Riveter",
    "image_url": "http://media.educreations.com/recordings/879/421219/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/the-real-rosie-the-riveter/421219/",
    "description": "\nThe Real Rosie The Riveter\n\nby Jamie Nash-Mayberry"
  },
  {
    "name": "The Skeletal System",
    "image_url": "http://media.educreations.com/recordings/0b1/305796/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/the-skeletal-system/305796/",
    "description": "\nThe Skeletal System\n\nby Allistair Williamson"
  },
  {
    "name": "Time Words: Palabras Que Indican\"tiempo\"",
    "image_url": "http://media.educreations.com/recordings/4a5/457973/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/time-words-palabras-que-indicantiempo/457973/",
    "description": "\nTime Words: Palabras Que Indican\"tiempo\"\n\nby Alexander J.  Moore"
  },
  {
    "name": "Triangle",
    "image_url": "http://media.educreations.com/recordings/e8f/292924/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/triangle/292924/",
    "description": "\nTriangle\n\nby Conor Driscoll"
  },
  {
    "name": "Triangle Sum Proof",
    "image_url": "http://media.educreations.com/recordings/a79/339229/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/01042012-lesson/339229/",
    "description": "\nTriangle Sum Proof\n\nby Erica Lee"
  },
  {
    "name": "trig negative angle identities",
    "image_url": "http://media.educreations.com/recordings/3ff/492855/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/trig-negative-angle-identities/492855/",
    "description": "\ntrig negative angle identities\n\nby David Peterson"
  },
  {
    "name": "Ultrasound",
    "image_url": "http://media.educreations.com/recordings/870/350763/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/ultrasound/350763/",
    "description": "\nUltrasound\n\nby Jim Small"
  },
  {
    "name": "Unit 1- Union And Intersection Of Rays And Segments",
    "image_url": "http://media.educreations.com/recordings/20d/386983/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/unit-1-union-and-intersection-of-rays-and-segments/386983/",
    "description": "\nUnit 1- Union And Intersection Of Rays And Segments\n\nby Debbie Mills"
  },
  {
    "name": "Using Model Drawing to Solve 4th Gr Story Problem",
    "image_url": "http://media.educreations.com/recordings/d86/307476/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/using-model-drawing-to-solve-4th-gr-story-problem/307476/",
    "description": "\nUsing Model Drawing to Solve 4th Gr Story Problem\n\nby Rebekah Hinkle"
  },
  {
    "name": "Validity And Reliability",
    "image_url": "http://media.educreations.com/recordings/7b8/410236/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/validity-and-reliability/410236/",
    "description": "\nValidity And Reliability\n\nby Cheryl Reynolds"
  },
  {
    "name": "Vocals: Accuracy",
    "image_url": "http://media.educreations.com/recordings/427/347362/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/vocals-accuracy/347362/",
    "description": "\nVocals: Accuracy\n\nby Chris Hutchinson"
  },
  {
    "name": "Ww2 Battles",
    "image_url": "http://media.educreations.com/recordings/9e3/422478/thumbnail.280x175.png",
    "url": "http://www.educreations.com//lesson/view/ww2-battles/422478/",
    "description": "\nWw2 Battles\n\nby Kathy Degregorio"
  }
]
    },
    {
      name: "PlaceKitten",
      logo_url: "/tools/place_kitten.png",
      description: "Browse kitten images",
      markets: "",
      resources: [
        {
          name: "100x100 kitten",
          image_url: "http://placekitten.com/100/100",
          html: "<img src='http://placekitten.com/100/100'/>",
          description: "I call this kitten, \"Mittens\". I don't know if the cat is male or female."
        },
        {
          name: "200x200 kitten",
          image_url: "http://placekitten.com/200/200",
          html: "<img src='http://placekitten.com/200/200'/>",
          description: "...actually, I don't know if *any* of these cats are male or female..."
        },
        {
          name: "200x100 kitten",
          image_url: "http://placekitten.com/200/100",
          html: "<img src='http://placekitten.com/200/100'/>",
          description: "This is cheating, because it is more than one cat. What's that about?"
        },
        {
          name: "100x200 kitten",
          image_url: "http://placekitten.com/100/200",
          html: "<img src='http://placekitten.com/100/200'/>",
          description: "This is also cheating. It looks suspiciously similar to 100x100..."
        },
        {
          name: "300x300 kitten",
          image_url: "http://placekitten.com/300/300",
          html: "<img src='http://placekitten.com/300/300'/>",
          description: "I have a lot to say about this kitten, even though I don't really have much to say. I just want to give an example of a blurb for a kitten that is larger than the alotted space, so you can see what happens when there are tons and tons of words. On a semi-related note, I tend to type \"tongs\" instead of \"tons\". It's not on purpose, and it's not even muscle memory because, really, how often do you type the word \"tongs\"?"
        },
        {
          name: "200x300 kitten",
          image_url: "http://placekitten.com/200/300",
          html: "<img src='http://placekitten.com/200/300'/>",
          description: "This little guy seems a bit apathetic."
        },
        {
          name: "300x200 kitten",
          image_url: "http://placekitten.com/300/200",
          html: "<img src='http://placekitten.com/300/200'/>",
          description: "Standard kitten fare."
        },
        {
          name: "300x100 kitten",
          image_url: "http://placekitten.com/300/100",
          html: "<img src='http://placekitten.com/300/100'/>",
          description: "I actually prefer puppies to kittens."
        },
        {
          name: "100x300 kitten",
          image_url: "http://placekitten.com/100/300",
          html: "<img src='http://placekitten.com/100/300'/>",
          description: "How come there's no placepuppy.com?"
        },
      ]
    },
  ];
  var $message = $("#message"),
      $tools = $("#tools"),
      $launch = $("#launch"),
      $form = $("#search"),
      $query = $("#query"),
      $logo = $("#logo"),
      $back = $("#back"),
      $collection_name = $("#collection_name"),
      $resources = $("#resources");
  function search() {
    searchMode == "tools" ? searchTools() : searchResources();
  }
  function searchTools() { 
    $message.hide();
    $resources.hide();
    $launch.hide();
    $tools.show();
    $collection_name.text("Collections");
    var query = $query.val();
    var matches = [];
    for(var idx = 0; idx < tools.length; idx++) {
      var tool = $.extend({}, tools[idx]);
      var re = new RegExp(query, "i");
      var name_idx = (tool.name || "").search(re);
      var desc_idx = (tool.description || "").search(re);
      var rank = query == "" ? 0 : -1;
      if(name_idx > -1) { rank = name_idx; }
      else if(desc_idx > -1) { rank = desc_idx + 500; }
      tool.rank = rank;
      if(tool.rank > -1) { 
        matches.push(tool);
      }
    }
    if(matches.length == 0) {
      $tools.hide();
      $message.show().text("No Results Found");
    }
    matches = matches.sort(function(a, b) {
      return a.rank - b.rank;
    });
    $tools.empty();
    for(var idx = 0; idx < matches.length; idx++) {
      var tool = matches[idx];
      var $tool = $("<div/>", {'class': 'tool'}).append(
        $("<img/>", {src: tool.logo_url, 'class': 'logo'})).append(
        $("<span/>", {'class': 'name'}).text(tool.name)).append(
        $("<span/>", {'class': 'description'}).text(tool.description));
      $tool.data('tool', tool);
      $tool.click(function() {
        var tool = $(this).data('tool');
        if(tool.launch_url) {
          location.href = tool.launch_url + "?selection_directive=embed_content&launch_presentation_return_url=" + encodeURIComponent(returnUrl);
        } else {
          $tools.hide();
          $back.show();
          $logo.attr('src', tool.logo_url);
          searchMode = "resources";
          $resources.show();
          $resources.data('tool', tool);
          $query.val("");
          search();
        }
      });
      $tools.append($tool);
    }
  }
  function searchResources() {
    $message.hide();
    $resources.show();
    $launch.hide();
    $tools.hide();
    var query = $query.val();
    var tool = $resources.data('tool');
    $collection_name.text(tool.name);
    var matches = [];
    for(var idx = 0; idx < tool.resources.length; idx++) {
      var resource = $.extend({}, tool.resources[idx]);
      var re = new RegExp(query, "i");
      var name_idx = (resource.name || "").search(re);
      var desc_idx = (resource.description || "").search(re);
      var rank = query == "" ? 0 : -1;
      if(name_idx > -1) { rank = name_idx; }
      else if(desc_idx > -1) { rank = desc_idx + 500; }
      resource.rank = rank;
      if(resource.rank > -1) { 
        matches.push(resource);
      }
    }
    if(matches.length == 0) {
      $tools.hide();
      $resources.hide();
      $message.show().text("No Results Found");
    }
    matches = matches.sort(function(a, b) {
      return a.rank - b.rank;
    });
    $resources.empty();
    for(var idx = 0; idx < matches.length; idx++) {
      var resource = matches[idx];
      var $resource = $("<div/>", {'class': 'resource'}).append(
        $("<div/>", {'class': 'name'}).text(resource.name))
      var $content = $("<div/>", {'class': 'content'});
      if(resource.image_url) {
        $content.append(
          $("<div/>", {'class': 'img_holder'}).append(
            $("<img/>", {src: resource.image_url, 'class': 'img'})
          )
        );
      }
      $content.append(
        $("<span/>", {'class': 'description'}).text(resource.description || "")
      );
      if(resource.url) {
        $content.append(
          $("<a/>", {'href': resource.url, 'class': 'preview', 'target': '_blank'}).text("preview")
        );
      }
      $resource.append($content);
      $resource.data('resource', resource);
      $resource.click(function(event) {
        if($(event.target).hasClass('preview')) { return; }
        var resource = $(this).data('resource');
        if(returnUrl) {
          if(resource.url) {
            location.href = returnUrl + "&embed_type=link&url=" + encodeURIComponent(resource.url) + "&text=" + encodeURIComponent(resource.name);
          } else if(resource.html) {
            var oembedUrl = location.protocol + "//" + location.host + "/oembed";
            var url = oembedUrl + "?code=" + encodeURIComponent(resource.html);
            location.href = returnUrl + "&embed_type=oembed&endpoint=" + encodeURIComponent(oembedUrl) + "&url=" + encodeURIComponent(url);
          }
        } else {
          alert('click');
        }
      });
      $resources.append($resource);
    }
  }
  $(document).ready(function() {
    searchTools();
    $back.click(function(event) {
      event.preventDefault();
      $tools.show();
      $back.hide();
      $logo.attr('src', $logo.attr('rel'));
      $launch.hide();
      $collection_name.text("Collections");
      $resources.hide();
      searchMode = "tools";
    });
    $form.submit(function(event) {
      event.preventDefault();
      event.stopPropagation();
      search();
    });
    $query.bind('keyup', search);
  });
})();