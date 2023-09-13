const express = require('express');
const cluster = require('cluster');
const cors = require('cors')
const numCPUCores = require('os').cpus().length;

//https://codedeepdives.com/blog/nodejs-cluster-vs-worker
console.log("No of CPU cores -- ",numCPUCores,cluster.isMaster)

const app = express();
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors());


