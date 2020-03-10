const axios = require('axios');

(async () => {

    try {
        const { data: {token} }  = await axios.post('http://localhost:3000/v1/auth/login', {
            username : "admin",
            password: "admin"
        });

        const { data }  = await axios.get('http://localhost:3000/v1/auth', 
        {
            headers: {
                // authorization : `Bearer ${token}`
            }
        });

        console.log(data,"here is data");
        
    } catch (err) {
        console.log(err)
    }
    

    
})();