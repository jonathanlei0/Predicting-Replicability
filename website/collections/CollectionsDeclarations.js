Papers = new Mongo.Collection('papers');

var PaperLocations = {
   key1: "[abstract]0.txt",
   key2: "[abstract]1.txt",
   key3: "[abstract]2.txt",
   key4: "[abstract]3.txt",
   key5: "[abstract]4.txt"
}

Papers.insert(PaperLocations);

var findCollection = Papers.find().fetch();
console.log(findCollection);