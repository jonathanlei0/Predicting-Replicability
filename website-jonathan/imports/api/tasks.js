MyCollection = new Mongo.Collection('myCollection');

var myData = {
   key1: "[abstract]0.txt",
   key2: "[abstract]1.txt",
   key3: "[abstract]2.txt",
   key4: "[abstract]3.txt",
   key5: "[abstract]4.txt"
}

MyCollection.insert(myData);

var findCollection = MyCollection.find().fetch();
console.log(findCollection);