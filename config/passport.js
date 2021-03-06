var LocalStrategy   = require('passport-local').Strategy;

var User       		= require('../models/regUser');




// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	 passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        firstnameField : 'firstname',
        lastnameField : 'lastname',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
	function(req, email, firstname, lastname, done) {

	   // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

	       // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already signed up.'));
            } else {

				// if there is no user with that email
                // create the user
                var newUser            = new regUser();

                // set the user's local credentials
                newUser.local.email    = email;
                newUser.local.firstname = firstname;//newUser.generateHash(password);
                newUser.local.lastname = lastname;
				// save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });

    }));