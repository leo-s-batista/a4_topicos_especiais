import mysql from 'mysql2/promise'

export default async function connect() {
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const connection = await mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "a4_topicos_especiais",
        port: 3306
    });

    global.connection = connection;

    return connection;
}