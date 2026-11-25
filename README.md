Summer Chores: Callbacks, Promises, and Async/Await Exercise

Live demo: 

Overview

This project is a series of summer chores using callbacks, Promises, and async/await. There are three separate files: callbackVersion.js, promiseVersion.js, and asyncAwaitVersion.js, each containing syntax that highlights the use of each approach. Each chore runs in order, and each one may succeed or randomly fail (fall asleep).

It demonstrates how callback functions, Promises, async/await, and setTimeout work to create a series of events.

Live Demo

I also built a version that runs in the browser, so you don't need Node to try it. Pick callbacks, Promises, or async/await, press Run, and watch the chores happen one by one in a Git Bash style terminal. Each chore glows its own color while it works. The code for the version you picked shows up underneath. It's in the docs folder and runs on GitHub Pages.

What This Project Teaches
JavaScript functions and parameters
Callback functions
Asynchronous programming (setTimeout)
Callback chaining
Promises, .then(), and .catch()
async/await and try/catch
Randomness using Math.random()
Execution order
I Learned

This project helped me become more familiar with JSON and arrow functions. It also introduced me to other syntax concepts such as template literals, asynchronous functions using setTimeout(), and function chaining. I can now identify the difference between callbacks and Promises. I also learned that Promises are usually capitalized because it is a built-in JavaScript class and callbacks are not. I also learned that await works with Promises and alters the look of the chain at the end of the code.

I learned the difference between synchronous and asynchronous code, and why a callback function can appear synchronous even when it is not.

I also gained insight into how these concepts are used in real applications, such as game logic systems and chance-based mechanics (like loot boxes or random event systems). Using Git Bash as my terminal with the command node callbackVersion.js and node promiseVersion.js and node asyncAwaitVersion.js, I was able to run the code several times to confirm that the output changed each time due to the use of randomness in the program.

In conclusion, callbacks can be hard to read and debug because they often create deeply nested code structures. Promises provide a flatter structure and use .then() to handle sequential steps more cleanly. async/await works with Promises and makes asynchronous code look like normal synchronous code, improving readability even further.

All three approaches can produce the same desired outcome. The main difference is not what they do, but how readable and maintainable the code is.

A few more things I learned while building the demo
An async/await function needs try/catch to handle a chore that fails. Without it, the program crashes instead of telling you she fell asleep.
Five copies of almost the same function can become two shared functions and a list. It made the demo a lot shorter.
Copying a code block can paste its label in too (mine said "Script · JS" at the top of my file), and JavaScript can't read that. One stray line broke my whole page.
If I open my project folder in the browser and see a list of files, that's not my page. I have to click into docs and open index.html.
If I change a class name in my CSS, I have to change it in the HTML and JavaScript too, or everything stops matching up.
GitHub Pages can publish from a docs folder, so my practice files and my demo can live in the same repo.
Chores in Order

The chores must be completed in sequence:

Mow the yard
Weed eat
Trim hedges
Collect wood
Water the garden

If any step fails, the chain stops. Mowing always works, but the odds get worse after that (weed eating 70%, hedges 90%, wood 40%, watering 80%), so Autumn only finishes every chore about 1 time in 5.

How It Works

In the callback version, each chore function:

Takes a name and a callback
Waits a set amount of time using setTimeout
Uses Math.random() to determine success or failure
If successful → calls the next callback
If failed → stops the chain

The Promise and async/await versions do the same job. Each chore returns a Promise that either resolves (success) or rejects (fell asleep). The Promise version chains them with .then() and catches a failure with .catch(). The async/await version uses await for each chore and try/catch for a failure.

What I Changed and Why
Added the async/await version so I could compare all three side by side.
Added try/catch to the async/await version, because it crashed when Autumn fell asleep.
Made the files match. They had different "fell asleep" messages and her name was typed two different ways, which made the output hard to compare.
Built the live demo. A Node file only works in a terminal, and I wanted people to be able to see it run without cloning anything.
Styled it like my Mimic to Mastery site. Navy and cyan, glass panels, and a Git Bash style terminal. Each version has its own color and button so they look separate.
Split the demo into HTML, CSS, and JavaScript files so each one is easier to read and change.
Used shared functions in the demo. The Node files still have a separate function for every chore, as I wrote them.
Running It

In Git Bash or any terminal with Node installed:

node callbackVersion.js
node promiseVersion.js
node asyncAwaitVersion.js

Run each one several times. The output changes every time.



© 2026 Mimic to Mastery.



