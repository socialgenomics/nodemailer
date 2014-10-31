module.exports = function(app){


	var nodemailer = require("nodemailer");

app.get('/', function(req, res) {
		res.render('view.ejs'); // load the view.ejs file
	});



// =====================================
	// MAIL PAGE ===================
	// =============================
	// show the mail form

	app.get('/view', function(req, res) {
		res.render('view.ejs'); // load the view.ejs file
	});
	// process the email form
	app.post('/view', function(req, res){
	var firstname =req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;



	var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",  // sets automatically host, port and connection security settings
   auth: {
       user: "mensonfrancis@gmail.com",
       pass: ""
   }
});

smtpTransport.sendMail({  //email options
   from: "Repositive <----------->", // sender address.  Must be the same as authenticated user if using Gmail.
   to: ""+firstname+" "+lastname+"<" +email +">", // receiver
   subject: "Beta Sign up for Repositive", // subject
   text: "MWAHAHAHHAAHHAHAAAHAHHAAHA", // body
   html: "<p>hey buddy, well done for signing up! We have a lot of great surprises in store for you<p>"
}, function(error, response){  //callback
   if(error){
       console.log(error);
   }else{
       console.log("Message sent: " + response.message);
   }
   
   smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
});
	
	res.render('done.ejs');
	});} 
