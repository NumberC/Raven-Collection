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

    static async getProductAverageRating(id){
        var query = await pool.query(`SELECT avg_rating FROM inventory WHERE id=${id}`);
        return query.rows[0].avg_rating;
    }

    static async getProductTotalRatings(id){
        var query = await pool.query(`SELECT total_ratings FROM inventory WHERE id=${id}`);
        return query.rows[0].total_ratings;
    }

    static async rateProduct(id, new_rating){
        if (new_rating > 5 || new_rating < 0) return;

        avg_rating = await this.getProductRating(id);
        total_ratings = await this.getProductTotalRatings(id);
        
        avg_rating = (avg_rating*total_ratings + new_rating) / (total_ratings+1);
        total_ratings++;

        await pool.query(`UPDATE inventory SET total_ratings=${total_ratings}, avg_rating=${avg_rating} WHERE id=${id}`);
    }
}

module.exports = Database;