 # Summer Chores Callback Exercise

##  Overview
This project is a series of summer chores using **callbacks and Promises**. There are two seperate files: callbackVersion.js and promiseVersion.js, each containing sytax that highlights the use of each project. Each chore runs in order, and each one may succeed or randomly fail (fall asleep).

It demonstrates how **callback functions**, **Promises**, and `setTimeout`, work to create a series of events. 

## What This Project Teaches

- JavaScript functions and parameters
- Callback functions
- Asynchronous programming (`setTimeout`)
- Callback chaining 
- Randomness using `Math.random()`
- Execution order
- Promisies 

## I Learned
This project helped me become more familiar with JSON and arrow functions. It also introduced me to other syntax concepts such as template literals, asynchronous functions using setTimeout(), and function chaining. I can now identify the difference from between callbacks and Promises. I also, leanred that Promises are usually capitalized becouse it is a built=in JavaScript class an callbacks are not. 

I learned the difference between synchronous and asynchronous code, and why a callback function can appear synchronous even when it is not.
also gained insight into how these concepts are used in real applications, such as game logic systems and chance-based mechanics (like loot boxes or random event systems). Using Git Bash as my terminal with the command node callbackVersion.js and node promiseVersion.js, I was able to run the code several times to confirm that the output changed each time due to the use of randomness in the program.

## Chores in Order

The chores must be completed in sequence:

1. Mow the yard
2. Weed eat
3. Trim hedges
4. Collect wood
5. Water the garden

If any step fails, the chain stops.



## How It Works

Each chore function:
- Takes a `name` and a `callback`
- Waits a set amount of time using `setTimeout`
- Uses `Math.random()` to determine success or failure
- If successful → calls the next callback
- If failed → stops the chain

