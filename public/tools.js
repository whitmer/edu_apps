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
      name: "SoftChalk Connect",
      logo_url: "/tools/softchalk.png",
      description: "Reusable content built using SoftChalk Connect",
      markets: "",
      resources:
[
  {
    "name": " Reef Life Hawaii label this fish with common names lesson 4",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/Cm08xjMKL3ZnsG",
    "description": "Label 5 types of fish. Based on photo albums of Moorish Idols, Groupers, Filefish, Boxfish, Goatfish\n\nauthor: mcootefreeman"
  },
  {
    "name": " Reef Life Hawaii label this fish with common names lesson 4",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/serve/Cm08xjMKL3ZnsG/html",
    "description": "Label 5 types of fish. Based on photo albums of Moorish Idols, Groupers, Filefish, Boxfish, Goatfish\n\nauthor: mcootefreeman"
  },
  {
    "name": "- malacia terms",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/4BoKvy7pbfajTY",
    "description": "\n\nauthor: rwaller"
  },
  {
    "name": "- malacia terms",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/serve/4BoKvy7pbfajTY/html",
    "description": "\n\nauthor: rwaller"
  },
  {
    "name": "7_Hour_HIV_Training_for_Health_Professions",
    "image_url": "http://www.softchalkconnect.com/images/courses/course.png",
    "url": "http://www.softchalkconnect.com/course/serve/25ScPdxoE0pGR4/html",
    "description": "\n\nauthor: Kelley"
  },
  {
    "name": "Academic Integrity",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/JS6ifp5tKjc2U1/html",
    "description": "Module addressing issues of academic integrity including plagiarism and cheating.\n\nauthor: dbjennings"
  },
  {
    "name": "Academic Integrity",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/JS6ifp5tKjc2U1",
    "description": "Module addressing issues of academic integrity including plagiarism and cheating.\n\nauthor: dbjennings"
  },
  {
    "name": "Academic Integrity",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/JS6ifp5tKjc2U1/html",
    "description": "Module addressing issues of academic integrity including plagiarism and cheating.\n\nauthor: dbjennings"
  },
  {
    "name": "Account classification",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/l91eGXrqynP6uk",
    "description": "Common business accounts used in the recordkeeping activities of a company classified by account type:  assets, liabilities, or equity\n\nauthor: LindaMuren"
  },
  {
    "name": "Account classification",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/serve/l91eGXrqynP6uk/html",
    "description": "Common business accounts used in the recordkeeping activities of a company classified by account type:  assets, liabilities, or equity\n\nauthor: LindaMuren"
  },
  {
    "name": "Accounting Cycle",
    "image_url": "http://www.softchalkconnect.com/images/activities/ordering.png",
    "url": "http://www.softchalkconnect.com/widget/mN6WZhvtQloeHM",
    "description": "Steps in the accounting cycle\nFinancial Accounting basics\n\nauthor: LindaMuren"
  },
  {
    "name": "Accounting Cycle",
    "image_url": "http://www.softchalkconnect.com/images/activities/ordering.png",
    "url": "http://www.softchalkconnect.com/widget/serve/mN6WZhvtQloeHM/html",
    "description": "Steps in the accounting cycle\nFinancial Accounting basics\n\nauthor: LindaMuren"
  },
  {
    "name": "Accounting Principles and Assumptions",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/serve/1l0dxgRSFiUAJB/html",
    "description": "Matching exercise- basic accounting principles & assumptions and their corresponding meanings\n\nauthor: LindaMuren"
  },
  {
    "name": "Accounting Principles and Assumptions",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/1l0dxgRSFiUAJB",
    "description": "Matching exercise- basic accounting principles & assumptions and their corresponding meanings\n\nauthor: LindaMuren"
  },
  {
    "name": "Addition and Subtraction of Decimals",
    "image_url": "http://www.softchalkconnect.com/images/activities/slideshow.png",
    "url": "http://www.softchalkconnect.com/widget/serve/2BGkwf8O0UsKjv/html",
    "description": "﻿The students will use the Math Tip to remember the rule for adding and subtracting decimals.\n\nauthor: mlarsen"
  },
  {
    "name": "Addition and Subtraction of Decimals",
    "image_url": "http://www.softchalkconnect.com/images/activities/slideshow.png",
    "url": "http://www.softchalkconnect.com/widget/2BGkwf8O0UsKjv",
    "description": "﻿The students will use the Math Tip to remember the rule for adding and subtracting decimals.\n\nauthor: mlarsen"
  },
  {
    "name": "Addition Principle",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/8xoMmfV2pZbktF",
    "description": "The students will use the Addition Principle to solve equations.\n\nauthor: mlarsen"
  },
  {
    "name": "Addition Principle",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/serve/8xoMmfV2pZbktF/html",
    "description": "The students will use the Addition Principle to solve equations.\n\nauthor: mlarsen"
  },
  {
    "name": "All About Hurricanes...",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/1tEnu8IXz4W73v/html",
    "description": "\n\nauthor: SoftChalk"
  },
  {
    "name": "All About Hurricanes...",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/1tEnu8IXz4W73v",
    "description": "\n\nauthor: SoftChalk"
  },
  {
    "name": "All About Hurricanes...",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/1tEnu8IXz4W73v/html",
    "description": "\n\nauthor: SoftChalk"
  },
  {
    "name": "AndrewJackson-A Simple Timeline",
    "image_url": "http://www.softchalkconnect.com/images/activities/timeline.png",
    "url": "http://www.softchalkconnect.com/widget/serve/5sD4JpErNoc1Cm/html",
    "description": "This shoulw what happened during the Administration of Andrew Jackson\n\nauthor: devans"
  },
  {
    "name": "AndrewJackson-A Simple Timeline",
    "image_url": "http://www.softchalkconnect.com/images/activities/timeline.png",
    "url": "http://www.softchalkconnect.com/widget/5sD4JpErNoc1Cm",
    "description": "This shoulw what happened during the Administration of Andrew Jackson\n\nauthor: devans"
  },
  {
    "name": "Animal Cell",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/r8s6gYObIuTpdX",
    "description": "Hot spot ID of cell organelles\n\nauthor: rwaller@augustatech."
  },
  {
    "name": "Animal Cell",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/serve/r8s6gYObIuTpdX/html",
    "description": "Hot spot ID of cell organelles\n\nauthor: rwaller@augustatech."
  },
  {
    "name": "Bar Graph",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/kZQ4RuLKaEvjbJ",
    "description": "Label the graph with the correct numbers.\n\nauthor: mlarsen"
  },
  {
    "name": "Bar Graph",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/serve/kZQ4RuLKaEvjbJ/html",
    "description": "Label the graph with the correct numbers.\n\nauthor: mlarsen"
  },
  {
    "name": "Black Triggerfish",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/GtW2iXVHklAF7Y/html",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "Black Triggerfish",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/GtW2iXVHklAF7Y",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "Blood Transfusion 101",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/6lbveXmDqAxVRQ/html",
    "description": "\n\nauthor: danaeckert"
  },
  {
    "name": "Blood Transfusion 101",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/6lbveXmDqAxVRQ",
    "description": "\n\nauthor: danaeckert"
  },
  {
    "name": "Blood Transfusion 101",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/6lbveXmDqAxVRQ/html",
    "description": "\n\nauthor: danaeckert"
  },
  {
    "name": "bluespine unicornfish",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/Ae4D1vkuOEqQZL/html",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "bluespine unicornfish",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/Ae4D1vkuOEqQZL",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "Breast Reconstruction",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/OUnDWgd8QcZ1Mh/html",
    "description": "\n\nauthor: Nina"
  },
  {
    "name": "Breast Reconstruction",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/OUnDWgd8QcZ1Mh",
    "description": "\n\nauthor: Nina"
  },
  {
    "name": "Breast Reconstruction",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/OUnDWgd8QcZ1Mh/html",
    "description": "\n\nauthor: Nina"
  },
  {
    "name": "Butterflyfish Photo Album",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/CaeiFE7P6Mdjvg/html",
    "description": "Butterflyfish images with captions west coast Big Island Hawaii\n\nauthor: mcootefreeman"
  },
  {
    "name": "Butterflyfish Photo Album",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/CaeiFE7P6Mdjvg",
    "description": "Butterflyfish images with captions west coast Big Island Hawaii\n\nauthor: mcootefreeman"
  },
  {
    "name": "cardiopulmonary review",
    "image_url": "http://www.softchalkconnect.com/images/activities/seekaword.png",
    "url": "http://www.softchalkconnect.com/widget/serve/LMbdt7VYJfpFyg/html",
    "description": "review of pulmonary, cardiac, adn cardiopulmonary terms\n\nauthor: rwaller"
  },
  {
    "name": "cardiopulmonary review",
    "image_url": "http://www.softchalkconnect.com/images/activities/seekaword.png",
    "url": "http://www.softchalkconnect.com/widget/LMbdt7VYJfpFyg",
    "description": "review of pulmonary, cardiac, adn cardiopulmonary terms\n\nauthor: rwaller"
  },
  {
    "name": "Case Dialog Box Medisoft",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/DmcCzxBNWgvlMS",
    "description": "\n\nauthor: srussell0048"
  },
  {
    "name": "Case Dialog Box Medisoft",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/DmcCzxBNWgvlMS/html",
    "description": "\n\nauthor: srussell0048"
  },
  {
    "name": "Case Dialog Box Medisoft",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/DmcCzxBNWgvlMS/html",
    "description": "\n\nauthor: srussell0048"
  },
  {
    "name": "Chart - ADDIE Model",
    "image_url": "http://www.softchalkconnect.com/images/activities/sectionedshape.png",
    "url": "http://www.softchalkconnect.com/widget/EsGqDi95afY84W",
    "description": "This shows the phases of the ADDIE Model. Using a Triangle Diagram.\n\nauthor: devans"
  },
  {
    "name": "Chart - ADDIE Model",
    "image_url": "http://www.softchalkconnect.com/images/activities/sectionedshape.png",
    "url": "http://www.softchalkconnect.com/widget/serve/EsGqDi95afY84W/html",
    "description": "This shows the phases of the ADDIE Model. Using a Triangle Diagram.\n\nauthor: devans"
  },
  {
    "name": "Chemical and Physical Properties",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/serve/7AqpQ6d3IB8iWS/html",
    "description": "This activity can help students assess their understanding of chemical and physical properties.\n\nauthor: whuang"
  },
  {
    "name": "Chemical and Physical Properties",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/7AqpQ6d3IB8iWS",
    "description": "This activity can help students assess their understanding of chemical and physical properties.\n\nauthor: whuang"
  },
  {
    "name": "Chp 7 - Steps in Submitting Electronic Claims",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/7uOLlIZzAdSJFH/html",
    "description": "\n\nauthor: srussell0048"
  },
  {
    "name": "Chp 7 - Steps in Submitting Electronic Claims",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/7uOLlIZzAdSJFH",
    "description": "\n\nauthor: srussell0048"
  },
  {
    "name": "Chp 7 - Steps in Submitting Electronic Claims",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/7uOLlIZzAdSJFH/html",
    "description": "\n\nauthor: srussell0048"
  },
  {
    "name": "Citing a Book",
    "image_url": "http://www.softchalkconnect.com/images/activities/ordering.png",
    "url": "http://www.softchalkconnect.com/widget/serve/iQsuoAxhG02C5W/html",
    "description": "Place the fields needed for citing a book in the MLA format into the correct order.\n\nauthor: AmyGF"
  },
  {
    "name": "Citing a Book",
    "image_url": "http://www.softchalkconnect.com/images/activities/ordering.png",
    "url": "http://www.softchalkconnect.com/widget/iQsuoAxhG02C5W",
    "description": "Place the fields needed for citing a book in the MLA format into the correct order.\n\nauthor: AmyGF"
  },
  {
    "name": "Citing a Magazine in the MLA Format",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/serve/YB1AmG7PhE2JeT/html",
    "description": "Label the fields in the MLA magazine citation.\n\nauthor: AmyGF"
  },
  {
    "name": "Citing a Magazine in the MLA Format",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/YB1AmG7PhE2JeT",
    "description": "Label the fields in the MLA magazine citation.\n\nauthor: AmyGF"
  },
  {
    "name": "Citing a Webpage",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/serve/0Q2FcqYObwrglR/html",
    "description": "Identify the information needed for a citing this sample web page in the MLA Format.\n\nauthor: AmyGF"
  },
  {
    "name": "Citing a Webpage",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/0Q2FcqYObwrglR",
    "description": "Identify the information needed for a citing this sample web page in the MLA Format.\n\nauthor: AmyGF"
  },
  {
    "name": "Color Seek A Word",
    "image_url": "http://www.softchalkconnect.com/images/activities/seekaword.png",
    "url": "http://www.softchalkconnect.com/widget/serve/qzPHV5oMt3jFnU/html",
    "description": "Colors used for Seek A Word\n\nauthor: HawkeyeSteve"
  },
  {
    "name": "Color Seek A Word",
    "image_url": "http://www.softchalkconnect.com/images/activities/seekaword.png",
    "url": "http://www.softchalkconnect.com/widget/qzPHV5oMt3jFnU",
    "description": "Colors used for Seek A Word\n\nauthor: HawkeyeSteve"
  },
  {
    "name": "Complementary and Supplementary Angles",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/serve/tQWGI8K3gSiCBJ/html",
    "description": "﻿The student will be given an angle's degree and they are to find the angle's complement or supplement.\n\nauthor: mlarsen"
  },
  {
    "name": "Complementary and Supplementary Angles",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/tQWGI8K3gSiCBJ",
    "description": "﻿The student will be given an angle's degree and they are to find the angle's complement or supplement.\n\nauthor: mlarsen"
  },
  {
    "name": "Complete the table",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/rxW3Qp0PNT5vBm",
    "description": "The students will find the points for the equation of a line.\n\nauthor: mlarsen"
  },
  {
    "name": "Complete the table",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/serve/rxW3Qp0PNT5vBm/html",
    "description": "The students will find the points for the equation of a line.\n\nauthor: mlarsen"
  },
  {
    "name": "Complete the Table Quiz",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/serve/WhtCU1SAVe0Y27/html",
    "description": "The students will find the points for the equation of a line.\n\nauthor: mlarsen"
  },
  {
    "name": "Complete the Table Quiz",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/WhtCU1SAVe0Y27",
    "description": "The students will find the points for the equation of a line.\n\nauthor: mlarsen"
  },
  {
    "name": "Convert Standard Form to Slope-Intercept Form",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/l9fGSehHTnCZ2k",
    "description": "Given a linear equation in Standard Form, solve for \"y\" to convert the equation to Slope-Intercept Form.\n\nauthor: lothomas"
  },
  {
    "name": "Convert Standard Form to Slope-Intercept Form",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/serve/l9fGSehHTnCZ2k/html",
    "description": "Given a linear equation in Standard Form, solve for \"y\" to convert the equation to Slope-Intercept Form.\n\nauthor: lothomas"
  },
  {
    "name": "convict tangs",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/dGHipQz1cAmSvb",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "convict tangs",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/dGHipQz1cAmSvb/html",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "crossword eye",
    "image_url": "http://www.softchalkconnect.com/images/activities/crossword.png",
    "url": "http://www.softchalkconnect.com/widget/0eLJD3MpnqC9IP",
    "description": "﻿basic eye anatomy terms\n\nauthor: help"
  },
  {
    "name": "crossword eye",
    "image_url": "http://www.softchalkconnect.com/images/activities/crossword.png",
    "url": "http://www.softchalkconnect.com/widget/serve/0eLJD3MpnqC9IP/html",
    "description": "﻿basic eye anatomy terms\n\nauthor: help"
  },
  {
    "name": "Crossword Puzzle",
    "image_url": "http://www.softchalkconnect.com/images/activities/crossword.png",
    "url": "http://www.softchalkconnect.com/widget/SQB1DvfblPndmE",
    "description": "\n\nauthor: mel.vasq"
  },
  {
    "name": "Crossword Puzzle",
    "image_url": "http://www.softchalkconnect.com/images/activities/crossword.png",
    "url": "http://www.softchalkconnect.com/widget/serve/SQB1DvfblPndmE/html",
    "description": "\n\nauthor: mel.vasq"
  },
  {
    "name": "DataAggregateSeekAWord",
    "image_url": "http://www.softchalkconnect.com/images/activities/seekaword.png",
    "url": "http://www.softchalkconnect.com/widget/serve/6yomRiDLaBt8nH/html",
    "description": "﻿Seek-A-Word activity for terms relating to data aggregates\n\nauthor: owenta"
  },
  {
    "name": "DataAggregateSeekAWord",
    "image_url": "http://www.softchalkconnect.com/images/activities/seekaword.png",
    "url": "http://www.softchalkconnect.com/widget/6yomRiDLaBt8nH",
    "description": "﻿Seek-A-Word activity for terms relating to data aggregates\n\nauthor: owenta"
  },
  {
    "name": "Description - Describing Abraham Lincoln",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/serve/0gZRhdGmp75rl4/html",
    "description": "﻿This is an exercise to use in teaching how to write description in an essay. The exercise focuses upon features of the face of Abraham Lincoln.\n\nauthor: HawkeyeSteve"
  },
  {
    "name": "Description - Describing Abraham Lincoln",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/0gZRhdGmp75rl4",
    "description": "﻿This is an exercise to use in teaching how to write description in an essay. The exercise focuses upon features of the face of Abraham Lincoln.\n\nauthor: HawkeyeSteve"
  },
  {
    "name": "Determine Scale Factor Given a Point",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/serve/WrDqRJAOmsvFbK/html",
    "description": "\n\nauthor: lothomas"
  },
  {
    "name": "Determine Scale Factor Given a Point",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/WrDqRJAOmsvFbK",
    "description": "\n\nauthor: lothomas"
  },
  {
    "name": "Determine Slope from a Graph",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/8T2rWiLtnZgQzD/html",
    "description": "Given a graph determine the slope of the line.\n\nauthor: lothomas"
  },
  {
    "name": "Determine Slope from a Graph",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/8T2rWiLtnZgQzD",
    "description": "Given a graph determine the slope of the line.\n\nauthor: lothomas"
  },
  {
    "name": "Determine the State of Slope : positive, negative, zero or undefined.",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/ZQEOiUkH2z3yqS",
    "description": "Given a lineasr equation determine if the slope is positive, negative, undefined or zero. The linear equations may be in Standard Form or Slope-Intercept Form.\n\nauthor: lothomas"
  },
  {
    "name": "Determine the State of Slope : positive, negative, zero or undefined.",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/serve/ZQEOiUkH2z3yqS/html",
    "description": "Given a lineasr equation determine if the slope is positive, negative, undefined or zero. The linear equations may be in Standard Form or Slope-Intercept Form.\n\nauthor: lothomas"
  },
  {
    "name": "Developing Communication Skills Activity 1",
    "image_url": "http://www.softchalkconnect.com/images/activities/didyouknow.png",
    "url": "http://www.softchalkconnect.com/widget/vBuXTlDKF2Lz80",
    "description": "Toolchest for Parents with Special Need Children\n\nauthor: daisy7947"
  },
  {
    "name": "Developing Communication Skills Activity 1",
    "image_url": "http://www.softchalkconnect.com/images/activities/didyouknow.png",
    "url": "http://www.softchalkconnect.com/widget/serve/vBuXTlDKF2Lz80/html",
    "description": "Toolchest for Parents with Special Need Children\n\nauthor: daisy7947"
  },
  {
    "name": "Developing Communication Skills Activity 2",
    "image_url": "http://www.softchalkconnect.com/images/activities/didyouknow.png",
    "url": "http://www.softchalkconnect.com/widget/serve/tb5wdeyournISX/html",
    "description": "ToolChest for Parents with Special Need Children\n\nauthor: daisy7947"
  },
  {
    "name": "Developing Communication Skills Activity 2",
    "image_url": "http://www.softchalkconnect.com/images/activities/didyouknow.png",
    "url": "http://www.softchalkconnect.com/widget/tb5wdeyournISX",
    "description": "ToolChest for Parents with Special Need Children\n\nauthor: daisy7947"
  },
  {
    "name": "Did you know -  Canadian Money",
    "image_url": "http://www.softchalkconnect.com/images/activities/didyouknow.png",
    "url": "http://www.softchalkconnect.com/widget/serve/ZYXABp6L2kahoQ/html",
    "description": "\n\nauthor: alicia1227"
  },
  {
    "name": "Did you know -  Canadian Money",
    "image_url": "http://www.softchalkconnect.com/images/activities/didyouknow.png",
    "url": "http://www.softchalkconnect.com/widget/ZYXABp6L2kahoQ",
    "description": "\n\nauthor: alicia1227"
  },
  {
    "name": "Differences in viewpoint activity",
    "image_url": "http://www.softchalkconnect.com/images/activities/tabbedpane.png",
    "url": "http://www.softchalkconnect.com/widget/x4Q8CHBMh6plnS",
    "description": "﻿This activity defines differences in viewpoint.\n\nauthor: HawkeyeSteve"
  },
  {
    "name": "Differences in viewpoint activity",
    "image_url": "http://www.softchalkconnect.com/images/activities/tabbedpane.png",
    "url": "http://www.softchalkconnect.com/widget/serve/x4Q8CHBMh6plnS/html",
    "description": "﻿This activity defines differences in viewpoint.\n\nauthor: HawkeyeSteve"
  },
  {
    "name": "Divisibility Rules",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/QbLRtdA4y3CSfh/html",
    "description": "﻿The students will review the Rules for Divisibility and then solve the Mystery Number.\n\nauthor: mlarsen"
  },
  {
    "name": "Divisibility Rules",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/QbLRtdA4y3CSfh",
    "description": "﻿The students will review the Rules for Divisibility and then solve the Mystery Number.\n\nauthor: mlarsen"
  },
  {
    "name": "Drag and Drop solving 2 step equations",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/serve/WJuDC6dwf7G1Un/html",
    "description": "Drag the correct solution to the equation\n\nauthor: sharonelliott"
  },
  {
    "name": "Drag and Drop solving 2 step equations",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/WJuDC6dwf7G1Un",
    "description": "Drag the correct solution to the equation\n\nauthor: sharonelliott"
  },
  {
    "name": "Drug Prescription Abbreviations",
    "image_url": "http://www.softchalkconnect.com/images/activities/crossword.png",
    "url": "http://www.softchalkconnect.com/widget/7W2BI9sLCr3EuF",
    "description": "Clues are common abbreviations used in drug prescriptions written by physicians.\n\nauthor: rwaller"
  },
  {
    "name": "Drug Prescription Abbreviations",
    "image_url": "http://www.softchalkconnect.com/images/activities/crossword.png",
    "url": "http://www.softchalkconnect.com/widget/serve/7W2BI9sLCr3EuF/html",
    "description": "Clues are common abbreviations used in drug prescriptions written by physicians.\n\nauthor: rwaller"
  },
  {
    "name": "Eels (Muraenidae), Needlefish ( Belonidae ) and Cornetfishes ( Fistulariidae )",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/tR8KHS4TZu9lrz",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "Eels (Muraenidae), Needlefish ( Belonidae ) and Cornetfishes ( Fistulariidae )",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/tR8KHS4TZu9lrz/html",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "Endocrine Abbreviation Crossword",
    "image_url": "http://www.softchalkconnect.com/images/activities/crossword.png",
    "url": "http://www.softchalkconnect.com/widget/waHZvekrX9uln5",
    "description": "\n\nauthor: rwaller@augustatech."
  },
  {
    "name": "Endocrine Abbreviation Crossword",
    "image_url": "http://www.softchalkconnect.com/images/activities/crossword.png",
    "url": "http://www.softchalkconnect.com/widget/serve/waHZvekrX9uln5/html",
    "description": "\n\nauthor: rwaller@augustatech."
  },
  {
    "name": "Endocrine Terminology",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/VwecJ6mY3RIFTK",
    "description": "Drag N Drop activity with terms related to the endocrine system.\n\nauthor: rwaller@augustatech."
  },
  {
    "name": "Endocrine Terminology",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/serve/VwecJ6mY3RIFTK/html",
    "description": "Drag N Drop activity with terms related to the endocrine system.\n\nauthor: rwaller@augustatech."
  },
  {
    "name": "Evaluating Exponential Notation",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/serve/5q1LWMyxvg0T98/html",
    "description": "﻿The students will evaluate exponential notation with this sorting activity.\n\nauthor: mlarsen"
  },
  {
    "name": "Evaluating Exponential Notation",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/5q1LWMyxvg0T98",
    "description": "﻿The students will evaluate exponential notation with this sorting activity.\n\nauthor: mlarsen"
  },
  {
    "name": "Examples Activity",
    "image_url": "http://www.softchalkconnect.com/images/activities/tabbedpane.png",
    "url": "http://www.softchalkconnect.com/widget/serve/8aLtJV2myZePlC/html",
    "description": "﻿This is an activity that demonstrates how examples can effectively be used.\n\nauthor: HawkeyeSteve"
  },
  {
    "name": "Examples Activity",
    "image_url": "http://www.softchalkconnect.com/images/activities/tabbedpane.png",
    "url": "http://www.softchalkconnect.com/widget/8aLtJV2myZePlC",
    "description": "﻿This is an activity that demonstrates how examples can effectively be used.\n\nauthor: HawkeyeSteve"
  },
  {
    "name": "ExcelFormulas",
    "image_url": "http://www.softchalkconnect.com/images/activities/tabbedpane.png",
    "url": "http://www.softchalkconnect.com/widget/b5LwXi1lkDgyJU",
    "description": "Just a little more information about creating formulas in Excel.\n\nauthor: Sharkie216"
  },
  {
    "name": "ExcelFormulas",
    "image_url": "http://www.softchalkconnect.com/images/activities/tabbedpane.png",
    "url": "http://www.softchalkconnect.com/widget/serve/b5LwXi1lkDgyJU/html",
    "description": "Just a little more information about creating formulas in Excel.\n\nauthor: Sharkie216"
  },
  {
    "name": "Exercise Parameters",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/serve/nuEIz9rAKXPYgG/html",
    "description": "For Fitness Module\n\nauthor: trigobod"
  },
  {
    "name": "Exercise Parameters",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/nuEIz9rAKXPYgG",
    "description": "For Fitness Module\n\nauthor: trigobod"
  },
  {
    "name": "Factors of 48",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/serve/NTOaHbn2fXcFVM/html",
    "description": "The students will be able to determine if a number is a  factor of 48.\n\nauthor: mlarsen"
  },
  {
    "name": "Factors of 48",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/NTOaHbn2fXcFVM",
    "description": "The students will be able to determine if a number is a  factor of 48.\n\nauthor: mlarsen"
  },
  {
    "name": "Fat Soluble Vs. Water Soluble Vitamins",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/gQsAI95epK0odz",
    "description": "﻿Sorting activity with Fat Soluble Vs. Water Soluble Vitamins\n\nauthor: Brittany"
  },
  {
    "name": "Fat Soluble Vs. Water Soluble Vitamins",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/serve/gQsAI95epK0odz/html",
    "description": "﻿Sorting activity with Fat Soluble Vs. Water Soluble Vitamins\n\nauthor: Brittany"
  },
  {
    "name": "Flash Card - eye diseases",
    "image_url": "http://www.softchalkconnect.com/images/activities/flashcard.png",
    "url": "http://www.softchalkconnect.com/widget/serve/TzNrA36usXRQUn/html",
    "description": "﻿\n\nauthor: SteveSaltzberg"
  },
  {
    "name": "Flash Card - eye diseases",
    "image_url": "http://www.softchalkconnect.com/images/activities/flashcard.png",
    "url": "http://www.softchalkconnect.com/widget/TzNrA36usXRQUn",
    "description": "﻿\n\nauthor: SteveSaltzberg"
  },
  {
    "name": "FoodPyramid(2005)",
    "image_url": "http://www.softchalkconnect.com/images/activities/sectionedshape.png",
    "url": "http://www.softchalkconnect.com/widget/serve/0Ffcxw5amlrkXo/html",
    "description": "﻿Classic food pyramid chart with old (2005) format\n\nauthor: owenta"
  },
  {
    "name": "FoodPyramid(2005)",
    "image_url": "http://www.softchalkconnect.com/images/activities/sectionedshape.png",
    "url": "http://www.softchalkconnect.com/widget/0Ffcxw5amlrkXo",
    "description": "﻿Classic food pyramid chart with old (2005) format\n\nauthor: owenta"
  },
  {
    "name": "From Genes to Proteins",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/XV9R2HJO4bkTwM/html",
    "description": "\n\nauthor: geneticsgeek"
  },
  {
    "name": "From Genes to Proteins",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/XV9R2HJO4bkTwM",
    "description": "\n\nauthor: geneticsgeek"
  },
  {
    "name": "From Genes to Proteins",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/XV9R2HJO4bkTwM/html",
    "description": "\n\nauthor: geneticsgeek"
  },
  {
    "name": "Gastrointestinal & Urinary Function",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/ECPpRTwtbkD1UJ/html",
    "description": "\n\nauthor: reynoldsteph"
  },
  {
    "name": "Gastrointestinal & Urinary Function",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/ECPpRTwtbkD1UJ",
    "description": "\n\nauthor: reynoldsteph"
  },
  {
    "name": "Gastrointestinal & Urinary Function",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/ECPpRTwtbkD1UJ/html",
    "description": "\n\nauthor: reynoldsteph"
  },
  {
    "name": "Geometry Formulas",
    "image_url": "http://www.softchalkconnect.com/images/activities/flashcard.png",
    "url": "http://www.softchalkconnect.com/widget/BxrQWwcfFalDuo",
    "description": "﻿A shape will be given and you are to give the formula for the area or perimeter.\n\nauthor: mlarsen"
  },
  {
    "name": "Geometry Formulas",
    "image_url": "http://www.softchalkconnect.com/images/activities/flashcard.png",
    "url": "http://www.softchalkconnect.com/widget/serve/BxrQWwcfFalDuo/html",
    "description": "﻿A shape will be given and you are to give the formula for the area or perimeter.\n\nauthor: mlarsen"
  },
  {
    "name": "Geometry terms",
    "image_url": "http://www.softchalkconnect.com/images/activities/seekaword.png",
    "url": "http://www.softchalkconnect.com/widget/6stHRY2JvITc04",
    "description": "﻿The student will review the geometry terms as he/she looks for the terms in the Seek a Word Activity.\n\nauthor: mlarsen"
  },
  {
    "name": "Geometry terms",
    "image_url": "http://www.softchalkconnect.com/images/activities/seekaword.png",
    "url": "http://www.softchalkconnect.com/widget/serve/6stHRY2JvITc04/html",
    "description": "﻿The student will review the geometry terms as he/she looks for the terms in the Seek a Word Activity.\n\nauthor: mlarsen"
  },
  {
    "name": "Geometry Terms",
    "image_url": "http://www.softchalkconnect.com/images/activities/flashcard.png",
    "url": "http://www.softchalkconnect.com/widget/serve/Fs89Kfph5yqB4v/html",
    "description": "﻿The student will be given a geometric term, and the student will give the definition of the term.\n\nauthor: mlarsen"
  },
  {
    "name": "Geometry Terms",
    "image_url": "http://www.softchalkconnect.com/images/activities/flashcard.png",
    "url": "http://www.softchalkconnect.com/widget/Fs89Kfph5yqB4v",
    "description": "﻿The student will be given a geometric term, and the student will give the definition of the term.\n\nauthor: mlarsen"
  },
  {
    "name": "GI Crossword",
    "image_url": "http://www.softchalkconnect.com/images/activities/crossword.png",
    "url": "http://www.softchalkconnect.com/widget/serve/1AFLUyagXxroOz/html",
    "description": "gastrointestinal medical terms\n\nauthor: rwaller"
  },
  {
    "name": "GI Crossword",
    "image_url": "http://www.softchalkconnect.com/images/activities/crossword.png",
    "url": "http://www.softchalkconnect.com/widget/1AFLUyagXxroOz",
    "description": "gastrointestinal medical terms\n\nauthor: rwaller"
  },
  {
    "name": "Given 2 Points (one is the y-intercept) Identify the Linear Equation",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/DUP8Zcn0HquJ54",
    "description": "Given 2 points, where one point is the y-intercept,identify the linear equation in slope-intercept form\n\nauthor: lothomas"
  },
  {
    "name": "Given 2 Points (one is the y-intercept) Identify the Linear Equation",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/serve/DUP8Zcn0HquJ54/html",
    "description": "Given 2 points, where one point is the y-intercept,identify the linear equation in slope-intercept form\n\nauthor: lothomas"
  },
  {
    "name": "Given Two Points (one not the y-intercept) Identify the Linear Equation",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/serve/RuQhdA4Z6jrFXb/html",
    "description": "Identify the linear equation when given two points and one of the points is NOT the y-intercept\n\nauthor: lothomas"
  },
  {
    "name": "Given Two Points (one not the y-intercept) Identify the Linear Equation",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/RuQhdA4Z6jrFXb",
    "description": "Identify the linear equation when given two points and one of the points is NOT the y-intercept\n\nauthor: lothomas"
  },
  {
    "name": "Goatfish",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/MDsj4konaK6R3e",
    "description": "Images blue goatfish, square spot goatfish\n\nauthor: mcootefreeman"
  },
  {
    "name": "Goatfish",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/MDsj4konaK6R3e/html",
    "description": "Images blue goatfish, square spot goatfish\n\nauthor: mcootefreeman"
  },
  {
    "name": "Goldring tang",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/uClphr7Jt5RDOq/html",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "Goldring tang",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/uClphr7Jt5RDOq",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "Grade 5th - KENNEDY",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/euzFkHwvo4BNxK",
    "description": "\n\nauthor: arriaza08"
  },
  {
    "name": "Grade 5th - KENNEDY",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/euzFkHwvo4BNxK/html",
    "description": "\n\nauthor: arriaza08"
  },
  {
    "name": "Grade 5th - KENNEDY",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/euzFkHwvo4BNxK/html",
    "description": "\n\nauthor: arriaza08"
  },
  {
    "name": "Grouper Peacock ( Roi)",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/V2fLIBZ95GPp8C",
    "description": "images of Grouper Peacock ( Roi)\n\nauthor: mcootefreeman"
  },
  {
    "name": "Grouper Peacock ( Roi)",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/V2fLIBZ95GPp8C/html",
    "description": "images of Grouper Peacock ( Roi)\n\nauthor: mcootefreeman"
  },
  {
    "name": "Happy CVR Day",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/eLTf2smVx4wtbB/html",
    "description": "Crazy Vocabulary Review activities:  Spanish 1\n\nauthor: fayekoss"
  },
  {
    "name": "Happy CVR Day",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/eLTf2smVx4wtbB",
    "description": "Crazy Vocabulary Review activities:  Spanish 1\n\nauthor: fayekoss"
  },
  {
    "name": "Happy CVR Day",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/eLTf2smVx4wtbB/html",
    "description": "Crazy Vocabulary Review activities:  Spanish 1\n\nauthor: fayekoss"
  },
  {
    "name": "Heart Identification ",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/kGH62RzxuSOVht",
    "description": "Locate the parts of a human heart.\n\nauthor: reynoldsteph"
  },
  {
    "name": "Heart Identification ",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/serve/kGH62RzxuSOVht/html",
    "description": "Locate the parts of a human heart.\n\nauthor: reynoldsteph"
  },
  {
    "name": "Horse Colors Test - Text",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/hm9EeDoHCAw8N6/html",
    "description": "\n\nauthor: snsblonde24"
  },
  {
    "name": "Horse Colors Test - Text",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/hm9EeDoHCAw8N6",
    "description": "\n\nauthor: snsblonde24"
  },
  {
    "name": "Horse Colors Test - Text",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/hm9EeDoHCAw8N6/html",
    "description": "\n\nauthor: snsblonde24"
  },
  {
    "name": "Hot Spot - eye graded activity",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/ph7dWs18DBrqVa",
    "description": "﻿Image of eye asking to identify 4 areas.\n\nauthor: SteveSaltzberg"
  },
  {
    "name": "Hot Spot - eye graded activity",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/serve/ph7dWs18DBrqVa/html",
    "description": "﻿Image of eye asking to identify 4 areas.\n\nauthor: SteveSaltzberg"
  },
  {
    "name": "Hot Spot - rollover",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/serve/JSdb5Hz2algNsV/html",
    "description": "Hot spot activity in ﻿explore mode - names of elements of the human eye\n\nauthor: SteveSaltzberg"
  },
  {
    "name": "Hot Spot - rollover",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/JSdb5Hz2algNsV",
    "description": "Hot spot activity in ﻿explore mode - names of elements of the human eye\n\nauthor: SteveSaltzberg"
  },
  {
    "name": "hot spot fish anatomy",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/serve/h2U7XGF19d0T4Q/html",
    "description": "rollover image to identify parts of\n\na fish\n\nauthor: mcootefreeman"
  },
  {
    "name": "hot spot fish anatomy",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/h2U7XGF19d0T4Q",
    "description": "rollover image to identify parts of\n\na fish\n\nauthor: mcootefreeman"
  },
  {
    "name": "How to properly describe fish patterns",
    "image_url": "http://www.softchalkconnect.com/images/activities/didyouknow.png",
    "url": "http://www.softchalkconnect.com/widget/serve/fmyDA0XYnczo8L/html",
    "description": "Facts for proper description of fish patterns\n\nauthor: mcootefreeman"
  },
  {
    "name": "How to properly describe fish patterns",
    "image_url": "http://www.softchalkconnect.com/images/activities/didyouknow.png",
    "url": "http://www.softchalkconnect.com/widget/fmyDA0XYnczo8L",
    "description": "Facts for proper description of fish patterns\n\nauthor: mcootefreeman"
  },
  {
    "name": "Identify Slope in a Linear Equation",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/serve/VEfAb0Tt5dSrq2/html",
    "description": "Identify slope in slope-intercept form\n\nauthor: lothomas"
  },
  {
    "name": "Identify Slope in a Linear Equation",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/VEfAb0Tt5dSrq2",
    "description": "Identify slope in slope-intercept form\n\nauthor: lothomas"
  },
  {
    "name": "Identify the President-KB",
    "image_url": "http://www.softchalkconnect.com/images/activities/identify.png",
    "url": "http://www.softchalkconnect.com/widget/YXeyx2c8bpaEhm",
    "description": "This is my first object placed into SoftChalk Connect.\n\nauthor: kdbolton"
  },
  {
    "name": "Identify the President-KB",
    "image_url": "http://www.softchalkconnect.com/images/activities/identify.png",
    "url": "http://www.softchalkconnect.com/widget/serve/YXeyx2c8bpaEhm/html",
    "description": "This is my first object placed into SoftChalk Connect.\n\nauthor: kdbolton"
  },
  {
    "name": "Identify Y-Intercept in a Linear Equation",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/2lje4AVEB0fQiK",
    "description": "Identify the y-intercept in slope-intercept form\n\nauthor: lothomas"
  },
  {
    "name": "Identify Y-Intercept in a Linear Equation",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/serve/2lje4AVEB0fQiK/html",
    "description": "Identify the y-intercept in slope-intercept form\n\nauthor: lothomas"
  },
  {
    "name": "Imperialism",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/MDN6lH4GEZrCYa/html",
    "description": "This lesson briefly covers old imperialism but focuses on the new imperialism of the late 1800s and early 1900s.\n\nauthor: dalesalisbury"
  },
  {
    "name": "Imperialism",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/MDN6lH4GEZrCYa",
    "description": "This lesson briefly covers old imperialism but focuses on the new imperialism of the late 1800s and early 1900s.\n\nauthor: dalesalisbury"
  },
  {
    "name": "Imperialism",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/MDN6lH4GEZrCYa/html",
    "description": "This lesson briefly covers old imperialism but focuses on the new imperialism of the late 1800s and early 1900s.\n\nauthor: dalesalisbury"
  },
  {
    "name": "Improving Your Spelling",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/V0K27CM41tamRj/html",
    "description": "This interactive tutorial provides the general rules of spelling for Standard American English and strategies for improving spelling.\n\nauthor: WalkerK"
  },
  {
    "name": "Improving Your Spelling",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/V0K27CM41tamRj",
    "description": "This interactive tutorial provides the general rules of spelling for Standard American English and strategies for improving spelling.\n\nauthor: WalkerK"
  },
  {
    "name": "Improving Your Spelling",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/V0K27CM41tamRj/html",
    "description": "This interactive tutorial provides the general rules of spelling for Standard American English and strategies for improving spelling.\n\nauthor: WalkerK"
  },
  {
    "name": "In-Text Documentation (MLA Format)",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/uE62cSd5GhUBxs",
    "description": "Match the in-text documentation to its citation.\n\nauthor: AmyGF"
  },
  {
    "name": "In-Text Documentation (MLA Format)",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/serve/uE62cSd5GhUBxs/html",
    "description": "Match the in-text documentation to its citation.\n\nauthor: AmyGF"
  },
  {
    "name": "Increasing and Decreasing",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/7vA9FVoN8HRE5w/html",
    "description": "\n\nauthor: ezitka"
  },
  {
    "name": "Increasing and Decreasing",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/7vA9FVoN8HRE5w",
    "description": "\n\nauthor: ezitka"
  },
  {
    "name": "Increasing and Decreasing",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/7vA9FVoN8HRE5w/html",
    "description": "\n\nauthor: ezitka"
  },
  {
    "name": "Integers and the Real World",
    "image_url": "http://www.softchalkconnect.com/images/activities/flashcard.png",
    "url": "http://www.softchalkconnect.com/widget/wmRzVg9WBCHb7Y",
    "description": "The students will correspond integers to real-world situations.\n\nauthor: mlarsen"
  },
  {
    "name": "Integers and the Real World",
    "image_url": "http://www.softchalkconnect.com/images/activities/flashcard.png",
    "url": "http://www.softchalkconnect.com/widget/serve/wmRzVg9WBCHb7Y/html",
    "description": "The students will correspond integers to real-world situations.\n\nauthor: mlarsen"
  },
  {
    "name": "Introduction to Sequences",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/NRyOXu9JDCAjhs/html",
    "description": "Introduction to sequences.\n\nauthor: clark_p"
  },
  {
    "name": "Introduction to Sequences",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/NRyOXu9JDCAjhs",
    "description": "Introduction to sequences.\n\nauthor: clark_p"
  },
  {
    "name": "Introduction to Sequences",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/NRyOXu9JDCAjhs/html",
    "description": "Introduction to sequences.\n\nauthor: clark_p"
  },
  {
    "name": "Jefferson Crossword",
    "image_url": "http://www.softchalkconnect.com/images/activities/crossword.png",
    "url": "http://www.softchalkconnect.com/widget/R682rh5SmlCnEX",
    "description": "﻿A crossword puzzle that reviews information about Thomas Jefferson and general government terms\n\nauthor: spolyson"
  },
  {
    "name": "Jefferson Crossword",
    "image_url": "http://www.softchalkconnect.com/images/activities/crossword.png",
    "url": "http://www.softchalkconnect.com/widget/serve/R682rh5SmlCnEX/html",
    "description": "﻿A crossword puzzle that reviews information about Thomas Jefferson and general government terms\n\nauthor: spolyson"
  },
  {
    "name": "Jig Saw of the Eye",
    "image_url": "http://www.softchalkconnect.com/images/activities/jigsawpuzzle.png",
    "url": "http://www.softchalkconnect.com/widget/serve/CfnzLYEs7UVey4/html",
    "description": "﻿9 peices\n\nauthor: SteveSaltzberg"
  },
  {
    "name": "Jig Saw of the Eye",
    "image_url": "http://www.softchalkconnect.com/images/activities/jigsawpuzzle.png",
    "url": "http://www.softchalkconnect.com/widget/CfnzLYEs7UVey4",
    "description": "﻿9 peices\n\nauthor: SteveSaltzberg"
  },
  {
    "name": "Jigsaw Puzzle Activity-The Three Estates and the King of France",
    "image_url": "http://www.softchalkconnect.com/images/activities/jigsawpuzzle.png",
    "url": "http://www.softchalkconnect.com/widget/serve/sa7txhIdCiyPSG/html",
    "description": "\n\nauthor: dalesalisbury"
  },
  {
    "name": "Jigsaw Puzzle Activity-The Three Estates and the King of France",
    "image_url": "http://www.softchalkconnect.com/images/activities/jigsawpuzzle.png",
    "url": "http://www.softchalkconnect.com/widget/sa7txhIdCiyPSG",
    "description": "\n\nauthor: dalesalisbury"
  },
  {
    "name": "Jude and Zeke",
    "image_url": "http://www.softchalkconnect.com/images/activities/jigsawpuzzle.png",
    "url": "http://www.softchalkconnect.com/widget/serve/AxunhybBmPlFYj/html",
    "description": "\n\nauthor: lothomas"
  },
  {
    "name": "Jude and Zeke",
    "image_url": "http://www.softchalkconnect.com/images/activities/jigsawpuzzle.png",
    "url": "http://www.softchalkconnect.com/widget/AxunhybBmPlFYj",
    "description": "\n\nauthor: lothomas"
  },
  {
    "name": "Label the butterflyfish with the common name",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/serve/R650olzd4YTgjy/html",
    "description": "Label images with common name of fish. Use with butterflyfish photo album. \n\nauthor: mcootefreeman"
  },
  {
    "name": "Label the butterflyfish with the common name",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/R650olzd4YTgjy",
    "description": "Label images with common name of fish. Use with butterflyfish photo album. \n\nauthor: mcootefreeman"
  },
  {
    "name": "Labeling activity of the human eye",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/serve/POleqdCBfWZ3bD/html",
    "description": "﻿Image of human eye with labels at the bottom - required to drag to proper location.\n\n\n\nCredits - Images in this activity were used courtesy of the National Eye Institute, National Institutes of Health.\n\nauthor: SteveSaltzberg"
  },
  {
    "name": "Labeling activity of the human eye",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/POleqdCBfWZ3bD",
    "description": "﻿Image of human eye with labels at the bottom - required to drag to proper location.\n\n\n\nCredits - Images in this activity were used courtesy of the National Eye Institute, National Institutes of Health.\n\nauthor: SteveSaltzberg"
  },
  {
    "name": "Learning Object for General Biology I: Earth's Early Atmosphere",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/DEpwKYZtvQfIz1/html",
    "description": "Earth's early atmosphere, Miller Urey Experiment\n\nauthor: Dr_Jim_Brown"
  },
  {
    "name": "Learning Object for General Biology I: Earth's Early Atmosphere",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/DEpwKYZtvQfIz1/html",
    "description": "Earth's early atmosphere, Miller Urey Experiment\n\nauthor: Dr_Jim_Brown"
  },
  {
    "name": "Learning Object for General Biology I: Earth's Early Atmosphere",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/DEpwKYZtvQfIz1",
    "description": "Earth's early atmosphere, Miller Urey Experiment\n\nauthor: Dr_Jim_Brown"
  },
  {
    "name": "Lesson2_part3_4",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/jqk5ghl2Gydz17/html",
    "description": "\n\nauthor: mbb2001"
  },
  {
    "name": "Lesson2_part3_4",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/jqk5ghl2Gydz17/html",
    "description": "\n\nauthor: mbb2001"
  },
  {
    "name": "Lesson2_part3_4",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/jqk5ghl2Gydz17",
    "description": "\n\nauthor: mbb2001"
  },
  {
    "name": "Linear Equations in Standard Form",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/5iPModyYscESlO/html",
    "description": "\n\nauthor: lothomas"
  },
  {
    "name": "Linear Equations in Standard Form",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/5iPModyYscESlO",
    "description": "\n\nauthor: lothomas"
  },
  {
    "name": "Linear Equations in Standard Form",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/5iPModyYscESlO/html",
    "description": "\n\nauthor: lothomas"
  },
  {
    "name": "Math facts for 9",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/0mGUi5pl7KnLW4",
    "description": "﻿The students will view a quick way to learn the facts of 9.\n\nauthor: mlarsen"
  },
  {
    "name": "Math facts for 9",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/0mGUi5pl7KnLW4/html",
    "description": "﻿The students will view a quick way to learn the facts of 9.\n\nauthor: mlarsen"
  },
  {
    "name": "Medisoft Chart Numbers Quiz IT",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/J9G1uWTKlBPxc6",
    "description": "\n\nauthor: srussell0048"
  },
  {
    "name": "Medisoft Chart Numbers Quiz IT",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/J9G1uWTKlBPxc6/html",
    "description": "\n\nauthor: srussell0048"
  },
  {
    "name": "Medisoft Chart Numbers Quiz IT",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/J9G1uWTKlBPxc6/html",
    "description": "\n\nauthor: srussell0048"
  },
  {
    "name": "Metaphor jigsaw puzzle",
    "image_url": "http://www.softchalkconnect.com/images/activities/jigsawpuzzle.png",
    "url": "http://www.softchalkconnect.com/widget/C3hbqIjELHiAt1",
    "description": "﻿This is an activity featuring extended metaphor.\n\nauthor: HawkeyeSteve"
  },
  {
    "name": "Metaphor jigsaw puzzle",
    "image_url": "http://www.softchalkconnect.com/images/activities/jigsawpuzzle.png",
    "url": "http://www.softchalkconnect.com/widget/serve/C3hbqIjELHiAt1/html",
    "description": "﻿This is an activity featuring extended metaphor.\n\nauthor: HawkeyeSteve"
  },
  {
    "name": "Microbiology Laboratory Manual",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/uwAQskZ7fD8Xtg",
    "description": "Online microbiology laboratory module covering the Gram stain procedure\n\nauthor: Franklund"
  },
  {
    "name": "Microbiology Laboratory Manual",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/uwAQskZ7fD8Xtg/html",
    "description": "Online microbiology laboratory module covering the Gram stain procedure\n\nauthor: Franklund"
  },
  {
    "name": "Microbiology Laboratory Manual",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/uwAQskZ7fD8Xtg/html",
    "description": "Online microbiology laboratory module covering the Gram stain procedure\n\nauthor: Franklund"
  },
  {
    "name": "MISSIONSoftchalk",
    "image_url": "http://www.softchalkconnect.com/images/courses/course.png",
    "url": "http://www.softchalkconnect.com/course/serve/mfQHyFpNTakJjz/html",
    "description": "\n\nauthor: leahmacvie"
  },
  {
    "name": "MLA Guidelines Matching Activity",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/OXMPfAbiyUEWw6",
    "description": "Match each MLA paper format guideline with the item it refers to.\n\nauthor: AmyGF"
  },
  {
    "name": "MLA Guidelines Matching Activity",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/serve/OXMPfAbiyUEWw6/html",
    "description": "Match each MLA paper format guideline with the item it refers to.\n\nauthor: AmyGF"
  },
  {
    "name": "Module 3-Prenatal Development",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/cvWsYULQAIGhil",
    "description": "This module explores prenatal development from conception to childbirth.\n\nauthor: araumaker"
  },
  {
    "name": "Module 3-Prenatal Development",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/cvWsYULQAIGhil/html",
    "description": "This module explores prenatal development from conception to childbirth.\n\nauthor: araumaker"
  },
  {
    "name": "Module 3-Prenatal Development",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/cvWsYULQAIGhil/html",
    "description": "This module explores prenatal development from conception to childbirth.\n\nauthor: araumaker"
  },
  {
    "name": "Module 4",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/izs2Pmog8cUKdC/html",
    "description": "\n\nauthor: Prof_Bartholomew"
  },
  {
    "name": "Module 4",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/izs2Pmog8cUKdC",
    "description": "\n\nauthor: Prof_Bartholomew"
  },
  {
    "name": "Module 4",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/izs2Pmog8cUKdC/html",
    "description": "\n\nauthor: Prof_Bartholomew"
  },
  {
    "name": "Moorish Idol (Zanclidae)",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/uGjqzUpa4L3QiA/html",
    "description": "Images of Moorish Idol (Zanclidae)\n\nauthor: mcootefreeman"
  },
  {
    "name": "Moorish Idol (Zanclidae)",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/uGjqzUpa4L3QiA",
    "description": "Images of Moorish Idol (Zanclidae)\n\nauthor: mcootefreeman"
  },
  {
    "name": "Multiples",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/serve/ak8ug4nCitPY0R/html",
    "description": "The students will sort the numbers to its correct multiple.\n\nauthor: mlarsen"
  },
  {
    "name": "Multiples",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/ak8ug4nCitPY0R",
    "description": "The students will sort the numbers to its correct multiple.\n\nauthor: mlarsen"
  },
  {
    "name": "Multiplication Principle",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/IAR0n38lkrPbvZ",
    "description": "The students will solve one step equations using the Multiplication Principle.\n\nauthor: mlarsen"
  },
  {
    "name": "Multiplication Principle",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/serve/IAR0n38lkrPbvZ/html",
    "description": "The students will solve one step equations using the Multiplication Principle.\n\nauthor: mlarsen"
  },
  {
    "name": "Mystery Number Game",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/gKBeELX2GpQvhm",
    "description": "﻿The students will review prime and composite numbers, divisibility rules, simplifying rules and place-value.\n\nauthor: mlarsen"
  },
  {
    "name": "Mystery Number Game",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/gKBeELX2GpQvhm/html",
    "description": "﻿The students will review prime and composite numbers, divisibility rules, simplifying rules and place-value.\n\nauthor: mlarsen"
  },
  {
    "name": "Mystery Number Game 2",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/6m8AreNdcza0Fy",
    "description": "﻿The students will be given clues about a digit and they will place the digit in its correct place value.\n\nauthor: mlarsen"
  },
  {
    "name": "Mystery Number Game 2",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/6m8AreNdcza0Fy/html",
    "description": "﻿The students will be given clues about a digit and they will place the digit in its correct place value.\n\nauthor: mlarsen"
  },
  {
    "name": "Mystery Number Game with Decimals",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/RAhTV0jfwODNGE",
    "description": "﻿The students will be given clues to place digits in the correct place-value.\n\nauthor: mlarsen"
  },
  {
    "name": "Mystery Number Game with Decimals",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/RAhTV0jfwODNGE/html",
    "description": "﻿The students will be given clues to place digits in the correct place-value.\n\nauthor: mlarsen"
  },
  {
    "name": "Naming compounds using labels",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/Tqu8drSMwg3HYt",
    "description": "Quick way to reinforce the proper ordering of prefixes and ions when naming chemical compounds.\n\nauthor: KennethW"
  },
  {
    "name": "Naming compounds using labels",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/serve/Tqu8drSMwg3HYt/html",
    "description": "Quick way to reinforce the proper ordering of prefixes and ions when naming chemical compounds.\n\nauthor: KennethW"
  },
  {
    "name": "Optical Illusions",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/EW75I0yLtFu4Ap/html",
    "description": "Optical Illusions photo gallery\n\nauthor: lisaortiz"
  },
  {
    "name": "Optical Illusions",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/EW75I0yLtFu4Ap",
    "description": "Optical Illusions photo gallery\n\nauthor: lisaortiz"
  },
  {
    "name": "Orangeband Surgeonfish",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/bsGCRzfj0vtIB8/html",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "Orangeband Surgeonfish",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/bsGCRzfj0vtIB8",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "orangespine unicornfish",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/yU7OjGD3nu1riv",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "orangespine unicornfish",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/yU7OjGD3nu1riv/html",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "Ordering Activity #1",
    "image_url": "http://www.softchalkconnect.com/images/activities/ordering.png",
    "url": "http://www.softchalkconnect.com/widget/aCUAjQVelcfGXk",
    "description": "Put the steps to solving an equation in order\n\nauthor: sharonelliott"
  },
  {
    "name": "Ordering Activity #1",
    "image_url": "http://www.softchalkconnect.com/images/activities/ordering.png",
    "url": "http://www.softchalkconnect.com/widget/serve/aCUAjQVelcfGXk/html",
    "description": "Put the steps to solving an equation in order\n\nauthor: sharonelliott"
  },
  {
    "name": "Ordering Rational Numbers",
    "image_url": "http://www.softchalkconnect.com/images/activities/ordering.png",
    "url": "http://www.softchalkconnect.com/widget/serve/5ASZemgrMiE7Ho/html",
    "description": "The students will put the rational numbers in order from least to greatest.\n\nauthor: mlarsen"
  },
  {
    "name": "Ordering Rational Numbers",
    "image_url": "http://www.softchalkconnect.com/images/activities/ordering.png",
    "url": "http://www.softchalkconnect.com/widget/5ASZemgrMiE7Ho",
    "description": "The students will put the rational numbers in order from least to greatest.\n\nauthor: mlarsen"
  },
  {
    "name": "Palindrome",
    "image_url": "http://www.softchalkconnect.com/images/activities/slideshow.png",
    "url": "http://www.softchalkconnect.com/widget/ga1GD9ri4p6tYw",
    "description": "﻿The students will create a number palindrome.\n\nauthor: mlarsen"
  },
  {
    "name": "Palindrome",
    "image_url": "http://www.softchalkconnect.com/images/activities/slideshow.png",
    "url": "http://www.softchalkconnect.com/widget/serve/ga1GD9ri4p6tYw/html",
    "description": "﻿The students will create a number palindrome.\n\nauthor: mlarsen"
  },
  {
    "name": "Parabola Hot Spot Activity",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/serve/WqmkKt0NnwGcDz/html",
    "description": "This is a hot spot activity for the student to learn the different parts of a parabola.\n\nauthor: Ginger.Dewey"
  },
  {
    "name": "Parabola Hot Spot Activity",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/WqmkKt0NnwGcDz",
    "description": "This is a hot spot activity for the student to learn the different parts of a parabola.\n\nauthor: Ginger.Dewey"
  },
  {
    "name": "Paraphrase, Quote, or Common Knowledge",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/xULc407r8iW3qk",
    "description": "Label each fact in this sample essay paragragh as a Paraphrase, Quote, or Common Knowledge.\n\nauthor: AmyGF"
  },
  {
    "name": "Paraphrase, Quote, or Common Knowledge",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/serve/xULc407r8iW3qk/html",
    "description": "Label each fact in this sample essay paragragh as a Paraphrase, Quote, or Common Knowledge.\n\nauthor: AmyGF"
  },
  {
    "name": "Part 2: SoftChalk",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/INqrDnfypCv3b6/html",
    "description": "\n\nauthor: mjurbani"
  },
  {
    "name": "Part 2: SoftChalk",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/INqrDnfypCv3b6",
    "description": "\n\nauthor: mjurbani"
  },
  {
    "name": "Part 2: SoftChalk",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/INqrDnfypCv3b6/html",
    "description": "\n\nauthor: mjurbani"
  },
  {
    "name": "Parts of Essay DragNDrop",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/vi9K8UWqkOBHow",
    "description": "﻿This activity features aspects of essay structure.\n\nauthor: HawkeyeSteve"
  },
  {
    "name": "Parts of Essay DragNDrop",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/serve/vi9K8UWqkOBHow/html",
    "description": "﻿This activity features aspects of essay structure.\n\nauthor: HawkeyeSteve"
  },
  {
    "name": "Peace Sign Jigsaw Puzzle",
    "image_url": "http://www.softchalkconnect.com/images/activities/jigsawpuzzle.png",
    "url": "http://www.softchalkconnect.com/widget/serve/fGgAiRYr3MX0zD/html",
    "description": "Peace Sign Jigsaw Puzzle\n\nauthor: HawkeyeSteve"
  },
  {
    "name": "Peace Sign Jigsaw Puzzle",
    "image_url": "http://www.softchalkconnect.com/images/activities/jigsawpuzzle.png",
    "url": "http://www.softchalkconnect.com/widget/fGgAiRYr3MX0zD",
    "description": "Peace Sign Jigsaw Puzzle\n\nauthor: HawkeyeSteve"
  },
  {
    "name": "Personal Money Management Choices",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/wgS0JALpaWj1sN/html",
    "description": "\n\nauthor: rhanson"
  },
  {
    "name": "Personal Money Management Choices",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/wgS0JALpaWj1sN/html",
    "description": "\n\nauthor: rhanson"
  },
  {
    "name": "Personal Money Management Choices",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/wgS0JALpaWj1sN",
    "description": "\n\nauthor: rhanson"
  },
  {
    "name": "Pinktail Triggerfish",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/wNZ8Tf0myR9uov/html",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "Pinktail Triggerfish",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/wNZ8Tf0myR9uov",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "Place value",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/E4LwMX0ZRK1hA9",
    "description": "﻿The students will name the digits place value.\n\nauthor: mlarsen"
  },
  {
    "name": "Place value",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/serve/E4LwMX0ZRK1hA9/html",
    "description": "﻿The students will name the digits place value.\n\nauthor: mlarsen"
  },
  {
    "name": "Place value Activity",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/XwPVq1fWkODri8",
    "description": "﻿The students will match the correct number to its word name.\n\nauthor: mlarsen"
  },
  {
    "name": "Place value Activity",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/serve/XwPVq1fWkODri8/html",
    "description": "﻿The students will match the correct number to its word name.\n\nauthor: mlarsen"
  },
  {
    "name": "Place value quiz",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/epG6PE2AXdK8NZ",
    "description": "The students will name each digit's place value.\n\nauthor: mlarsen"
  },
  {
    "name": "Place value quiz",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/serve/epG6PE2AXdK8NZ/html",
    "description": "The students will name each digit's place value.\n\nauthor: mlarsen"
  },
  {
    "name": "Plagiarism Sorting Activity",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/Lflh5VFOSgmdAa",
    "description": "Sort each statement into the Plagiarism or Not Plagiarism category.\n\nauthor: AmyGF"
  },
  {
    "name": "Plagiarism Sorting Activity",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/serve/Lflh5VFOSgmdAa/html",
    "description": "Sort each statement into the Plagiarism or Not Plagiarism category.\n\nauthor: AmyGF"
  },
  {
    "name": "Polygons in the Coordinate Plane",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/6y1kqdc5RIwiJ7",
    "description": "Plotting points on the coordinate plane, finding the length of a side, creating items on the coordinate plane\n\nauthor: jnaile"
  },
  {
    "name": "Polygons in the Coordinate Plane",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/6y1kqdc5RIwiJ7/html",
    "description": "Plotting points on the coordinate plane, finding the length of a side, creating items on the coordinate plane\n\nauthor: jnaile"
  },
  {
    "name": "Polygons in the Coordinate Plane",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/6y1kqdc5RIwiJ7/html",
    "description": "Plotting points on the coordinate plane, finding the length of a side, creating items on the coordinate plane\n\nauthor: jnaile"
  },
  {
    "name": "Positive and Negative Numbers",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/XMrOdwURV9H1q5",
    "description": "The students will sort the integers as positive or negative.\n\nauthor: mlarsen"
  },
  {
    "name": "Positive and Negative Numbers",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/serve/XMrOdwURV9H1q5/html",
    "description": "The students will sort the integers as positive or negative.\n\nauthor: mlarsen"
  },
  {
    "name": "Primary Nutrients",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/serve/PfYBOF93Dpeyzh/html",
    "description": "Nutrition Module\n\nauthor: trigobod"
  },
  {
    "name": "Primary Nutrients",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/PfYBOF93Dpeyzh",
    "description": "Nutrition Module\n\nauthor: trigobod"
  },
  {
    "name": "Prime and Composite Numbers",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/serve/G4W6KgdSOlA5q3/html",
    "description": "﻿The students will be able to sort the numbers into the correct category as either prime, composite, or neither.\n\nauthor: mlarsen"
  },
  {
    "name": "Prime and Composite Numbers",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/G4W6KgdSOlA5q3",
    "description": "﻿The students will be able to sort the numbers into the correct category as either prime, composite, or neither.\n\nauthor: mlarsen"
  },
  {
    "name": "Prince & The Revolutions",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/2ocOPy5Hmnw7AU/html",
    "description": "Prince & the Revolutions Online Information\n\nauthor: robwhe"
  },
  {
    "name": "Prince & The Revolutions",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/2ocOPy5Hmnw7AU/html",
    "description": "Prince & the Revolutions Online Information\n\nauthor: robwhe"
  },
  {
    "name": "Prince & The Revolutions",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/MPLvdI6g4z5nDb/html",
    "description": "Prince & the Revolutions Online Information\n\nauthor: robwhe"
  },
  {
    "name": "Prince & The Revolutions",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/MPLvdI6g4z5nDb",
    "description": "Prince & the Revolutions Online Information\n\nauthor: robwhe"
  },
  {
    "name": "Prince & The Revolutions",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/MPLvdI6g4z5nDb/html",
    "description": "Prince & the Revolutions Online Information\n\nauthor: robwhe"
  },
  {
    "name": "Prince & The Revolutions",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/2ocOPy5Hmnw7AU",
    "description": "Prince & the Revolutions Online Information\n\nauthor: robwhe"
  },
  {
    "name": "Psychology of Color",
    "image_url": "http://www.softchalkconnect.com/images/activities/tabbedpane.png",
    "url": "http://www.softchalkconnect.com/widget/ATyI8eUp0fFsjc",
    "description": "Tabbed activity of color psychology\n\nauthor: lisaortiz"
  },
  {
    "name": "Psychology of Color",
    "image_url": "http://www.softchalkconnect.com/images/activities/tabbedpane.png",
    "url": "http://www.softchalkconnect.com/widget/serve/ATyI8eUp0fFsjc/html",
    "description": "Tabbed activity of color psychology\n\nauthor: lisaortiz"
  },
  {
    "name": "Q Abbreviations",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/serve/CQxWMqpnLrXSm2/html",
    "description": "drop and drag with abbreviation that begin with the letter Q\n\nauthor: rwaller"
  },
  {
    "name": "Q Abbreviations",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/CQxWMqpnLrXSm2",
    "description": "drop and drag with abbreviation that begin with the letter Q\n\nauthor: rwaller"
  },
  {
    "name": "R Murray Schafer",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/P7Q9mB8JU3VSGK/html",
    "description": "An Eclectic Canadian Composer\n\nauthor: marathonlearning"
  },
  {
    "name": "R Murray Schafer",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/P7Q9mB8JU3VSGK",
    "description": "An Eclectic Canadian Composer\n\nauthor: marathonlearning"
  },
  {
    "name": "R Murray Schafer",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/P7Q9mB8JU3VSGK/html",
    "description": "An Eclectic Canadian Composer\n\nauthor: marathonlearning"
  },
  {
    "name": "Rectangular Coordinate System",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/PmCRl52nLfYBXh",
    "description": "The students will label the Rectangular Coordinate System.\n\nauthor: mlarsen"
  },
  {
    "name": "Rectangular Coordinate System",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/serve/PmCRl52nLfYBXh/html",
    "description": "The students will label the Rectangular Coordinate System.\n\nauthor: mlarsen"
  },
  {
    "name": "Rectangular Coordinate System Labeling",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/serve/jzfQG7dm8DPN1c/html",
    "description": "The students will label the Rectangular Coordinate System.\n\nauthor: mlarsen"
  },
  {
    "name": "Rectangular Coordinate System Labeling",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/jzfQG7dm8DPN1c",
    "description": "The students will label the Rectangular Coordinate System.\n\nauthor: mlarsen"
  },
  {
    "name": "Reef Fish Life West Coast Big Island Hawaii",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/OVigKcApG0IJwP",
    "description": "Intoduction ot reef life Big Island Hawaii Lesson1\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Fish Life West Coast Big Island Hawaii",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/OVigKcApG0IJwP/html",
    "description": "Intoduction ot reef life Big Island Hawaii Lesson1\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Fish Life West Coast Big Island Hawaii",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/OVigKcApG0IJwP/html",
    "description": "Intoduction ot reef life Big Island Hawaii Lesson1\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Life Hawai Lesson 6",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/g48LTDlHA6mcxe/html",
    "description": "Describe in detail Parrotfish ( Scaridae ) Wrasses ( labridae )\n\n\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Life Hawai Lesson 6",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/g48LTDlHA6mcxe",
    "description": "Describe in detail Parrotfish ( Scaridae ) Wrasses ( labridae )\n\n\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Life Hawai Lesson 6",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/g48LTDlHA6mcxe/html",
    "description": "Describe in detail Parrotfish ( Scaridae ) Wrasses ( labridae )\n\n\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Life Hawaii   Lesson 2",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/MU1sehbSk5p9rQ/html",
    "description": "Details of Butterflyfish found in west coast waters Big Island Hawaii\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Life Hawaii   Lesson 2",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/MU1sehbSk5p9rQ",
    "description": "Details of Butterflyfish found in west coast waters Big Island Hawaii\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Life Hawaii   Lesson 2",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/MU1sehbSk5p9rQ/html",
    "description": "Details of Butterflyfish found in west coast waters Big Island Hawaii\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Life Hawaii Lesson 3",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/eQzFwEm9aAxnhO",
    "description": " Description in detail of Surgeonfish found in west coast waters Big Island Hawaii.Surgeonfishes, Unicornfishes and Tangs (Family Acanthuridae)\n\n\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Life Hawaii Lesson 3",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/eQzFwEm9aAxnhO/html",
    "description": " Description in detail of Surgeonfish found in west coast waters Big Island Hawaii.Surgeonfishes, Unicornfishes and Tangs (Family Acanthuridae)\n\n\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Life Hawaii Lesson 3",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/eQzFwEm9aAxnhO/html",
    "description": " Description in detail of Surgeonfish found in west coast waters Big Island Hawaii.Surgeonfishes, Unicornfishes and Tangs (Family Acanthuridae)\n\n\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Life Hawaii Lesson 4",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/MNp0SqxFDAez1f/html",
    "description": "Description in detail of Trigger Fish, Puffer Fish, Eels, Needlefish and Cornetfishes\n\n\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Life Hawaii Lesson 4",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/MNp0SqxFDAez1f",
    "description": "Description in detail of Trigger Fish, Puffer Fish, Eels, Needlefish and Cornetfishes\n\n\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Life Hawaii Lesson 4",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/MNp0SqxFDAez1f/html",
    "description": "Description in detail of Trigger Fish, Puffer Fish, Eels, Needlefish and Cornetfishes\n\n\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Life Hawaii lesson 5",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/smMi8gtfFvRU6u/html",
    "description": "Reef Life details Moorish Idols, Boxfish,filefish,groupers, goatfish\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Life Hawaii lesson 5",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/smMi8gtfFvRU6u",
    "description": "Reef Life details Moorish Idols, Boxfish,filefish,groupers, goatfish\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Life Hawaii lesson 5",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/smMi8gtfFvRU6u/html",
    "description": "Reef Life details Moorish Idols, Boxfish,filefish,groupers, goatfish\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Life Hawaii Lesson 7",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/SgZ4YJt1DFArBo",
    "description": "Identify, describe in detail Green Turtles (Chelonidae)\n\n\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Life Hawaii Lesson 7",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/SgZ4YJt1DFArBo/html",
    "description": "Identify, describe in detail Green Turtles (Chelonidae)\n\n\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Life Hawaii Lesson 7",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/SgZ4YJt1DFArBo/html",
    "description": "Identify, describe in detail Green Turtles (Chelonidae)\n\n\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Life Hawaii Lesson 8",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/tePYvVpzD9QcOs",
    "description": "Identify and describe in detail Spinner Dolphin (Stenella longirostris) plus Summary of all Hawaian names of fish presented.  Author notes of 8 lessons on Reef Life Big Island Hawaii\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Life Hawaii Lesson 8",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/tePYvVpzD9QcOs/html",
    "description": "Identify and describe in detail Spinner Dolphin (Stenella longirostris) plus Summary of all Hawaian names of fish presented.  Author notes of 8 lessons on Reef Life Big Island Hawaii\n\nauthor: mcootefreeman"
  },
  {
    "name": "Reef Life Hawaii Lesson 8",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/tePYvVpzD9QcOs/html",
    "description": "Identify and describe in detail Spinner Dolphin (Stenella longirostris) plus Summary of all Hawaian names of fish presented.  Author notes of 8 lessons on Reef Life Big Island Hawaii\n\nauthor: mcootefreeman"
  },
  {
    "name": "Rock Types",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/whNAF9qxpK7Ymy",
    "description": "﻿Sorting activity for the 3 types of rocks\n\nauthor: help"
  },
  {
    "name": "Rock Types",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/serve/whNAF9qxpK7Ymy/html",
    "description": "﻿Sorting activity for the 3 types of rocks\n\nauthor: help"
  },
  {
    "name": "Sailfish Tangs",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/jtSFDmowxJRcGV",
    "description": "images of sailfish tangs\n\nauthor: mcootefreeman"
  },
  {
    "name": "Sailfish Tangs",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/jtSFDmowxJRcGV/html",
    "description": "images of sailfish tangs\n\nauthor: mcootefreeman"
  },
  {
    "name": "Second Grade SOL Math Review",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/mWpyOSlPRkeFi6/html",
    "description": "Second grade SOL mathematics review.\n\nauthor: dpainter"
  },
  {
    "name": "Second Grade SOL Math Review",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/mWpyOSlPRkeFi6/html",
    "description": "Second grade SOL mathematics review.\n\nauthor: dpainter"
  },
  {
    "name": "Second Grade SOL Math Review",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/mWpyOSlPRkeFi6",
    "description": "Second grade SOL mathematics review.\n\nauthor: dpainter"
  },
  {
    "name": "Seven levels of Multiple Intelligences",
    "image_url": "http://www.softchalkconnect.com/images/activities/sectionedshape.png",
    "url": "http://www.softchalkconnect.com/widget/wiub1XsmJD3Z9p",
    "description": "﻿This is an activity feature Howard Garnder's Seven Level of Multiple Intelligences.\n\nauthor: HawkeyeSteve"
  },
  {
    "name": "Seven levels of Multiple Intelligences",
    "image_url": "http://www.softchalkconnect.com/images/activities/sectionedshape.png",
    "url": "http://www.softchalkconnect.com/widget/serve/wiub1XsmJD3Z9p/html",
    "description": "﻿This is an activity feature Howard Garnder's Seven Level of Multiple Intelligences.\n\nauthor: HawkeyeSteve"
  },
  {
    "name": "Short Answer",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/QiPUpOScyanluW/html",
    "description": "\n\nauthor: mel.vasq"
  },
  {
    "name": "Short Answer",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/QiPUpOScyanluW/html",
    "description": "\n\nauthor: mel.vasq"
  },
  {
    "name": "Short Answer",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/QiPUpOScyanluW",
    "description": "\n\nauthor: mel.vasq"
  },
  {
    "name": "Simplifying Rules",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/j6voSWDzi0bkxa",
    "description": "﻿The students will simply the fractions working with 1 and 0.\n\nauthor: mlarsen"
  },
  {
    "name": "Simplifying Rules",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/serve/j6voSWDzi0bkxa/html",
    "description": "﻿The students will simply the fractions working with 1 and 0.\n\nauthor: mlarsen"
  },
  {
    "name": "Skeleton1",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/ouSpMTDeqziCQ2",
    "description": "Drag and Drop labelling activity for basic bone structures in the superior portion of the body.\n\nauthor: ieccd"
  },
  {
    "name": "Skeleton1",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/serve/ouSpMTDeqziCQ2/html",
    "description": "Drag and Drop labelling activity for basic bone structures in the superior portion of the body.\n\nauthor: ieccd"
  },
  {
    "name": "Solving Linear Equations Interactive Tutorial",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/DEmavjC16ucZAT",
    "description": "\n\nauthor: srobnor"
  },
  {
    "name": "Solving Linear Equations Interactive Tutorial",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/DEmavjC16ucZAT/html",
    "description": "\n\nauthor: srobnor"
  },
  {
    "name": "Solving Linear Equations Interactive Tutorial",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/DEmavjC16ucZAT/html",
    "description": "\n\nauthor: srobnor"
  },
  {
    "name": "Solving Two Step Equations",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/659TbODKErIGVe",
    "description": "The students will solve equations using the addition and multiplication principles.\n\nauthor: mlarsen"
  },
  {
    "name": "Solving Two Step Equations",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/serve/659TbODKErIGVe/html",
    "description": "The students will solve equations using the addition and multiplication principles.\n\nauthor: mlarsen"
  },
  {
    "name": "Sorting - delegates by state",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/serve/emFBWvRoNuUbQ1/html",
    "description": "﻿Representatives to the declaration signing by state\n\nauthor: SteveSaltzberg"
  },
  {
    "name": "Sorting - delegates by state",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/emFBWvRoNuUbQ1",
    "description": "﻿Representatives to the declaration signing by state\n\nauthor: SteveSaltzberg"
  },
  {
    "name": "Special Citations in Citing a Source",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/serve/7LiznrIGEYws0R/html",
    "description": "Match the special situation with its requirment.\n\nauthor: AmyGF"
  },
  {
    "name": "Special Citations in Citing a Source",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/7LiznrIGEYws0R",
    "description": "Match the special situation with its requirment.\n\nauthor: AmyGF"
  },
  {
    "name": "Squares and Square Root Matching",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/serve/mqWdw0pCJnetZU/html",
    "description": "﻿The student will square the given number to find its square root on the clock.\n\nauthor: mlarsen"
  },
  {
    "name": "Squares and Square Root Matching",
    "image_url": "http://www.softchalkconnect.com/images/activities/hotspot.png",
    "url": "http://www.softchalkconnect.com/widget/mqWdw0pCJnetZU",
    "description": "﻿The student will square the given number to find its square root on the clock.\n\nauthor: mlarsen"
  },
  {
    "name": "Sripebelly and Spotted Puffer",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/ubrcdaInW2XUoP/html",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "Sripebelly and Spotted Puffer",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/ubrcdaInW2XUoP",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "States and Capitols Crossword",
    "image_url": "http://www.softchalkconnect.com/images/activities/crossword.png",
    "url": "http://www.softchalkconnect.com/widget/k5AeNfuB8UQxhH",
    "description": "This shows all 50 states and the capitols\n\nauthor: JontheGreat"
  },
  {
    "name": "States and Capitols Crossword",
    "image_url": "http://www.softchalkconnect.com/images/activities/crossword.png",
    "url": "http://www.softchalkconnect.com/widget/serve/k5AeNfuB8UQxhH/html",
    "description": "This shows all 50 states and the capitols\n\nauthor: JontheGreat"
  },
  {
    "name": "Strange Fact about John Quincy Adams",
    "image_url": "http://www.softchalkconnect.com/images/activities/didyouknow.png",
    "url": "http://www.softchalkconnect.com/widget/serve/AHucaULSWo7O8z/html",
    "description": "DId you know JQA was the first president to be interviewd by a woman\n\nauthor: me2athome"
  },
  {
    "name": "Strange Fact about John Quincy Adams",
    "image_url": "http://www.softchalkconnect.com/images/activities/didyouknow.png",
    "url": "http://www.softchalkconnect.com/widget/AHucaULSWo7O8z",
    "description": "DId you know JQA was the first president to be interviewd by a woman\n\nauthor: me2athome"
  },
  {
    "name": "suffixes_gastro",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/f8IwXdjEg7QAn0",
    "description": "Provides practice with defining suffixes before systemic word roots have been mastered.\n\nauthor: rwaller"
  },
  {
    "name": "suffixes_gastro",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/serve/f8IwXdjEg7QAn0/html",
    "description": "Provides practice with defining suffixes before systemic word roots have been mastered.\n\nauthor: rwaller"
  },
  {
    "name": "Surgeonfish exercise",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/serve/JD1G97hif6Mav8/html",
    "description": "Visually identify the different fish in this family\n\nauthor: mcootefreeman"
  },
  {
    "name": "Surgeonfish exercise",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/JD1G97hif6Mav8",
    "description": "Visually identify the different fish in this family\n\nauthor: mcootefreeman"
  },
  {
    "name": "Surgeonfishes ( Acanthuridae)",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/0tYDej3IJ25Fdq/html",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "Surgeonfishes ( Acanthuridae)",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/0tYDej3IJ25Fdq",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "Tangs reef fish",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/RXcIV5DEP2xG8U",
    "description": "several images\n\nauthor: mcootefreeman"
  },
  {
    "name": "Tangs reef fish",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/RXcIV5DEP2xG8U/html",
    "description": "several images\n\nauthor: mcootefreeman"
  },
  {
    "name": "The Life of George Washington",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/Fz8Y9md37EP1jV",
    "description": "\n\nauthor: tpowers"
  },
  {
    "name": "The Life of George Washington",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/Fz8Y9md37EP1jV/html",
    "description": "\n\nauthor: tpowers"
  },
  {
    "name": "The Life of George Washington",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/Fz8Y9md37EP1jV/html",
    "description": "\n\nauthor: tpowers"
  },
  {
    "name": "The US - Mexican War, 1846 - 1848",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/RlCX0z8wyovFtu",
    "description": "\n\nauthor: gbpreuss"
  },
  {
    "name": "The US - Mexican War, 1846 - 1848",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/RlCX0z8wyovFtu/html",
    "description": "\n\nauthor: gbpreuss"
  },
  {
    "name": "The US - Mexican War, 1846 - 1848",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/RlCX0z8wyovFtu/html",
    "description": "\n\nauthor: gbpreuss"
  },
  {
    "name": "The World Jigsaw Puzzle",
    "image_url": "http://www.softchalkconnect.com/images/activities/jigsawpuzzle.png",
    "url": "http://www.softchalkconnect.com/widget/3WFcMVhuZA2sai",
    "description": "Fit the pieces of the world together\n\nauthor: missbeeucm"
  },
  {
    "name": "The World Jigsaw Puzzle",
    "image_url": "http://www.softchalkconnect.com/images/activities/jigsawpuzzle.png",
    "url": "http://www.softchalkconnect.com/widget/serve/3WFcMVhuZA2sai/html",
    "description": "Fit the pieces of the world together\n\nauthor: missbeeucm"
  },
  {
    "name": "Third Law of Motion",
    "image_url": "http://www.softchalkconnect.com/images/activities/didyouknow.png",
    "url": "http://www.softchalkconnect.com/widget/z7BISYskiGjD3Q",
    "description": "﻿This short factoid states the Third Law of Motion as generalized by Isaac Newton\n\nauthor: devans"
  },
  {
    "name": "Third Law of Motion",
    "image_url": "http://www.softchalkconnect.com/images/activities/didyouknow.png",
    "url": "http://www.softchalkconnect.com/widget/serve/z7BISYskiGjD3Q/html",
    "description": "﻿This short factoid states the Third Law of Motion as generalized by Isaac Newton\n\nauthor: devans"
  },
  {
    "name": "Transition activity",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/TiepzqkA82IMb5",
    "description": "﻿This is an activity for matching transitions to definitions.\n\nauthor: HawkeyeSteve"
  },
  {
    "name": "Transition activity",
    "image_url": "http://www.softchalkconnect.com/images/activities/dragndrop.png",
    "url": "http://www.softchalkconnect.com/widget/serve/TiepzqkA82IMb5/html",
    "description": "﻿This is an activity for matching transitions to definitions.\n\nauthor: HawkeyeSteve"
  },
  {
    "name": "Triggerfish and others",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/5xSWB32Grd1qcm",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "Triggerfish and others",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/serve/5xSWB32Grd1qcm/html",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "Trigonometry: Standard Position Angle Labeling",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/GOeji8fNn6sBxK",
    "description": "﻿Practice finding the terminal sides of (positive or negative) angles in standard position.\n\nauthor: lbrown32"
  },
  {
    "name": "Trigonometry: Standard Position Angle Labeling",
    "image_url": "http://www.softchalkconnect.com/images/activities/labeling.png",
    "url": "http://www.softchalkconnect.com/widget/serve/GOeji8fNn6sBxK/html",
    "description": "﻿Practice finding the terminal sides of (positive or negative) angles in standard position.\n\nauthor: lbrown32"
  },
  {
    "name": "Trigonometry: Values at 30, 45, 60 degrees",
    "image_url": "http://www.softchalkconnect.com/images/activities/flashcard.png",
    "url": "http://www.softchalkconnect.com/widget/serve/EPkH2zis8UmMd4/html",
    "description": "﻿Values of the six trigonometric function at 30, 45, and 60 degrees.\n\nauthor: lbrown32"
  },
  {
    "name": "Trigonometry: Values at 30, 45, 60 degrees",
    "image_url": "http://www.softchalkconnect.com/images/activities/flashcard.png",
    "url": "http://www.softchalkconnect.com/widget/EPkH2zis8UmMd4",
    "description": "﻿Values of the six trigonometric function at 30, 45, and 60 degrees.\n\nauthor: lbrown32"
  },
  {
    "name": "Types of Fractions",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/serve/zNV4ULXjTcaiS8/html",
    "description": "﻿The students will sort the fractions by Proper, Improper or Mixed Number.\n\nauthor: mlarsen"
  },
  {
    "name": "Types of Fractions",
    "image_url": "http://www.softchalkconnect.com/images/activities/sorting.png",
    "url": "http://www.softchalkconnect.com/widget/zNV4ULXjTcaiS8",
    "description": "﻿The students will sort the fractions by Proper, Improper or Mixed Number.\n\nauthor: mlarsen"
  },
  {
    "name": "Unit III",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/Idr0OR1cH3UxLX/html",
    "description": "The heart facts of regular exercise\n\nauthor: ccollins"
  },
  {
    "name": "Unit III",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/Idr0OR1cH3UxLX",
    "description": "The heart facts of regular exercise\n\nauthor: ccollins"
  },
  {
    "name": "Unit III",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/Idr0OR1cH3UxLX/html",
    "description": "The heart facts of regular exercise\n\nauthor: ccollins"
  },
  {
    "name": "Verbal/Non-Verbal Communication",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/lWrNK2jCfLg4zw/html",
    "description": "\n\nauthor: jess096"
  },
  {
    "name": "Verbal/Non-Verbal Communication",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/lWrNK2jCfLg4zw/html",
    "description": "\n\nauthor: jess096"
  },
  {
    "name": "Verbal/Non-Verbal Communication",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/lWrNK2jCfLg4zw",
    "description": "\n\nauthor: jess096"
  },
  {
    "name": "Vitamin Crossword Puzzle",
    "image_url": "http://www.softchalkconnect.com/images/activities/crossword.png",
    "url": "http://www.softchalkconnect.com/widget/serve/BG9hWpReNrKzHQ/html",
    "description": "﻿Vitamin crossword puzzle\n\nauthor: Brittany"
  },
  {
    "name": "Vitamin Crossword Puzzle",
    "image_url": "http://www.softchalkconnect.com/images/activities/crossword.png",
    "url": "http://www.softchalkconnect.com/widget/BG9hWpReNrKzHQ",
    "description": "﻿Vitamin crossword puzzle\n\nauthor: Brittany"
  },
  {
    "name": "War of 1812 - The Shaping of a Country",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/rti5JuNML0Ae8G",
    "description": "\n\nauthor: marathonlearning"
  },
  {
    "name": "War of 1812 - The Shaping of a Country",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/rti5JuNML0Ae8G/html",
    "description": "\n\nauthor: marathonlearning"
  },
  {
    "name": "War of 1812 - The Shaping of a Country",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/rti5JuNML0Ae8G/html",
    "description": "\n\nauthor: marathonlearning"
  },
  {
    "name": "WebQuest Building",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/MSZTuYh8tvaxRQ/html",
    "description": "\n\nauthor: sbhawn"
  },
  {
    "name": "WebQuest Building",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/MSZTuYh8tvaxRQ",
    "description": "\n\nauthor: sbhawn"
  },
  {
    "name": "WebQuest Building",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/MSZTuYh8tvaxRQ/html",
    "description": "\n\nauthor: sbhawn"
  },
  {
    "name": "Wedgetail and Lagoon Triggerfish",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/serve/gmOrt6LEUdcSMC/html",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "Wedgetail and Lagoon Triggerfish",
    "image_url": "http://www.softchalkconnect.com/images/activities/photoalbum.png",
    "url": "http://www.softchalkconnect.com/widget/gmOrt6LEUdcSMC",
    "description": "images\n\nauthor: mcootefreeman"
  },
  {
    "name": "what is a fish",
    "image_url": "http://www.softchalkconnect.com/images/activities/didyouknow.png",
    "url": "http://www.softchalkconnect.com/widget/kQ6hTS4RUw7Ie1",
    "description": "formal description\n\nauthor: mcootefreeman"
  },
  {
    "name": "what is a fish",
    "image_url": "http://www.softchalkconnect.com/images/activities/didyouknow.png",
    "url": "http://www.softchalkconnect.com/widget/serve/kQ6hTS4RUw7Ie1/html",
    "description": "formal description\n\nauthor: mcootefreeman"
  },
  {
    "name": "What is epilepsy? Intro Webinar",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/course/serve/5x9Z6BPXducM4h/html",
    "description": "\n\nauthor: fiorellavelarde"
  },
  {
    "name": "What is epilepsy? Intro Webinar",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/serve/5x9Z6BPXducM4h/html",
    "description": "\n\nauthor: fiorellavelarde"
  },
  {
    "name": "What is epilepsy? Intro Webinar",
    "image_url": "http://www.softchalkconnect.com/images/lessons/lesson.png",
    "url": "http://www.softchalkconnect.com/lesson/5x9Z6BPXducM4h",
    "description": "\n\nauthor: fiorellavelarde"
  },
  {
    "name": "World War II",
    "image_url": "http://www.softchalkconnect.com/images/courses/course.png",
    "url": "http://www.softchalkconnect.com/course/serve/AIqErHuwVCURZM/html",
    "description": "\n\nauthor: mattebery"
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