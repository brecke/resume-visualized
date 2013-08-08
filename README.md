# Resume visualized

![Resume visualized](http://d.pr/i/CScU+)

This is a simple experiment to try to visualize my job positions and expertise throughout the years in a simple chart using HTML canvas. It is heavily inspired in a TED Global Oxford talk by David McCandless. You may check it [here](http://www.informationisbeautiful.net/2010/the-beauty-of-data-visualization/).

## Setup & install

This project is built on [yeoman](http://yeoman.io/).

Install stuff:

1. `$ git clone`
2. `$ npm install`
3. `$ bower install`

Run:

1. `$ grunt server`

Run tests (more on this later):

1. `$ cd app/scripts`
2. `$ mocha`

Depoloy:

1. `grunt build` (this creates a `dist` folder)

## Configure it your way

Go to file `jobs.js` and hack away. Change the initial year in `variables.js` file.

## TODO

- Make chart interactive so it conveys a little more information (click or hover)
- Option to change default background color