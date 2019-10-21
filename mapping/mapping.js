const express = require('express');
const app = express();
const router = express.Router();

const path = __dirname + "/views/";
const port = 8080;

router.use(function (req,res,next) {
//	  console.log('/' + req.method);
	  next();
});


router.get('/', (req, res) => {
//	console.log(req.query.url)
	var stufftosend='';
	var title;
	if(req.query.title){
		title=req.query.title;	
	}
	else{
		title="Wardley Map";
	}
	if(req.query.url){
	stufftosend='<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="styles.css"></head><body>  <h2>'+title+'</h2>   <div id="wardley-map">  </div>  <script type="text/javascript" src="'.concat(req.query.url,'"></script>  <script type="text/javascript" src="/renderSwardley.js"></script></body></html>');
	}
	else
	{
	stufftosend="<html><head><link rel='stylesheet' type='text/css' href='styles.css'></head><body><h2>Enter URL For JSON Wardley Map</h2><form action='/' method='get' name='url'>URL:<input type='text' name='url'>Map Height:<input type='text' name='height'>Map Width:<input type='text' name='width'><input type='submit' value='submit'<</body></html>";
	}
	res.send(stufftosend)

})

app.use(express.static(path));
app.use('/', router);

app.listen(port, function () {
	  console.log('mapping listening on 8080!')
})

