const express = require("express");
const path = require("path");
const app = express();
const { Sequelize } = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        port: 3306,
        dialect: 'mysql',
        timezone: "+09:00",
        define: {
            charset:"utf8",
            collate:"utf8_general_ci",
            timestamps: true,
            freezeTableName: true
        }

    }
)
 
app.set("port", process.env.PORT || 3000);

app.use('/js', express.static(path.join(__dirname, 'dist/js'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

app.use('/style', express.static(path.join(__dirname, 'dist/style'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
})

app.listen(app.get("port"), async () => {
    try {
        await sequelize.authenticate();
        console.log("DB 연결 성공");
        console.log(`Server running on port ${app.get("port")}`);
    } catch (err) {
        console.log("DB 연결 실패", err);
    }

});
