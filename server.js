import { connect } from '../auth/src/broker/rabbit.js'
import listner from './src/broker/listner.js'
import app from './src/app.js'


(async () => {
  await connect(); // make sure channel is ready
  listner();      // now you can subscribe safely
})();


const PORT = process.env.PORT || 4001

app.listen(PORT,()=>{
    console.log(`🔥Notification server is running on port: ${PORT}`)
})