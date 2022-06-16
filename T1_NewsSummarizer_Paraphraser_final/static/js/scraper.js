function submitData() {
    document.getElementById('scraper-result').style.display='block';
    var hasil = document.getElementById("query").value;
    var domain = (new URL(hasil).hostname);
    var website = domain.hostname;
    var endpoint;
    switch (domain) {
        case website = "www.cnbc.com":
            endpoint = "newscnbc?url="
            break;
        case website = "www.cnnindonesia.com":
            endpoint = "newscnn?url="
            break;
        case website = "www.moneytalksnews.com":
            endpoint = "newsmoneytalks?url="
            break;
        case website = "www1.cbn.com":
            endpoint = "newscbn?url="
            break;
        case website = "www.webmd.com":
            endpoint = "newswebmd?url="
            break;
        case website = "www.bbc.co.uk":
            endpoint = "newsbbc?url="
            break;
        case website = "www.gizchina.com":
            endpoint = "newsgizchina?url="
            break;
        case website = "www.ngpf.org":
            endpoint = "newsngpf?url="
            break;
        case website = "thecollegeinvestor.com":
            endpoint = "newstci?url="
            break;
        case website = "www.getrichslowly.org":
            endpoint = "newsgrs?url="
            break;
        case website = "millennialmoney.com":
            endpoint = "newsmm?url="
            break;
        case website = "blogs.nvidia.com":
            endpoint = "newsnvidia?url="
            break;
        case website = "www.technologyreview.com":
            endpoint = "newsmit?url="
            break;
        case website = "www.gsmarena.com":
            endpoint = "newsgsm?url="
            break;
        case website = "www.nintendolife.com":
            endpoint = "newsnintendo?url="
            break;
        case website = "www.thespike.gg":
            endpoint = "newsthespike?url="
            break;
        case website = "news.xbox.com":
            endpoint = "newsxbox?url="
            break;
        case website = "ukhsa.blog.gov.uk":
            endpoint = "newsukhsa?url="
            break;
        case website = "blog.playstation.com":
            endpoint = "newsps?url="
            break;
        case website = "www.credihealth.com":
            endpoint = "newscredi?url="
            break;
        case website = "www.healthpartners.com":
            endpoint = "newshealthpartners?url="
            break;
        case website = "time.com":
            endpoint = "newstime?url="
            break;
        case website = "blog.healthians.com":
            endpoint = "newshealthians?url="
            break;
        case website = "time.com":
            endpoint = "newstime?url="
            break;
    
        default:
            break;
    }
    
    let textnya =  fetch("https://puknamscraper.herokuapp.com/v1/scraper/" + endpoint + hasil)
                
    .then((data)=>{
        console.log(domain);
        if(data.ok){
            return data.json()
        }else{
            return Promise.reject("ada yang tidak sesuai")
        }
    })
    .then((json)=>document.getElementById("scraped").innerHTML=JSON.stringify(json))
    .catch((error)=>console.log('error '+error))
    // alert(hasil);

}