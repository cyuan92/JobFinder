2015-09-15T03:53:37.203957+00:00 heroku[api]: Attach PGSTUDIO resource by connieyuan92@gmail.com
2015-09-15T03:53:37.204077+00:00 heroku[api]: Release v22 created by connieyuan92@gmail.com
2015-09-15T04:43:05.616047+00:00 heroku[slug-compiler]: Slug compilation started
2015-09-15T04:43:05.616069+00:00 heroku[slug-compiler]: Slug compilation finished
2015-09-15T04:43:05.552778+00:00 heroku[api]: Deploy 1a16d51 by connieyuan92@gmail.com
2015-09-15T04:43:05.552951+00:00 heroku[api]: Release v23 created by connieyuan92@gmail.com
2015-09-15T04:43:14.064671+00:00 heroku[web.1]: Unidling
2015-09-15T04:43:14.065061+00:00 heroku[web.1]: State changed from down to starting
2015-09-15T04:43:17.129344+00:00 heroku[web.1]: Starting process with command `node index.js`
2015-09-15T04:43:19.920200+00:00 app[web.1]: module.js:338
2015-09-15T04:43:19.920218+00:00 app[web.1]:     throw err;
2015-09-15T04:43:19.920219+00:00 app[web.1]:           ^
2015-09-15T04:43:19.920221+00:00 app[web.1]: Error: Cannot find module 'bcrypt-nodejs'
2015-09-15T04:43:19.920222+00:00 app[web.1]:     at Function.Module._resolveFilename (module.js:336:15)
2015-09-15T04:43:19.920223+00:00 app[web.1]:     at Function.Module._load (module.js:278:25)
2015-09-15T04:43:19.920224+00:00 app[web.1]:     at Module.require (module.js:365:17)
2015-09-15T04:43:19.920225+00:00 app[web.1]:     at require (module.js:384:17)
2015-09-15T04:43:19.920226+00:00 app[web.1]:     at Object.<anonymous> (/app/routes/routes.js:7:14)
2015-09-15T04:43:19.920227+00:00 app[web.1]:     at Module._compile (module.js:460:26)
2015-09-15T04:43:19.920228+00:00 app[web.1]:     at Object.Module._extensions..js (module.js:478:10)
2015-09-15T04:43:19.920229+00:00 app[web.1]:     at Module.load (module.js:355:32)
2015-09-15T04:43:19.920230+00:00 app[web.1]:     at Function.Module._load (module.js:310:12)
2015-09-15T04:43:19.920232+00:00 app[web.1]:     at Module.require (module.js:365:17)
2015-09-15T04:43:20.954398+00:00 heroku[web.1]: Process exited with status 1
2015-09-15T04:43:20.961403+00:00 heroku[web.1]: State changed from starting to crashed
2015-09-15T04:43:20.962511+00:00 heroku[web.1]: State changed from crashed to starting
2015-09-15T04:43:23.869726+00:00 heroku[web.1]: Starting process with command `node index.js`
2015-09-15T04:43:25.989211+00:00 app[web.1]: module.js:338
2015-09-15T04:43:25.989233+00:00 app[web.1]:     throw err;
2015-09-15T04:43:25.989235+00:00 app[web.1]:           ^
2015-09-15T04:43:25.989237+00:00 app[web.1]: Error: Cannot find module 'bcrypt-nodejs'
2015-09-15T04:43:25.989238+00:00 app[web.1]:     at Function.Module._resolveFilename (module.js:336:15)
2015-09-15T04:43:25.989241+00:00 app[web.1]:     at Module.require (module.js:365:17)
2015-09-15T04:43:25.989239+00:00 app[web.1]:     at Function.Module._load (module.js:278:25)
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
