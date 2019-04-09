//连接Mongodb数据库
const {
	MongoClient
} = require('mongodb');
// connect url
const url = 'mongodb://localhost:27017';
// database name
const dbName = 'ZPOnode';
let connect = () => {
	return new Promise((resolve, reject) => {
		// Use connect method to connect to the server
		MongoClient.connect(url, function(err, client) {
			if(err) throw err;
			// select db
			const db = client.db(dbName);
			resolve({
				db,
				client
			});
		})
	})

}

//查询数据
// 封装好的查询mongodb模块
let find = (col, obj) => {
	return new Promise(async(resolve, reject) => {
		const {
			db,
			client
		} = await connect();
		const collection = db.collection(col);
		collection.find({...obj
			})
			.toArray((err, docs) => {
				if(err) throw err;
//				console.log(docs);
				resolve(docs);
				client.close();
			})
	})
}
// 封装好的插入mongodb模块
let insert = (col, arr) => {
  return new Promise(async (resolve, reject) => {
    let {
      db,
      client
    } = await connect();
    const collection = db.collection(col);
    collection.insertMany(arr, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result);
        client.close();
      }
    })
  })
}

// 封装好的删除mongodb模块
let remove = (col, obj) => {
	return new Promise(async(resolve, reject) => {
		const {
			db,
			client
		} = await connect();
		const collection = db.collection(col);
		collection.remove({...obj
			})
			.toArray((err, docs) => {
				if(err) throw err;
//				console.log(docs);
				resolve(docs);
				client.close();
			})
	})
}

module.exports = {
  connect,
  find,
  insert,
  remove
}