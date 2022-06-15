function submitData() {
    let hasil = document.getElementById("query").value;
    let textnya =  fetch("https://puknamscraper.herokuapp.com/v1/scraper/newswebmd?url=" + hasil)
                .then((data)=>{
                    if(data.ok){
                        return data.json()
                    }else{
                        return Promise.reject("ada yang tidak sesuai")
                    }
                })
                .then((json)=>document.getElementById("scraped").innerHTML=JSON.stringify(json))
                .catch((error)=>console.log('error '+error))
                    alert(hasil);  
}