var express     =    require('express'),
    bodyParser  =    require('body-parser'),
    mongoose    =    require('mongoose'),
    morgan      =    require('morgan');





    // *** Create Application Object ***
    var app = express();

    // *** Connect to Database ***
    mongoose.connect('mongodb://localhost/bloggin');

    // *** Server Logging ***
    app.use(morgan('dev'));

    // *** Setting Public Folder ***
    app.use(express.static(__dirname + '/client'));

    // *** Config Body Parsing ***
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    // *** Root Route ***
    app.get('/', function(req, res){
      res.sendFile(__dirname + '/client/views/index.html');
    });
    //***More Routes ***
    app.get('/signup', function(req, res){
      res.sendFile(__dirname + '/client/views/new.html');
    });

    app.get('/about', function(req, res){
      res.sendFile(__dirname + '/client/views/about.html');
    });

    app.get('/login', function(req, res){
      res.sendFile(__dirname + '/client/views/login.html');
    });

    // *** Routing/Controllers ***
    var UsersController = require('./server/controllers/users');
    app.use('/api/users', UsersController);

    var PostsController = require('./server/controllers/posts');
    app.use('/api/posts', PostsController);


    // *** Start Listening... ***
    app.listen(8081, function(){
      console.log("BOOM SHAKALAKA");
    });
