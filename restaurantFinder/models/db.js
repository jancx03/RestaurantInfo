import mysql from 'mysql';
import dotenv from 'dotenv';

const { createPool } = mysql;
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

class Db {
  constructor() {
    this.connection_details = {
      host: process.env.host,
      user: process.env.user,
      password: process.env.secret,
      database: process.env.database,
      connectionLimit: 5,
    };

    this.pool = this.createConnPool();
  }

  createConnPool() {
    return createPool({
      ...this.connection_details,
    });
  }

  connect(callback) {
    return this.pool.getConnection((err, conn) => callback(err, conn));
  }

  query(string) {
    return new Promise((resolve, reject) => {
      this.connect((err, conn) => {
        if (err) {
          conn.release();
          return reject(err);
        }

        conn.query(string, (_err, data) => {
          if (_err) {
            conn.release();
            return reject(_err);
          }

          conn.release();
          return resolve(data);
        });

        return 0;
      });

      return 0;
    });
  }
}

export default new Db();
