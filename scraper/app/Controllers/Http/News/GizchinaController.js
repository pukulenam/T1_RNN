'use strict'
const axios = require("axios");
const cheerio = require("cheerio");

class GizchinaController {
    async getNewsDetail({request, response}){
        let query = request.input("url");
        let result = axios.get(query).then((res) => {
            let html = res.data;
            let $ = cheerio.load(html);
            let indeks =$("div[class='vw-post-content clearfix']");

            let data_detail = [];
            indeks.map(function() {
                let content = $(this).find("p").text();
                let news = {content: content};
                data_detail.push(news);
            });

            return Promise.all(data_detail);
        })
        .catch(e => e);

        return result;
    }    
}

module.exports = GizchinaController
