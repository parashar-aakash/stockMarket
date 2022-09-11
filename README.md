# stockMarket

## Application Setup

1. Clone the Application using the given URL "https://github.com/parashar-aakash/stockMarket.git"
2. Run command "npm i"
3. Make a file named .env in the main folder and paste the given value in it
    
    PORT= 9000
   
   MONGO_URL= mongodb://localhost:27017/stocks
   
4. Run command "npm start"

***

## Data Mocking
Its done using Cron scheduling. A cron is scheduled to generate random price for fixed 100 stocks between a fixed range.
In the first push, the price is assigned to a field called openPrice and it remains fixed for the entire processing after this
along with dynamically provided name and an originalId which is same as the _id of mongodb, in the next push the price would 
be assigned to a variable called currentPrice and using these two fields, "high" and "low" are
extraced.

***

## Get all price data for single stock

#### Api Url:

##### localhost:9000/api/stock/details/631e0678303b691e286c611e

###### Pass a valid originalId in params

#### Response:

{
  "status": 200,
  "message": "Stock Details Fetched successfully",
  "openPrice": 0.6001900624736236,
  "currentPrice": 0.6609097195236107,
  "low": 0.016905091314031617,
  "high": 0.9551289480277405
}

***

## Get the following data for any list of stocks (current price, closing price, open price, high, low)

#### Api Url:
##### localhost:9000/api/stock/stockList

######  Pass the list/array of originalIds of the stocks in request body whose data is needed as shown below.
[
  "631e0678303b691e286c611e",
  "631e0678303b691e286c6125",
  "631e0678303b691e286c6130"
]

#### Response
{
  "status": 200,
  "message": "Data retrieved successfully",
  "data": [
    {
      "openPrice": 0.6001900624736236,
      "low": 0.016905091314031617,
      "high": 0.9551289480277405,
      "name": "Stock12",
      "originalId": "631e0678303b691e286c611e",
      "currentPrice": 0.6609097195236107
    },
    {
      "openPrice": 0.13597589571946211,
      "low": 0.02037367618191288,
      "high": 0.9886131688851172,
      "name": "Stock19",
      "originalId": "631e0678303b691e286c6125",
      "currentPrice": 0.7150920446515114
    },
    {
      "openPrice": 0.28830254031424474,
      "low": 0.049855774912424655,
      "high": 0.9721385154247988,
      "name": "Stock30",
      "originalId": "631e0678303b691e286c6130",
      "currentPrice": 0.216161475035215
    }
  ]
}

***

## Get current price for any stock

#### Api Url:
##### localhost:9000/api/stock/currentPrice?id=631e0678303b691e286c6171

###### Pass a valid originalId in the params

#### Response:  
{
  "status": 200,
  "message": "CurrentPrice Fetched successfully",
  "currentPrice": 0.4261992923203426,
  "percentageDifference": -0.005675006946593526,
  "Result": "Low"
}

***

## Top (n) gainers and losers stocks for the day

#### Api Url: 
#####  localhost:9000/api/stock/gainerLosser?number=4

###### Pass the number of records to be fetched in query

#### Response
{
  "status": 200,
  "message": "Successfully fetched top N Gains and Losses",
  "Gains": [
    {
      "name": "Stock17",
      "percentageDifference": 0.00864034132011214
    },
    {
      "name": "Stock56",
      "percentageDifference": 0.008209977404126196
    },
    {
      "name": "Stock75",
      "percentageDifference": 0.0077574572798338945
    },
    {
      "name": "Stock85",
      "percentageDifference": 0.007642499510014356
    }
  ],
  "Losses": [
    {
      "name": "Stock21",
      "percentageDifference": -0.008107140024685917
    },
    {
      "name": "Stock95",
      "percentageDifference": -0.007643596682750078
    },
    {
      "name": "Stock23",
      "percentageDifference": -0.0067694144160897205
    },
    {
      "name": "Stock22",
      "percentageDifference": -0.006751197752073819
    }
  ]
}
