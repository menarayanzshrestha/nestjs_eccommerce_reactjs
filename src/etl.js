const axios = require('axios');

(async () => {
    const { data }  = await axios.post('http://localhost:3000/auth/login', {
        username : "admin",
        password: "admin"
    });


    console.log(data,"here is data");
})();