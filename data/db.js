import Database from "better-sqlite3";
import fs from "fs";

const db = new Database(process.env.DB_PATH);

db.exec(`
  DELETE FROM order_items;
  DELETE FROM orders;
  DELETE FROM users;
  DELETE FROM menu;
  
  CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  user_date TEXT
  );

  CREATE TABLE IF NOT EXISTS menu (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  desc TEXT,
  price REAL NOT NULL
  );

  CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  total_price REAL NOT NULL,
  ETA REAL NOT NULL,
  order_date TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE, 
  FOREIGN KEY (product_id) REFERENCES menu(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS discounts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  amount REAL NOT NULL
  );

  CREATE TABLE IF NOT EXISTS discounts_items (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  discount_id TEXT NOT NULL,
  amount REAL NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (discount_id) REFERENCES discounts(id) ON DELETE CASCADE
  );
  `);

//------ Menu data ------

//load initial data and deconstruct menu array from menu.json
const { menu } = JSON.parse(fs.readFileSync("./data/menu.json", "utf-8"));

//prapare statement
const insertMenu = db.prepare(`
    INSERT INTO menu (id, title, desc, price) VALUES (?, ?, ?, ?)
  `);

//check if menu is empty or not
const menuCheck = db.prepare("SELECT COUNT(*) AS count FROM menu").get();

//if menu is empty, insert data
//transaction makes it faster and safer than inserting one by one
if (menuCheck.count === 0) {
  const insertAllMenu = db.transaction((items) => {
    items.forEach((item) =>
      insertMenu.run(item.id, item.title, item.desc, item.price),
    );
  });
  insertAllMenu(menu);
}

//------ User data ---------

const { users } = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));

const insertUsers = db.prepare(`
    INSERT INTO users (id, username, email, user_date) VALUES (?, ?, ?, ?)
  `);

const userCheck = db.prepare("SELECT COUNT(*) AS count FROM users").get();

if (userCheck.count === 0) {
  const insertAllUsers = db.transaction((items) => {
    items.forEach((item) =>
      insertUsers.run(item.id, item.username, item.email, item.user_date),
    );
  });
  insertAllUsers(users);
}

//------ Order data ----------

const { orders } = JSON.parse(fs.readFileSync("./data/orders.json", "utf-8"));

const insertOrders = db.prepare(`
    INSERT INTO orders (id, user_id, total_price, ETA, order_date) VALUES (?, ?, ?, ?, ?)
  `);

const orderCheck = db.prepare("SELECT COUNT(*) AS count FROM orders").get();

if (orderCheck.count === 0) {
  const insertAllOrders = db.transaction((items) => {
    items.forEach((item) =>
      insertOrders.run(
        item.id,
        item.user_id,
        item.total_price,
        item.ETA,
        item.order_date,
      ),
    );
  });
  insertAllOrders(orders);
}

//------ Order items data ---------

const { order_items } = JSON.parse(
  fs.readFileSync("./data/order_items.json", "utf-8"),
);

const insertOrderItems = db.prepare(`
    INSERT INTO order_items (id, order_id, product_id, quantity) VALUES (?, ?, ?, ?)
  `);

const orderItemsCheck = db
  .prepare("SELECT COUNT(*) AS count FROM order_items")
  .get();

if (orderItemsCheck.count === 0) {
  const insertAllOrderItems = db.transaction((items) => {
    items.forEach((item) =>
      insertOrderItems.run(
        item.id,
        item.order_id,
        item.product_id,
        item.quantity,
      ),
    );
  });
  insertAllOrderItems(order_items);
}

export default db;
