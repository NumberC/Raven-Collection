const {Client, Pool} = require("pg");
const pool = new Pool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB,
    port: process.env.DB_PORT,
    max: 20,
    idleTimeoutMillis: 0, //30000
    connectionTimeoutMillis: 0 //2000
});

class Database{
    static async getProduct(id){
        var funko = await pool.query(`SELECT * FROM inventory WHERE id=${id} LIMIT 1`);
        return funko.rows[0];
    }

    // Don't really need the quantity
    static async getAllProducts(){
        var query = await pool.query("SELECT * FROM inventory");
        return query.rows;
    }

    static async getProductPrice(id){
        var query = await pool.query(`SELECT price FROM inventory WHERE id=${id}`);
        return query.rows[0].price;
    }

    static async purchaseProduct(id){
        await pool.query(`UPDATE inventory SET quantity = quantity - 1 WHERE id=${id} AND quantity >= 1`);
    }

    static async addProduct(name, price, qty){
        await pool.query(`INSERT INTO inventory(name, price, quantity) VALUES ('${name}', ${price}, ${qty});`)
    }

    static async updateProduct(id, name, price, qty){
        await pool.query(`UPDATE inventory SET name='${name}', price=${price}, quantity=${qty} WHERE id=${id}`);
    }
}

module.exports = Database;