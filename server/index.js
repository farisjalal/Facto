// server/index.js
//AIzaSyC-roT5H-WWy5UmP88D6DU4nd95_ynVPyE


const express = require("express");
const path =  require("path");
const fetch = require('node-fetch');
const DOMParser = require("dom-parser");

var parser = new DOMParser();

const cheerio = require('cheerio');


const getData = async () => {
	const response = await fetch('https://www.onthisday.com/');
	const body = await response.text();
	return body;
};

const getImageInfo = async (searchTerm) => {
	const response = await fetch('https://www.google.com/search?tbm=isch&q='+searchTerm);
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
  var info = await getData()
  //console.log(info)
  const $ = cheerio.load(info)
  //yearList=[]
  factList=[]

  $('.event').each(async(i, title) => {
   const titleNode = $(title);
   const factText = titleNode.text();
   if(factText.search("divorce")==-1 && factText.search("weds")==-1 && factText.search("marries")==-1){
    const imageUrl=await getImageInfo(factText); 
    //console.log({i,factText,imageUrl}) 
    factList.push({i,factText,imageUrl});    
   }   
  });


  console.log(factList.length)

  for(var i = 0; i < factList.length ; i++){ 
   console.log(factList[i].imageUrl);
   console.log("\n\n")
   }




  
  app.get("/api", (req, res) => {
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











