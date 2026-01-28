import { connect } from './src/broker/Rabbit.js'
import listener from './src/broker/listner.js'
import app from './src/app.js'
import config from './src/config/config.js';

(async () => {
  await connect();   // connect to RabbitMQ
  listener();        // start consuming messages
})();

const PORT = config.PORT || 4001


app.listen(PORT, () => {
  console.log(`🔥 Notification server is running on port: ${PORT}`);
});
