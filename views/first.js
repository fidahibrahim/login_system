function fetchData(data){
    return new Promise((resolve, reject) => {
        let user=true
            if(user){
                resolve("hello")
            }
            else{
               reject("error")
            }
        
    })
}

fetchData().then((result)=>{
    console.log(result);
}).catch((err)=>{
    console.log(err);
})