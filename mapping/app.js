const express = require('express');
const app = express();
const router = express.Router();

const path = __dirname + '/views/';
const port = 8080;

router.use(function (req,res,next) {
//	  console.log('/' + req.method);
	  next();
});


router.get('/', (req, res) => {
	console.log(req.query.url)
	var stufftosend='<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="styles.css"></head><body>  <h2>    Scripting a Wardley Map  </h2>   <div id="wardley-map">  </div>  <script type="text/javascript" src="'.concat(req.query.url,'"></script>  <script type="text/javascript" src="/renderSwardley.js"></script></body></html>')
 	res.send(stufftosend)
	//res.send(req.query.url)	
	//res.send('"></script>  <script type="text/javascript" src="/renderSwardley.js"></script></body></html>')

})

//router.get('/', function(req,res){
//	  res.sendFile(path + 'index.html');
//});

app.use(express.static(path));
app.use('/', router);

app.listen(port, function () {
	  console.log('Example app listening on port 8080!')
})

