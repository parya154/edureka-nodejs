var express=require("express");
var bp=require("body-parser");
var mongo=require("mongojs");
var db=mongo("mtlist",["emp"]);
var app=express();
	app.use(bp.json());
    app.use(express.static(__dirname));

app.listen(1122);
    app.get("/",function(req,res){
	res.send("asdf");
});

app.get("/employees",function(req,res){
	db.emp.find(function(error,documents){
	console.log(documents);
	res.send(documents);
});
});

app.post("/employees",function(req,res){
	db.emp.insert(req.body,function(error,docs){
		console.log(docs)
		res.json(docs);
	});
});

app.delete("/employees/:id",function(req,res){
	var eid=req.params.id;
	console.log("delete req");
	db.emp.remove({_id:mongo.ObjectId(eid)},function(err,doc){
		res.json(doc);
	});
});

app.put("/employees/:id",function(req,res){
	var eid=req.params.id;
	db.emp.findAndModify({
		query:{_id:mongo.ObjectId(eid)},
		update:{$set:{
			name:req.body.name,
			email:req.body.email,
			dob:req.body.dob,
			dept:req.body.dept,
			gen:req.body.gen,
		
		} },
		new:true},function(error,doc){
			res.send(doc);
		}
		);
});

app.get("/employees/:id",function(req,res){
	console.log("dedit req sent");
	var eid=req.params.id;
	
	db.emp.findOne({_id:mongo.ObjectId(eid)},function(err,doc){
		console.log(doc)
		res.json(doc);
	});
});

console.log("server is running on localhost:1122"); 