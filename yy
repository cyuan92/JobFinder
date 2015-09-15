2015-09-15T04:43:25.989242+00:00 app[web.1]:     at require (module.js:384:17)
2015-09-15T04:43:25.989243+00:00 app[web.1]:     at Object.<anonymous> (/app/routes/routes.js:7:14)
2015-09-15T04:43:25.989245+00:00 app[web.1]:     at Module._compile (module.js:460:26)
2015-09-15T04:43:25.989246+00:00 app[web.1]:     at Object.Module._extensions..js (module.js:478:10)
2015-09-15T04:43:25.989247+00:00 app[web.1]:     at Module.load (module.js:355:32)
2015-09-15T04:43:25.989249+00:00 app[web.1]:     at Function.Module._load (module.js:310:12)
2015-09-15T04:43:25.989250+00:00 app[web.1]:     at Module.require (module.js:365:17)
2015-09-15T04:43:26.818533+00:00 heroku[web.1]: State changed from starting to crashed
2015-09-15T04:43:26.804550+00:00 heroku[web.1]: Process exited with status 1
2015-09-15T04:43:28.125141+00:00 heroku[router]: at=error code=H10 desc="App crashed" method=GET path="/" host=jobfinder-mockup.herokuapp.com request_id=8e213b09-abcd-426d-93c3-7e75fb8de41c fwd="98.234.178.92" dyno= connect= service= status=503 bytes=
2015-09-15T04:43:28.817385+00:00 heroku[router]: at=error code=H10 desc="App crashed" method=GET path="/favicon.ico" host=jobfinder-mockup.herokuapp.com request_id=8c806a64-0cf4-4e65-b4b3-c79b13ad2e42 fwd="98.234.178.92" dyno= connect= service= status=503 bytes=
2015-09-15T04:44:15.660604+00:00 heroku[router]: at=error code=H10 desc="App crashed" method=GET path="/" host=jobfinder-mockup.herokuapp.com request_id=19ae61a2-e294-4bfa-9604-071e7aa798ac fwd="98.234.178.92" dyno= connect= service= status=503 bytes=
2015-09-15T04:44:16.565198+00:00 heroku[router]: at=error code=H10 desc="App crashed" method=GET path="/favicon.ico" host=jobfinder-mockup.herokuapp.com request_id=35b5b3d4-78b0-4644-b344-8bc3aa136a48 fwd="98.234.178.92" dyno= connect= service= status=503 bytes=
2015-09-15T05:12:34.079072+00:00 heroku[web.1]: State changed from crashed to starting
2015-09-15T05:12:37.293871+00:00 heroku[web.1]: Starting process with command `node index.js`
2015-09-15T05:12:39.977248+00:00 app[web.1]:     at Module.require (module.js:365:17)
2015-09-15T05:12:39.977245+00:00 app[web.1]:     at Function.Module._resolveFilename (module.js:336:15)
2015-09-15T05:12:39.977213+00:00 app[web.1]: module.js:338
2015-09-15T05:12:39.977254+00:00 app[web.1]:     at Object.Module._extensions..js (module.js:478:10)
2015-09-15T05:12:39.977249+00:00 app[web.1]:     at require (module.js:384:17)
2015-09-15T05:12:39.977252+00:00 app[web.1]:     at Module._compile (module.js:460:26)
2015-09-15T05:12:39.977258+00:00 app[web.1]:     at Module.require (module.js:365:17)
2015-09-15T05:12:39.977251+00:00 app[web.1]:     at Object.<anonymous> (/app/routes/routes.js:7:14)
2015-09-15T05:12:39.977239+00:00 app[web.1]:     throw err;
2015-09-15T05:12:39.977243+00:00 app[web.1]: Error: Cannot find module 'bcrypt-nodejs'
2015-09-15T05:12:39.977246+00:00 app[web.1]:     at Function.Module._load (module.js:278:25)
2015-09-15T05:12:39.977255+00:00 app[web.1]:     at Module.load (module.js:355:32)
2015-09-15T05:12:39.977256+00:00 app[web.1]:     at Function.Module._load (module.js:310:12)
2015-09-15T05:12:39.977241+00:00 app[web.1]:           ^
2015-09-15T05:12:40.853805+00:00 heroku[web.1]: State changed from starting to crashed
2015-09-15T05:12:40.840465+00:00 heroku[web.1]: Process exited with status 1
2015-09-15T05:16:59.134854+00:00 heroku[slug-compiler]: Slug compilation started
2015-09-15T05:16:59.134876+00:00 heroku[slug-compiler]: Slug compilation finished
2015-09-15T05:16:58.946375+00:00 heroku[api]: Deploy 13f5889 by connieyuan92@gmail.com
2015-09-15T05:16:58.946512+00:00 heroku[api]: Release v24 created by connieyuan92@gmail.com
2015-09-15T05:16:59.050856+00:00 heroku[web.1]: State changed from crashed to starting
2015-09-15T05:17:02.126107+00:00 heroku[web.1]: Starting process with command `node index.js`
2015-09-15T05:17:03.894315+00:00 app[web.1]: module.js:338
2015-09-15T05:17:03.894338+00:00 app[web.1]:     throw err;
2015-09-15T05:17:03.894341+00:00 app[web.1]: Error: Cannot find module 'bcrypt-nodejs'
2015-09-15T05:17:03.894339+00:00 app[web.1]:           ^
2015-09-15T05:17:03.894342+00:00 app[web.1]:     at Function.Module._resolveFilename (module.js:336:15)
2015-09-15T05:17:03.894343+00:00 app[web.1]:     at Function.Module._load (module.js:278:25)
2015-09-15T05:17:03.894345+00:00 app[web.1]:     at require (module.js:384:17)
2015-09-15T05:17:03.894344+00:00 app[web.1]:     at Module.require (module.js:365:17)
2015-09-15T05:17:03.894346+00:00 app[web.1]:     at Object.<anonymous> (/app/routes/routes.js:7:14)
2015-09-15T05:17:03.894347+00:00 app[web.1]:     at Module._compile (module.js:460:26)
2015-09-15T05:17:03.894349+00:00 app[web.1]:     at Object.Module._extensions..js (module.js:478:10)
2015-09-15T05:17:03.894350+00:00 app[web.1]:     at Module.load (module.js:355:32)
2015-09-15T05:17:03.894351+00:00 app[web.1]:     at Function.Module._load (module.js:310:12)
2015-09-15T05:17:03.894352+00:00 app[web.1]:     at Module.require (module.js:365:17)
2015-09-15T05:17:04.634713+00:00 heroku[web.1]: State changed from starting to crashed
2015-09-15T05:17:04.612181+00:00 heroku[web.1]: Process exited with status 1
2015-09-15T05:17:14.097568+00:00 heroku[router]: at=error code=H10 desc="App crashed" method=GET path="/" host=jobfinder-mockup.herokuapp.com request_id=3365dda5-8c9e-4a1f-89a3-283570d0835c fwd="98.234.178.92" dyno= connect= service= status=503 bytes=
2015-09-15T05:17:15.414234+00:00 heroku[router]: at=error code=H10 desc="App crashed" method=GET path="/favicon.ico" host=jobfinder-mockup.herokuapp.com request_id=fabc1de7-374d-4be1-bfcd-7fff84910107 fwd="98.234.178.92" dyno= connect= service= status=503 bytes=
2015-09-15T05:23:06.663527+00:00 heroku[slug-compiler]: Slug compilation started
2015-09-15T05:23:06.663600+00:00 heroku[slug-compiler]: Slug compilation finished
2015-09-15T05:23:06.593762+00:00 heroku[api]: Deploy 0437b35 by connieyuan92@gmail.com
2015-09-15T05:23:06.594034+00:00 heroku[api]: Release v25 created by connieyuan92@gmail.com
2015-09-15T05:23:06.692475+00:00 heroku[web.1]: State changed from crashed to starting
2015-09-15T05:23:09.731475+00:00 heroku[web.1]: Starting process with command `node index.js`
2015-09-15T05:23:12.056432+00:00 app[web.1]: Tue, 15 Sep 2015 05:23:12 GMT body-parser deprecated bodyParser: use individual json/urlencoded middlewares at index.js:13:9
2015-09-15T05:23:12.140906+00:00 app[web.1]: Tue, 15 Sep 2015 05:23:12 GMT express-session deprecated undefined resave option; provide resave option at index.js:14:9
2015-09-15T05:23:12.144097+00:00 app[web.1]: Warning: connect.session() MemoryStore is not
2015-09-15T05:23:12.144100+00:00 app[web.1]: designed for a production environment, as it will leak
2015-09-15T05:23:12.144101+00:00 app[web.1]: memory, and will not scale past a single process.
2015-09-15T05:23:12.155717+00:00 app[web.1]: Node app is running at localhost:53148
2015-09-15T05:23:12.130751+00:00 app[web.1]: Tue, 15 Sep 2015 05:23:12 GMT body-parser deprecated undefined extended: provide extended option at node_modules/body-parser/index.js:105:29
2015-09-15T05:23:12.141310+00:00 app[web.1]: Tue, 15 Sep 2015 05:23:12 GMT express-session deprecated undefined saveUninitialized option; provide saveUninitialized option at index.js:14:9
2015-09-15T05:23:12.696835+00:00 heroku[web.1]: State changed from starting to up
2015-09-15T05:23:29.067377+00:00 heroku[router]: at=info method=GET path="/" host=jobfinder-mockup.herokuapp.com request_id=cbaefc2d-cdee-4d7c-b6d0-fadc47e8ff15 fwd="98.234.178.92" dyno=web.1 connect=1ms service=46ms status=200 bytes=1717
2015-09-15T05:23:29.271105+00:00 heroku[router]: at=info method=GET path="/css/style.css" host=jobfinder-mockup.herokuapp.com request_id=aa1db24d-842e-4b3e-8d76-be448cd85208 fwd="98.234.178.92" dyno=web.1 connect=1ms service=12ms status=200 bytes=2809
2015-09-15T05:23:29.262042+00:00 heroku[router]: at=info method=GET path="/css/bootstrap.min.css" host=jobfinder-mockup.herokuapp.com request_id=d042bd6d-1f9d-4cd2-9484-ce8f05b992a6 fwd="98.234.178.92" dyno=web.1 connect=1ms service=19ms status=200 bytes=103179
2015-09-15T05:23:29.267968+00:00 heroku[router]: at=info method=GET path="/css/bootstrap-theme.min.css" host=jobfinder-mockup.herokuapp.com request_id=19e5044a-c9f2-4ac8-97ba-181a393ad293 fwd="98.234.178.92" dyno=web.1 connect=1ms service=17ms status=200 bytes=17996
2015-09-15T05:23:29.949672+00:00 heroku[router]: at=info method=GET path="/favicon.ico" host=jobfinder-mockup.herokuapp.com request_id=7ed80cb7-51a9-46b1-ad52-e97c82f0ed6b fwd="98.234.178.92" dyno=web.1 connect=1ms service=11ms status=404 bytes=222
2015-09-15T05:23:33.632348+00:00 heroku[router]: at=info method=GET path="/signup" host=jobfinder-mockup.herokuapp.com request_id=d05ecb65-bf8c-4cc4-94ec-aa8fed73a538 fwd="98.234.178.92" dyno=web.1 connect=1ms service=7ms status=200 bytes=1403
2015-09-15T05:23:46.992653+00:00 app[web.1]: events.js:85
2015-09-15T05:23:46.992658+00:00 app[web.1]:       throw er; // Unhandled 'error' event
2015-09-15T05:23:46.992661+00:00 app[web.1]: error: relation "users" does not exist
2015-09-15T05:23:46.992660+00:00 app[web.1]:             ^
2015-09-15T05:23:46.992663+00:00 app[web.1]:     at Connection.parseE (/app/node_modules/pg/lib/connection.js:539:11)
2015-09-15T05:23:46.992666+00:00 app[web.1]:     at Socket.<anonymous> (/app/node_modules/pg/lib/connection.js:105:22)
2015-09-15T05:23:46.992664+00:00 app[web.1]:     at Connection.parseMessage (/app/node_modules/pg/lib/connection.js:366:17)
2015-09-15T05:23:46.992667+00:00 app[web.1]:     at Socket.emit (events.js:107:17)
2015-09-15T05:23:46.992669+00:00 app[web.1]:     at readableAddChunk (_stream_readable.js:163:16)
2015-09-15T05:23:46.992670+00:00 app[web.1]:     at Socket.Readable.push (_stream_readable.js:126:10)
2015-09-15T05:23:46.992672+00:00 app[web.1]:     at TCP.onread (net.js:538:20)
2015-09-15T05:23:47.009053+00:00 heroku[router]: at=error code=H13 desc="Connection closed without response" method=POST path="/createuser" host=jobfinder-mockup.herokuapp.com request_id=db9f1a3b-b56f-423c-b5e5-260f09a178b1 fwd="98.234.178.92" dyno=web.1 connect=1ms service=338ms status=503 bytes=0
2015-09-15T05:23:47.743672+00:00 heroku[web.1]: State changed from up to crashed
2015-09-15T05:23:47.743672+00:00 heroku[web.1]: State changed from crashed to starting
2015-09-15T05:23:47.727827+00:00 heroku[web.1]: Process exited with status 1
2015-09-15T05:23:50.584924+00:00 heroku[web.1]: Starting process with command `node index.js`
2015-09-15T05:23:52.388214+00:00 app[web.1]: Tue, 15 Sep 2015 05:23:52 GMT body-parser deprecated bodyParser: use individual json/urlencoded middlewares at index.js:13:9
2015-09-15T05:23:52.450578+00:00 app[web.1]: Tue, 15 Sep 2015 05:23:52 GMT express-session deprecated undefined resave option; provide resave option at index.js:14:9
2015-09-15T05:23:52.452705+00:00 app[web.1]: Warning: connect.session() MemoryStore is not
2015-09-15T05:23:52.452707+00:00 app[web.1]: designed for a production environment, as it will leak
2015-09-15T05:23:52.452709+00:00 app[web.1]: memory, and will not scale past a single process.
2015-09-15T05:23:52.462257+00:00 app[web.1]: Node app is running at localhost:14089
2015-09-15T05:23:52.443237+00:00 app[web.1]: Tue, 15 Sep 2015 05:23:52 GMT body-parser deprecated undefined extended: provide extended option at node_modules/body-parser/index.js:105:29
2015-09-15T05:23:52.450778+00:00 app[web.1]: Tue, 15 Sep 2015 05:23:52 GMT express-session deprecated undefined saveUninitialized option; provide saveUninitialized option at index.js:14:9
2015-09-15T05:23:52.800376+00:00 heroku[web.1]: State changed from starting to up
