import pandas as pd
from pymongo import MongoClient

# connect to DB:meteor and fetch the handle of collection:wageringPM
client = MongoClient("mongodb://127.0.0.1:3001/meteor")
db = client.meteor
collection = db.historicalWorkers
collection.drop()
# read historical workers from csv file
workerList = pd.read_csv('./HistoricalWorkers1229.csv')
for i in range(len(workerList)):
  print(workerList.iloc[i, 0])
  collection.insert_one({'workerId': workerList.iloc[i, 0]})

print(i)
