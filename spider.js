const Koa=require('koa');
const http=require('http');
const https = require('https');
const cheerio = require('cheerio');
const app=new Koa();
const spd=()=>{
	return new Promise((resolve,reject)=>{
		let  body='';
		const req = https.request('https://cnodejs.org/?tab=good', (res) => {
		  console.log(`resstatus: ${res.statusCode}`);
		  //console.log(`reshead: ${JSON.stringify(res.headers)}`);
		  res.setEncoding('utf8');
		  res.on('data', (chunk) => {
		  	body+=chunk;
		    // console.log(`resbody: ${chunk}`);
		  });
		  res.on('end', () => {
		    console.log('no message');
		    resolve(body)
		  });
		});

		req.on('error', (e) => {
		  console.error(`errmsg: ${e.message}`);
		  reject(error)
		});
		req.end();
	})
} 
const main=async (ctx,next)=>{
	const $ = cheerio.load(await spd());
	let  links = '';
	$('.cell').find('div').find('a').each(function(i, elem) {
	  links+='<li><a href="https://cnodejs.org'+$(this).attr('href')+'">'+$(this).text()+'</a></li>';
	});
	// ctx.response.type = 'text';
	ctx.response.body=links;
}
app.use(main)
// app.use(spd)
app.listen(3000,()=>{
	console.log('3000 running')
})
