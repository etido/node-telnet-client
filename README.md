# nodejs telnet client

## A nodejs http server running simple telnet client

* Nodejs = 0.10.12
* Express.js = 3.2.6
* Git for deploy


1. Run the server:
<pre>
 node server.js
</pre>

2. Invoke telnet client:
<pre>
 http://NodeServerIp/telnet?ip=www.google.com&port=80
</pre>

3. Check the result:
<pre>
 {"Error": "connect ETIMEDOUT","HasError": true,"Listening": false,"ElapsedTime": "21006.4 ms"}
 or
 {"Error": null,"HasError": false,"Listening": true,"ElapsedTime": "103.5 ms"}
</pre>

## Try the demo site:
<pre>
<a href="http://node-telnet-client.eu01.aws.af.cm/telnet?ip=www.google.com&port=80" title="Mouseover Description">Demo: a telnet to google server</a>
</pre>