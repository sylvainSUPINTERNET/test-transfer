import fetch from 'node-fetch';



( async () => {

    // utils 
    function wait(ms, value) {
        return new Promise(resolve => setTimeout(resolve, ms, value));
    }

    console.log("=============== ASYNC AWAIT IN LOOP ===============")
    console.log(new Date().toISOString());
    for ( let i = 0; i < 50; i++ ) {
        const response = await fetch('https://api.github.com/users/github');
        const json = await response.json();    
    }
    console.log(new Date().toISOString());


    console.log("=============== PROMISE ALL SETTLED ===============")
    let urls = [];
    for ( let i = 0; i < 40; i++ ) { 

        urls = [ ...urls, `http://localhost:1880/cameras/${i}/transfer` ];
    }

    
    console.log(new Date().toISOString());
    const result = await Promise.allSettled( urls.map( async (url, index) => {
        // task concurrency will wait for 400mms then start and run together
        // await wait(400); 

        // will wait for 400 ms before running other task
        await wait(index * 400);
        
        let resp = await fetch(url); 
        return resp.arrayBuffer();
    }) );
    console.log(result)
    // console.assert( result.filter( result => result.status === "rejected").length === 0 );
    console.log(new Date().toISOString());


})();
