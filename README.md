# FeedForward - The Quiz Social Network

![image](https://github.com/Lombard-Web-Services/FeedForward/raw/master/demo/ff-index.png)
FeedForward is an innovative Learning Management System built with multi-memory architecture. This progressive web app is coded in fullstack Javascript and support DOM storage as much as remote storage database. FeedForward permit to create a Quiz in a few minutes, on the first version 4 languages (French, Arabic, Hebrew, English) are available. 

The text and images uploaded to the quiz are instantly shown on screen in client side and without server interaction (serverless). 

An AI is detecting what type of quiz is it, another algorithm is shuffling each answers while the quiz is started. Once the quiz is created with a specific number of questions chosen, the images are automatically uploaded to the nodejs server on a level database for later use, it is acting as a CDN. 

The Quiz content can be requested through multiples API in order to retreive the data into various format such as text with blob images or direct links.  

## Example

![image](https://github.com/Lombard-Web-Services/FeedForward/raw/master/demo/quiz.gif)

## Features

You are able to create one or more quiz, Question Answer or multiple choices question, to select the time and the duration of each questions, to add pictures instantly (resized to mobile format: 854x480). Likes, Notes with star ratings, and get noticed while a user has passed your quiz with the results obtained. This PWA is MVC compliant.

## Low Code Quiz Programming language

[Q][/Q] : question tag 

[RJ][/RJ] : Return a true answer 

[RF][/RF] : Return a false answer 

[I][/I] : is an Hint 

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
* Can be installed as Mobile Application (PWA) directly from the browser 
* Load balancer included 
* Share on mobile Feature
* Multithreaded for faster processing

## Technologies

While the app is used in localhost or intranet network, less than 30ms is needed to search a needle into an haystack of 60 000 records..
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
Follow @lombardweb for further updates. 

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

## Mobile PWA install

A PWA feature has been coded to facilitate the install .
* Navigate to the main domain (IE: https://feedforward.ml)
* Click on the bottom banner of the screen

![image](https://github.com/Lombard-Web-Services/FeedForward/raw/master/demo/ff-a2hs-pwa-ribbon.png)

### Credits & License

**License:** 
![Logo de la licence CC BY-NC-ND](CC_BY-NC-ND.png)

**Credits:**
FeedForward project: Thibaut Lombard (Founder and Project Manager), Asmae Lombard (Project Coordinator,  Arabic translation - MA), Yosr Feki (Content producer - TN), Chafiq El Hammami(e2e Management), Hanane El Meskini (Content tester),  Guilad Levy (Hebrew translation), Clementine Haddad Levy (Hebrew translation)

**Credits script used:** 
Szymon Nowak, James Hall, Natalia Davydova, Sanjay Ghemawat (sanjay@google.com) and Jeff Dean (jeff@google.com), Evgeny Poberezkin (Mozilla), cure53 (DOMpurify), Twitter (Bootstrap3 & 5 , typeahead.js),  Mike Bostock (d3js.org),John Resig(jQuery), Jeff Mott (CryptoJS - ripemd160), Guillaume FREMONT (Timingfield),  Federico Zivolo (popper.min.js),Jörn Zaefferer (jQuery Validation plugin)



### License Details 📚

This work is licensed under the **Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License**. To view a copy of this license, visit [http://creativecommons.org/licenses/by-nc-nd/4.0/](http://creativecommons.org/licenses/by-nc-nd/4.0/) or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.

The main conditions of this license are:

* **Attribution (BY):** You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
* **NonCommercial (NC):** You may not use the material for commercial purposes.
* **Noderivative:** If you remix, transform, or build upon the material, you may not distribute the modified material.



### Bugs

I am not perfect, if you find a bug or someone omited to quote into the licence credits, an unexpected behavior into the PWA, i will make my best to correct fastly, send me an email : 
contact@lombard-web-services.com
