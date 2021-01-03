# Movie Nominations
This project is a React application for a simple movie nomination web page. Originally for a job application, however it will still be worked on for more practice on React concepts. \
Currently, this site is deployed with Netlify. Visit https://ayusha-shoppies.netlify.app to view.

## Installation
Cloning this repository to your laptop gives you the option to work with the code and to run in locally in the development mode. \
To do so, simply run `git clone https://github.com/ayushaupreti/the-shoppies.git` wherever you would like to save it. \
To run locally, in the project directory, run `npm start` will begin the app. \
Open http://localhost:3000 to view it in the browser. \
The page will reload if you make edits. 

## Features/Functionality
This site uses the OMDB Free API to search the OMDB movie database for movies and displays the results. \
Basic functionalities are as follows:
  - you can search a movie and the results will appear in a list, with the name of the movie and the year, along with a button to nominate
  - nominating a movie will add it to your nomination list on the side of the screen (web) or at the bottom of the page (mobile)
  - once a movie has been nominated, its nomination button will be disabled
  - you can also remove a nomination, by clicking the 'x' next to the movie name in your nomination list
  - once a movie nomination has been removed, its nominate button will be enabled again
  - your nomination list is also preserved; refreshing the webpage/closing the tab and opening it again will still display the same nomination list you had previously
  - once you nominate 5 movies, a little congratulatory banner will appear
  - as you type in the search bar, the results will reload 
  
## Tech Details
### Redux
Since there was a lot of need for inter-component state referencing in this project (for example, clicking a button in the search results can alter the nomination list), I decided react-redux was the best route to take to have the cleanest possible file structure. 
### Debounce
In order to have the results reload as you type in the search bar, I needed a way to minimize the amount of API calls made. I found a simple version of a debounce function, which controls the API calls. It only makes the call with a 200 millisecond delay from the last typing motion, and this is reset if the user types again within those 200 milliseconds. Provided you type quick enough, it will only make one API call at the end of your search, and not one per character. 
### Local Storage
To maintain the nomination list state after refreshing/re-visiting site, I used `localStorage.setItem()` to store the nomination list. To ensure no changes were lost, I set the nomination list state after each new nomination. Upon each app load, I used `localStore.getItem()` to retrieve the nomination list.

## Future Additions
Some ideas on future additions to this project:
  - Integrate proper debounce (either lodash.debounce or throttle-debounce from npm, or any others which work better)
  - Several nomination lists (you can categorize your lists by movie genre, or any other category of your choosing)
  - Links to share your list with others
