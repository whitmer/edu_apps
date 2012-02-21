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
      launch_url: "https://lti-examples.heroku.com/khan.html"
    },
    {
      name: "Graph Builder",
      logo_url: "/tools/graph_tk.png",
      description: "Build and embed rich interactive graphs into course content",
      markets: "",
      launch_url: "https://lti-examples.heroku.com/graph.html"
    },
    {
      name: "Quizlet Flash Cards",
      logo_url: "/tools/quizlet.png",
      description: "Search Quizlet for flash card and study tools",
      markets: "",
      launch_url: "https://lti-examples.heroku.com/quizlet.html"
    },
    {
      name: "Codecademy",
      logo_url: "/tools/codecademy.png",
      description: "Interactive programming lessons",
      markets: "",
      resources:
[
  {
    "description": "1. Getting to Know You, Part I. See what you can do with programming!",
    "image_url": "/prompt.png",
    "name": "Introduction: 1. Getting to Know You, Part I",
    "url": "/courses/programming-intro/0"
  },
  {
    "description": "2. Confirm or Deny. Alerting users and more.",
    "image_url": "/prompt.png",
    "name": "Introduction: 2. Confirm or Deny",
    "url": "/courses/programming-intro/1"
  },
  {
    "description": "3. Variables. Let's start saving what you're working on!",
    "image_url": "/prompt.png",
    "name": "Introduction: 3. Variables",
    "url": "/courses/programming-intro/2"
  },
  {
    "description": "4. Numbers n' Strings. Learning what separates text from numbers and more",
    "image_url": "/prompt.png",
    "name": "Introduction: 4. Numbers n' Strings",
    "url": "/courses/programming-intro/3"
  },
  {
    "description": "5. Editor and Arrays. The console's not the only game in town.",
    "image_url": "/prompt.png",
    "name": "Introduction: 5. Editor and Arrays",
    "url": "/courses/programming-intro/4"
  },
  {
    "description": "6. What If?. If Statements and More",
    "image_url": "/prompt.png",
    "name": "Introduction: 6. What If?",
    "url": "/courses/programming-intro/5"
  },
  {
    "description": "7. Bringing It Up (and Down). Incrementing and Decrementing",
    "image_url": "/prompt.png",
    "name": "Introduction: 7. Bringing It Up (and Down)",
    "url": "/courses/programming-intro/6"
  },
  {
    "description": "8. While You Wait. The while loop is just as useful as for!",
    "image_url": "/prompt.png",
    "name": "Introduction: 8. While You Wait",
    "url": "/courses/programming-intro/7"
  },
  {
    "description": "The only thing more fun than playing games is automating games.",
    "image_url": "/prompt.png",
    "name": "Introduction Project: Fizzing and Buzzing",
    "url": "/courses/4f08e38e9bced80001000e58"
  },
  {
    "description": "1. Defining Functions. How to define functions.",
    "image_url": "/prompt.png",
    "name": "Functions: 1. Defining Functions",
    "url": "/courses/functions-in-javascript-2-0/0"
  },
  {
    "description": "2. Variables in functions. Declaring and using variables within functions.",
    "image_url": "/prompt.png",
    "name": "Functions: 2. Variables in functions",
    "url": "/courses/functions-in-javascript-2-0/1"
  },
  {
    "description": "3. Return. Making use of 'return' in a function.",
    "image_url": "/prompt.png",
    "name": "Functions: 3. Return",
    "url": "/courses/functions-in-javascript-2-0/2"
  },
  {
    "description": "4. Function calls as values. Learning about how functions can interact.",
    "image_url": "/prompt.png",
    "name": "Functions: 4. Function calls as values",
    "url": "/courses/functions-in-javascript-2-0/3"
  },
  {
    "description": "5. Understanding parameters. How to have more than one parameter in the function.",
    "image_url": "/prompt.png",
    "name": "Functions: 5. Understanding parameters",
    "url": "/courses/functions-in-javascript-2-0/4"
  },
  {
    "description": "1. Introducing Functions. See how a function is defined and used.  Learn to define your first simple function.",
    "image_url": "/prompt.png",
    "name": "Functions: 1. Introducing Functions",
    "url": "/courses/functions_in_javascript/0"
  },
  {
    "description": "2. Understanding Parameters. Functions can accept input known as arguments. We'll explore how to work with arguments.",
    "image_url": "/prompt.png",
    "name": "Functions: 2. Understanding Parameters",
    "url": "/courses/functions_in_javascript/1"
  },
  {
    "description": "3. Local Variables. Storing data, such as intermediate values of a calculation, in variables inside of a function.",
    "image_url": "/prompt.png",
    "name": "Functions: 3. Local Variables",
    "url": "/courses/functions_in_javascript/2"
  },
  {
    "description": "Let's combine all the basics covered in the getting started lesson to create a program that calculates taxi fare based upon distance traveled and the time of day.",
    "image_url": "/prompt.png",
    "name": "Functions Project: New York, New York",
    "url": "/courses/hello_new_york"
  },
  {
    "description": "It's an Olympic year! Write a program to determine who qualifies for the Olympic team. We'll be covering primitives, functions, arrays and loops!",
    "image_url": "/prompt.png",
    "name": "Functions Project: Time Trials",
    "url": "/courses/olympic-trials"
  },
  {
    "description": "1. Review: The story so far.... We review concepts learned in previous weeks!",
    "image_url": "/prompt.png",
    "name": "Conditionals: 1. Review: The story so far...",
    "url": "/courses/conditionals-in-javascript/0"
  },
  {
    "description": "2. If else statements. Review the fundamentals of using if else statements",
    "image_url": "/prompt.png",
    "name": "Conditionals: 2. If else statements",
    "url": "/courses/conditionals-in-javascript/1"
  },
  {
    "description": "3. Using if else statements in functions. We want to see how functions can use if else statements, and how if else statements can use functions",
    "image_url": "/prompt.png",
    "name": "Conditionals: 3. Using if else statements in functions",
    "url": "/courses/conditionals-in-javascript/2"
  },
  {
    "description": "4. Introducing the Switch statement. Switch statements can help simplify long if else statements!",
    "image_url": "/prompt.png",
    "name": "Conditionals: 4. Introducing the Switch statement",
    "url": "/courses/conditionals-in-javascript/3"
  },
  {
    "description": "5. Ternary operators. We look at some nice shortcuts to make writing conditional statements easier!",
    "image_url": "/prompt.png",
    "name": "Conditionals: 5. Ternary operators",
    "url": "/courses/conditionals-in-javascript/4"
  },
  {
    "description": "6. Summary of conditionals. We provide a recap of some of the key concepts learned in this course",
    "image_url": "/prompt.png",
    "name": "Conditionals: 6. Summary of conditionals",
    "url": "/courses/conditionals-in-javascript/5"
  },
  {
    "description": "1. Review: The story so far.... We cover three issues that users have emailed asking about.",
    "image_url": "/prompt.png",
    "name": "Review: 1. Review: The story so far...",
    "url": "/courses/primitives-development-course/0"
  },
  {
    "description": "2. Strings and numbers are values. Primitive data types include both \"strings\" and numb3rs.",
    "image_url": "/prompt.png",
    "name": "Review: 2. Strings and numbers are values",
    "url": "/courses/primitives-development-course/1"
  },
  {
    "description": "3. Can it be true?. Booleans are primitives too!",
    "image_url": "/prompt.png",
    "name": "Review: 3. Can it be true?",
    "url": "/courses/primitives-development-course/2"
  },
  {
    "description": "4. Boolean in the wild. The many talents of the Boolean data type.",
    "image_url": "/prompt.png",
    "name": "Review: 4. Boolean in the wild",
    "url": "/courses/primitives-development-course/3"
  },
  {
    "description": "5. More on arrays. We can store primitive values in arrays, and then manipulate them. Sounds like fun.",
    "image_url": "/prompt.png",
    "name": "Review: 5. More on arrays",
    "url": "/courses/primitives-development-course/4"
  },
  {
    "description": "6. Random stuff!. Let's learn how to generate numbers between 1 and any number!",
    "image_url": "/prompt.png",
    "name": "Review: 6. Random stuff!",
    "url": "/courses/primitives-development-course/5"
  },
  {
    "description": "7. Summary of primitive data types. We've learned a lot about primitives. Let's make sure we remember it all.",
    "image_url": "/prompt.png",
    "name": "Review: 7. Summary of primitive data types",
    "url": "/courses/primitives-development-course/6"
  },
  {
    "description": "1. Review: The story so far.... Can you believe we've done a month of courses? Let's reminisce about all those sweet coding memories!",
    "image_url": "/prompt.png",
    "name": "Objects: 1. Review: The story so far...",
    "url": "/courses/spencer-sandbox/0"
  },
  {
    "description": "2. What's an Object. Let's start by learning how to create objects and use the information inside them",
    "image_url": "/prompt.png",
    "name": "Objects: 2. What's an Object",
    "url": "/courses/spencer-sandbox/1"
  },
  {
    "description": "3. A Method to the Madness. Learn to add methods to objects and create objects through constructors",
    "image_url": "/prompt.png",
    "name": "Objects: 3. A Method to the Madness",
    "url": "/courses/spencer-sandbox/2"
  },
  {
    "description": "4. Construction Junction. Learn to how to make constructors for objects, which allow you to define properties and methods as you create the object.",
    "image_url": "/prompt.png",
    "name": "Objects: 4. Construction Junction",
    "url": "/courses/spencer-sandbox/3"
  },
  {
    "description": "5. Combining Objects With Our Other Tools. See how objects can be used with conditionals, functions, arrays, and loops",
    "image_url": "/prompt.png",
    "name": "Objects: 5. Combining Objects With Our Other Tools",
    "url": "/courses/spencer-sandbox/4"
  },
  {
    "description": "6. Objects In Review. We review all the important aspects from this first lesson in objects.",
    "image_url": "/prompt.png",
    "name": "Objects: 6. Objects In Review",
    "url": "/courses/spencer-sandbox/5"
  },
  {
    "description": "1. Review: The story so far.... Let's review objects and introduce some new concepts to familiar constructions",
    "image_url": "/prompt.png",
    "name": "Objects: 1. Review: The story so far...",
    "url": "/courses/objects-ii/0"
  },
  {
    "description": "2. Objects, Objects Everywhere. A deeper look into the true nature of objects in JavaScript",
    "image_url": "/prompt.png",
    "name": "Objects: 2. Objects, Objects Everywhere",
    "url": "/courses/objects-ii/1"
  },
  {
    "description": "3. You Down With OOP?. Introduction to classes and the prototype",
    "image_url": "/prompt.png",
    "name": "Objects: 3. You Down With OOP?",
    "url": "/courses/objects-ii/2"
  },
  {
    "description": "4. Inheriting a Fortune. Inheritance in object-oriented programming",
    "image_url": "/prompt.png",
    "name": "Objects: 4. Inheriting a Fortune",
    "url": "/courses/objects-ii/3"
  },
  {
    "description": "5. Privacy Please!. Public and private properties and methods of objects",
    "image_url": "/prompt.png",
    "name": "Objects: 5. Privacy Please!",
    "url": "/courses/objects-ii/4"
  },
  {
    "description": "6. Objects in Review Are Closer Than They Appear. Reviewing the nature of objects and introduction to object-oriented programming",
    "image_url": "/prompt.png",
    "name": "Objects: 6. Objects in Review Are Closer Than They Appear",
    "url": "/courses/objects-ii/5"
  },
  {
    "description": "We make use of arrays, functions and for loops.",
    "image_url": "/prompt.png",
    "name": "Objects Project: Objects in address books are fun!",
    "url": "/courses/building-an-address-book"
  },
  {
    "description": "Save the day and build a cash register!",
    "image_url": "/prompt.png",
    "name": "Objects Project: Cha Ching",
    "url": "/courses/close-the-super-makert"
  },
  {
    "description": "1. Review: The story so far.... Let's review some things about objects before diving into loops!",
    "image_url": "/prompt.png",
    "name": "For / While Loops: 1. Review: The story so far...",
    "url": "/courses/loops/0"
  },
  {
    "description": "2. Review continued.... So much review we put it into TWO sections!",
    "image_url": "/prompt.png",
    "name": "For / While Loops: 2. Review continued...",
    "url": "/courses/loops/1"
  },
  {
    "description": "3. Counting with Loops. An overview of what you can do with `for` loops",
    "image_url": "/prompt.png",
    "name": "For / While Loops: 3. Counting with Loops",
    "url": "/courses/loops/2"
  },
  {
    "description": "4. Looping in Arrays and Strings. Printing arrays and strings; manipulating strings",
    "image_url": "/prompt.png",
    "name": "For / While Loops: 4. Looping in Arrays and Strings",
    "url": "/courses/loops/3"
  },
  {
    "description": "5. While Loops. Learning to use condition-based loops",
    "image_url": "/prompt.png",
    "name": "For / While Loops: 5. While Loops",
    "url": "/courses/loops/4"
  },
  {
    "description": "6. Recursion. It's recursion!",
    "image_url": "/prompt.png",
    "name": "For / While Loops: 6. Recursion",
    "url": "/courses/loops/5"
  },
  {
    "description": "7. Extra Tricks. Nesting loops, looping through objects, and using `break`",
    "image_url": "/prompt.png",
    "name": "For / While Loops: 7. Extra Tricks",
    "url": "/courses/loops/6"
  },
  {
    "description": "We cover loops and arrays!",
    "image_url": "/prompt.png",
    "name": "For / While Loops Project: Getting Dicey",
    "url": "/courses/4f1f8f67aef7bc000100e2cd"
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
            "image_url": "http://www.hooda.info/math-games/images/dublox.jpg",
            "url": "../games/dublox.php",
            "description": "",
            "name": "DuBlox"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/goatcrossing.jpg",
            "url": "../games/goatcrossing.php",
            "description": "",
            "name": "Goat Crossing"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/briker2.jpg",
            "url": "../games/briker2.php",
            "description": "",
            "name": "Briker 2"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/icecreamtruck.jpg",
            "url": "../games/icecreamtruck.php",
            "description": "",
            "name": "Ice Cream Truck"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/waterballoons.jpg",
            "url": "../games/waterballoons.php",
            "description": "",
            "name": "Water Balloons"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/orangealert.jpg",
            "url": "../games/orangealert.php",
            "description": "",
            "name": "Orange Alert"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/annieandmarksadventure.jpg",
            "url": "../games/annieandmarksadventure.php",
            "description": "",
            "name": "Annie and Mark's Adventure"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/growfarm.jpg",
            "url": "../games/growfarm.php",
            "description": "",
            "name": "Grow Farm"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/toystackers.jpg",
            "url": "../games/toystackers.php",
            "description": "",
            "name": "Toy Stackers"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/dressupmath.jpg",
            "url": "../games/dressupmath.php",
            "description": "",
            "name": "Dress Up Math"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/skatermath.jpg",
            "url": "../games/skatermath.php",
            "description": "",
            "name": "Skater Math"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/numbereaters.jpg",
            "url": "../games/numbereaters.php",
            "description": "",
            "name": "Number Eaters"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/lighto.jpg",
            "url": "../games/lighto.php",
            "description": "",
            "name": "Lighto"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/savemyrobotos.jpg",
            "url": "../games/savemyrobotos.php",
            "description": "",
            "name": "Save My Robotos"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/blindy.jpg",
            "url": "../games/blindy.php",
            "description": "",
            "name": "Blindy"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/princessmath.jpg",
            "url": "../games/princessmath.php",
            "description": "",
            "name": "Princess Math"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/multiplicationgame.jpg",
            "url": "../games/multiplicationgame.php",
            "description": "",
            "name": "Multiplication Game"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/magneticmoment.jpg",
            "url": "../games/magneticmoment.php",
            "description": "",
            "name": "Magnetic Moment"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/pimon.jpg",
            "url": "../games/pimon.php",
            "description": "",
            "name": "Pimon"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/factorfeeder.jpg",
            "url": "../games/factorfeeder.php",
            "description": "",
            "name": "Factor Feeder"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/pickies2.jpg",
            "url": "../games/pickies2.php",
            "description": "",
            "name": "Pickies 2"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/linebounder.jpg",
            "url": "../games/linebounder.php",
            "description": "",
            "name": "Line Bounder"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/babeltowerbuilder.jpg",
            "url": "../games/babeltowerbuilder.php",
            "description": "",
            "name": "Babel Tower Builder"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/neironet.jpg",
            "url": "../games/neironet.php",
            "description": "",
            "name": "NeiroNet"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/spreadpath.jpg",
            "url": "../games/spreadpath.php",
            "description": "",
            "name": "SpreadPath"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/fractionpoker.jpg",
            "url": "../games/fractionpoker.php",
            "description": "",
            "name": "Fraction Poker"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/seesawlogic.jpg",
            "url": "../games/seesawlogic.php",
            "description": "",
            "name": "Seesaw Logic"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/deskmovement.jpg",
            "url": "../games/deskmovement.php",
            "description": "",
            "name": "Desk Movement"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/carpenterscut.jpg",
            "url": "../games/carpenterscut.php",
            "description": "",
            "name": "Carpenter's Cut"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/therootsoflife.jpg",
            "url": "../games/therootsoflife.php",
            "description": "",
            "name": "The Roots of Life"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/mathfind.jpg",
            "url": "../games/mathfind.php",
            "description": "",
            "name": "Math Find"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/slicegeom.jpg",
            "url": "../games/slicegeom.php",
            "description": "",
            "name": "Slice Geom"
          },
          {
            "image_url": "http://www.hooda.info/math-games/images/primelanding.jpg",
            "url": "../games/primelanding.php",
            "description": "",
            "name": "Prime Landing"
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
      $resource.append($content);
      $resource.data('resource', resource);
      $resource.click(function() {
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