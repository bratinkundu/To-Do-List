const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = express();

app.use(cors ({ origin: true }));

