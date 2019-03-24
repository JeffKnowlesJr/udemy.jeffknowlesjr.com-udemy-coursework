npm install --save mongodb // normal mongodb client package
explanation of connection in MongoDB Documentation, Node.js section

I'll use mongoose. Mongoose is a third party package which builds up on the official mongodb driver
but it makes accessing mongodb much easier and more convenient. It does something which I told you that mongodb does not really use, mongoose uses schemas, so you can define how your data should look like and that allows you to conveniently store and fetch data. Now obviously this might not be the solution you're looking for if you have the requirement of very unstructured data but often that's not the case and therefore, mongoose is a great tool that could even work with such unstructured data by the way but especially if you have structured data, if you have a certain model you use. So mongoose is that package we'll use and we simply install it by running npm install --save mongoose, like this in your project folder. So now this will download and add this dependency and this tool will then allow us to connect to our mongodb server and also to interact with it, store data and fetch data. For now storing and fetching means storing and fetching posts, so in the next lecture, we'll actually start creating a schema for our post data in our nodejs app

npm install --save mongoose 
