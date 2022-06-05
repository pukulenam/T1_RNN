'use strict'
const axios = require("axios");
const cheerio = require("cheerio");

class KumparanController {
    async getNewsDetail({request, response}){
        let query = request.input("url");
        let result = axios.get(query).then((res) => {
            let html = res.data;
            let $ = cheerio.load(html);
            let indeks =$("div[class='StoryRenderer__EditorWrapper-sc-th08cs-0 eZfPtk']");

            let data_detail = [];
            indeks.map(function() {
                let content = $(this).find("span").text();
                let news = {content: content};
                data_detail.push(news);
            });

            return Promise.all(data_detail);
        })
        .catch(e => e);

        return result;
    }    
}

module.exports = KumparanController
