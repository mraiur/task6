const Enums = require('../enum/OrderStatus');
const _ = require('lodash');

//TODO make category linking to be based on primary id instead of category name
let categoriesByName = {};
let productsById = {};
let ordersById = {};
let productIdCounter = 0;
let orderIdCounter = 0;

let getProductId = function(){
	productIdCounter++;
	return productIdCounter;
};

let getOrderId = function(){
	orderIdCounter++;
	return orderIdCounter;
};

//TODO Convert to Typescript and create a interface for category, product, order and user. To ensure data consistency.
let users = [
	{
		id: 1,
		username: 'test',
		//TODO dont store as plain text EVER
		password: 'test'
	}
];

let categories = {
	1 : {
		id: 1,
		name: 'Fruit'
	},
	2 : {
		id: 2,
		name: 'Diary'
	}
};

for (let [id, row] of Object.entries(categories))
{
	categoriesByName[row.name] = row;
}


let products = [
	{
		"id": getProductId(),
		"name": "Apple",
		"category": categoriesByName.Fruit.name,
		"price": "1"
	},
	{
		"id": getProductId(),
		"name": "Milk",
		"category": categoriesByName.Diary.name,
		"price": "2.50"
	}
];
products.forEach( (product) => {
	productsById[product.id] = product;
});

let orders = [
	{
		"id": getOrderId(),
		"date": "2018-05-29",
		"products": [1, 2],
		"status": "Delivered"
	},
	{
		"id": getOrderId(),
		"date": "2018-05-30",
		"products": [1],
		"status": "Pending"
	}
];

orders.forEach( (order) => {
	ordersById[order.id] = order;
});




class Database{
	connect(){
		//TODO create DB connection
		console.log("Fake DB connection");
	}


	getCategories(){
		return categories;
	}

	getCategoryById( id )
	{
		if( this.hasCategory(id))
		{
			return categories[id];
		}
		return null;
	}

	getAllProducts(){
		return products;
	}

	createProduct(data){
		data.id = getProductId();
		let len = products.push(data);
		return products[len-1];
	}

	updateProduct(id, data){
		productsById[id] = _.merge(productsById[id], data);
		return true;
	}

	deleteProduct(id){
		if( this.hasProduct(id))
		{
			//delete productsById[id];
			// Get index in array of products
			let index = null;
			products.forEach( (product, i) => {
				if( product.id === id )
				{
					console.log(index,"-",i );
					index = i;
				}
			});

			if(index !== null)
			{
				products.splice(index, 1);
				return true;
			}
		}
		return false;
	}

	hasCategory(id)
	{
		return categories.hasOwnProperty(id);
	}

	hasProduct(id)
	{
		return productsById.hasOwnProperty(id);
	}

	hasOrder(id){
		return ordersById.hasOwnProperty(id);
	}

	getProduct(id){
		if( this.hasProduct(id))
		{
			return productsById[id];
		}
		return null;
	}

	getProductsByCategory(categoryId){
		let category = this.getCategoryById(categoryId);
		return products.filter( item => item.category === category.name);
	}


	getAllOrders(){
		return orders;
	}

	getOrder(id){
		if( this.hasOrder(id) )
		{
			return ordersById[id];
		}
		return null;
	}

	createOrder(data){
		data.id = getOrderId();
		// Could use moment if required
		let today = new Date();
		data.date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

		let len = orders.push(data);
		return orders[len-1];
	}

	updateOrderStatus(id, status){
		ordersById[id].status = status;
		return true;
	}

	getUserByCredentials(username, password){
		let user = null;
		users.forEach( (item) => {
			if( item.username === username && item.password === password)
			{
				user = item;
			}
		});
		return user;
	}

	disconnect(){
		//TODO cleanup DB connections
	}
}

let DBConnection = new Database();
DBConnection.connect();

module.exports = DBConnection;