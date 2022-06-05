'use strict'
const axios = require("axios");
const cheerio = require("cheerio");

class HealthPartnersController {
    async getNewsDetail({request, response}){
        let query = request.input("url");
        let result = axios.get(query).then((res) => {
            let html = res.data;
            let $ = cheerio.load(html);
            let indeks =$("article[class='post-14639 post type-post status-publish format-standard hentry category-healthy-living tag-am-i-sedentary tag-how-do-i-become-less-sedentary tag-risks-of-a-sedentary-lifestyle tag-what-are-the-risks-of-a-sedentary-lifestyle tag-what-is-a-sedentary-lifestyle']");

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

module.exports = HealthPartnersController
