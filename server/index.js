// server/index.js
//AIzaSyC-roT5H-WWy5UmP88D6DU4nd95_ynVPyE


const express = require("express");
const path =  require("path");
const fetch = require('node-fetch');
const DOMParser = require("dom-parser");

var parser = new DOMParser();

const cheerio = require('cheerio');
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getData = async (date) => {
	const response = await fetch(`https://www.onthisday.com/day/${months[date.getMonth()]}/${date.getDate()}`);
  const $ = cheerio.load(await response.text());
  factList=[]

  $('.event').each(async (i, title) => {
   const titleNode = $(title);
   const factText = titleNode.text();
   if(factText.search("divorce")==-1 && factText.search("weds")==-1 && factText.search("marries")==-1){
    const imageUrl=await getImageInfo(factText);
    factList.push({i,factText,imageUrl});
   }   
  });

  // Currently has issues with waiting for '.each()' 's subfunction
  // To perform factList.push before getting here, hence temporary fix of waiting
  await new Promise(resolve => setTimeout(resolve, 4000));

  // console.log(factList.length)

  
  return factList;
}

const getImageInfo = async (searchTerm) => {
	const response = await fetch(encodeURI('https://www.google.com/search?tbm=isch&q='+searchTerm));
	const body = await response.text(); 
  return(getImageUrl(body))	
};

function getImageUrl(body) {
  return cheerio.load(body)('img')[1].attribs.src;
 }




const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.static(path.resolve(__dirname, '../client/build')));

(async () => {
  




  
  app.get("/api", async (req, res) => {
    factList = await getData(new Date(req.query.date));
    res.json({ message: "hi", info: factList });
  });
    
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });


  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
})();

//var info=getData().toString();

 

//console.log(info);
//var parsedInfo = parser.parseFromString(info);

//console.log(parsedInfo)











