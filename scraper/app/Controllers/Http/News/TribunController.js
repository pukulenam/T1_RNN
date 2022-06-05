'use strict'
const axios = require("axios");
const cheerio = require("cheerio");

class TribunController {
    // async getIndex({request, response}){
    //     // part 1
    //     let result = axios.get(url).then((res) => {
    //         const html = res.data;
    //         const $ = cheerio.load(html);

    //         let list = $("select#sectionpil > option");
    //         let index = [];

    //         list.each(function (v, i) {
    //             let link = url + "/" + $(this).attr("value");
    //             let title = $(this).text();

    //             index.push({
    //                 title: title,
    //                 link
    //             });
    //         });
    //         return {
    //             message:"success",
    //             result: {
    //             length: index.length,
    //             data: index,
    //             },
    //         };
    //     });
    //     return result;
    // }

    // async getData({request, response}){
    //     // part 2
    //     let query = request.input("url");
    //     let news =[];
    //     let result = axios.get(query).then((res) => {
    //         let html = res.data;
    //         let $ = cheerio.load(html);
    //         let indeks =$("div[class='pt10 pb10'] > ul.lsi > li");
    //         let sources = "https://tribunnews.com";
            
    //         // paging
    //         let prev_page = $("div.paging #pagecurrent").prev();
    //         if(prev_page.text() =="1"){
    //             prev_page = prev_page
    //             .attr("href")
    //             .replace("&page=", "")
    //             .replace("&","&26")
    //         }else{
    //             prev_page = prev_page.attr("href") == null ? "" : prev_page;
    //         }

    //         let next_page = $("div.paging #pagecurrent")
    //             .next()
    //             .attr("href")
    //             .replace("&", "%26");
    //         next_page = next_page == null ? "" : next_page;

    //         let data_detail = [];
    //         indeks.map(function() {
    //             let link = $(this).find("h3 > a").attr("href");
    //             let date = $(this).find("time").text();
    //             let title = $(this).find("h3 > a").text();

    //             let image = axios.get(link).then((res) => {
    //                 let detail_html = res.data;
    //                 let $ = cheerio.load(detail_html);
    //                 return {
    //                     title: title.trim(),
    //                     link: link,
    //                     date: date,
    //                     image: $("meta[property='og:image']").attr("content"),
    //                 };
    //             }).catch(e => e);

    //             data_detail.push(image);
    //         });

    //         return Promise.all(data_detail).then((values) => {
    //             return {
    //                 message: "success",
    //                 result: {
    //                     length: indeks.length,
    //                     sources: sources,
    //                     data: values,
    //                     next_page: next_page,
    //                     prev_page: prev_page,
    //                 },
    //             };
    //         });
    //     })
    //     .catch(e => e);

    //     return result;
    // }

    async getNewsDetail({request, response}){
        let query = request.input("url") + "?page=all";
        let result = axios.get(query).then((res) => {
            let html = res.data;
            let $ = cheerio.load(html);
            let indeks =$("div[class='side-article txt-article multi-fontsize']");

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

module.exports = TribunController
