# ipl-using postgres project

In this project, we are attempting to solve the problems listed below using Postgressql.


## Data

Data take from Kaggle<a src="https://www.kaggle.com/manasgarg/ipl%22%3E https://www.kaggle.com/manasgarg/ipl</a>


- deliveries.csv
- matches.csv



## Following tables are created into the database:
   
   - matches 
   - deliveries
   - team
   - season
   - city
   - umpire
   - matches and deliveries table is normalized


# Postgressql
Install the Postgressql 

`Sudo -i -u postgres`

## Problems

1. Number of matches played per year for all the years in IPL.
2. Number of matches won per team per year in IPL.
3. Extra runs conceded per team in the year 2016
4. Top 10 economical bowlers in the year 2015



### Directories/Folder

1. data :- contains the .csv files i.e matches.csv and deliveries.csv .
2. queries :- contains solution of given tasks in respactive file names.
3. views: contains view file .jade,layout
4. connection.js :- contains database connectivity configuration.
5. database.js: contains the tables along with the data normalisation.
6. express.js: contains the necessary express
7. logger.js: starting the server and everything.


# Express
Install the Express

`npm install express`

# Nodemon
Install the Nodemon

`npm i -D nodemon`

# Handlebars
Install the Handlebars

`npm install express-handlebars`


#### How to use project

* INSTALL all the requirements.

* Create the database and run connection.js to normalize the database and get the output.

* Use command {node express.js} to start the express server.  


