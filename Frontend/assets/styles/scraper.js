/* const axios = require("axios");
const cheerio = require("cheerio");
const { append } = require("domutils");

document.getElementsByTagName("h1")[0].style.fontSize = "6vw";

let urlNews =  document.getElementById("query") // request.input("url"); */
// let hasil = document.getElementById("query");

function submitData() {
    let hasilScraping = document.getElementById("scraped")
    let hasil = document.getElementById("query").value;
    let textnya =  fetch("https://puknamscraper.herokuapp.com/v1/scraper/newswebmd?url=" + hasil)
                .then((data)=>{
                    if(data.ok){
                        return data.json()
                    }else{
                        return Promise.reject("ada yang tidak sesuai")
                    }
                })
                // .then((data)=> {
                //     // document.write(hasilScraping);
                // })
                .then((json)=>console.log(json))
                .catch((error)=>console.log('error '+error))
                    alert(hasil);
                
                // data.foreach(hasilScraping => {
                //     const scraping = textnya


                // })
}

// function scraped() {
//     let hasilScraping = document.getElementsById("scraped")
// hasilScraping.innerHTML = textnya
// }


// const hasilScraping = document.getElementsById("scraped")

// const renderHasil = () => {
//     const header = document.createElement("div")
//     header.classList.add("header")

//     const headerText = document.createElement("h1")
//     headerText.classList.add("header-text")
//     headerText.textContent = "Listings"

//     header.appendChild(headerText)
//     rootElement.appendChild(header)

// }

// renderHeader()



// hasil.innerHTML = {
//     async getNewsDetail({request, response}){
//         let query = request.input("url");
//         let result = axios.get(query).then((res) => {
//             let html = res.data;
//             let $ = cheerio.load(html);
//             let indeks =$("div[class='field-name-body']");

//             let data_detail = [];
//             indeks.map(function() {
//                 let content = $(this).find("p").text();
//                 let news = {content: content};
//                 data_detail.push(news);
//             });

//             return Promise.all(data_detail);
//         })
//         .catch(e => e);
//         return result;
//     }
// }

// yg ini belum jadi
// app.get('/', function(req,res){
//     var api_response = '';
//     var options = {
//         host: 'puknamscraper.herokuapp.com',
//         path: '/v1/scraper/newswebmd'
//         method: 'GET'
//     }

//     callback = function(response){
//         response.on("data", function(chunk){
//             api_response+=chunk;
//         });
//     } 

//     var req = http.request(options, callback);
//     req.end();
//     res.send('call completed successfully');
// })

// app.listen(1338, function(req,res){
//     console.log('server listening at port no 1338');
// });