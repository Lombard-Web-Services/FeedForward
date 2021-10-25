![image](https://github.com/Lombard-Web-Services/FeedForward/raw/master/demo/ff-index.png)
# FeedForward - The quiz Social Network
FeedForward is a Learning Management System built with multi-memory architecture. This progressive web app is coded in fullstack Javascript and support DOM storage as much as remote storage database. FeedForward permit to create a Quiz in a few minutes, compliant with 4 languages French, Arabic, Hebrew, English. The images uploaded to the quiz are instantly shown on screen in client side and without server interaction. Once the quiz is created with a specific number of questions chosen, the images are automatically uploaded to the nodejs server on a level database. the Quiz content can be requested through an API in order to retreive the data into various format, blob or direct links.   

## Example
![image](https://github.com/Lombard-Web-Services/FeedForward/raw/master/demo/quiz.gif)

## Features
You are able to create a quiz, selecting the time of each questions, adding pictures instantly (resized to mobile format: 854x480). Likes, Notes with star ratings, and get notified while a user has passed your quiz with the results obtained.

## Low Code Quiz Programming language
* [Q][/Q] : question tag 
* [RJ][/RJ] : Return a true answer 
* [RF][/RF] : Return a false answer 
* [I][/I] : is an Hint 
Example :
```sh
[Q]What time is it in Istanbul ?[/Q]
[I]The sun is shining[/I]
[RJ]Morning[/RJ]
[RF]Afternoon[/RF]
```

## Functionnalities
* API Quiz
* Social network (likes, and star rating)
* Lightning fast database storage
* Responsive theme 
* Not minified or uglifyed source code
* Multilingual
* Installable as Mobile Application (PWA) directly from the browser 
* Load balancer included
* Share on mobile Feature

## Technologies
* level
* ajv 
* html5
* css3
* Javascript
* NodeJS
* jQuery
* DOMpurify
* pm2

## Languages
* French
* Arabic
* Hebrew
* English

## Status
V1 released nightly, waiting for bugs reporting.
Tested on Android and google chrome, chromium.

## Usage
This app is easy to use.

## Server install
You need to install latest npm and nodejs previously.
```sh
npm install
```

## Loading the app
This following command permit to load the PWA in background process.
```sh
pm2 --name FeedForward start npm -- start
```

## Installing the app
A PWA feature has been coded to facilitate the install .
* Navigate to the main domain (IE: https://feedforward.ml)
* Click on the bottom banner of the screen
![image](https://github.com/Lombard-Web-Services/FeedForward/raw/master/demo/ff-a2hs-pwa-ribbon.png)


### Credits & License
Since this application has been made for educational purpose the source code of the v1 is free to use, rewrite, share, sell, and contributions are welcome to improve the work done.

FeedForward project: Thibaut Lombard (Founder and Project Manager), Asmae Lombard (Project Coordinator,  Arabic translation - MA), Yosr Feki (Content producer - TN), Chafiq El Hammami(e2e Management), Hanane El Meskini (Content tester),  Guilad Levy (Hebrew translation), Clementine Haddad Levy (Hebrew translation)

Credits script used: Szymon Nowak, James Hall, Natalia Davydova, Sanjay Ghemawat (sanjay@google.com) and Jeff Dean (jeff@google.com), Evgeny Poberezkin (Mozilla)

MIT License

Copyright (c) 2021 Thibaut Lombard (contact@lombard-web-services.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

### Bugs
I am not perfect, if you find a bug or someone omited to quote into the licence credits, an unexpected behavior into the PWA, i will make my best to correct fastly, send me an email : 
contact@lombard-web-services.com
