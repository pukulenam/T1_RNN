'use strict'
const axios = require("axios");
const cheerio = require("cheerio");

class HealthiansController {
    async getNewsDetail({request, response}){
        let query = request.input("url");
        let result = axios.get(query).then((res) => {
            let html = res.data;
            let $ = cheerio.load(html);
            let indeks =$("article[class='vl-article-content post-9891 post type-post status-publish format-standard has-post-thumbnail hentry category-lifestyle-and-wellness category-preventive-health tag-good-health tag-signs-of-good-health tag-tips-for-good-health']");

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

module.exports = HealthiansController
