document.querySelector(".btn").addEventListener("click",(async()=>{try{const t=await async function(){return(await axios.get("https://api.thecatapi.com/v1/breeds")).data}();console.log(t)}catch(t){console.log(t)}}));
//# sourceMappingURL=index.a4b80d07.js.map
