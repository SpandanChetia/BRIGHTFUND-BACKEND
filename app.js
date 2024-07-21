const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { application } = require('express');

const app = express();

app.set('view engine', 'pug');
app.set('view', 'views');