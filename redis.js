import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const redisClient=()=>{
return redis.createClient({
    // host:localhost,
    // port:6379,
    url:process.env.redis_url,
});
}
const client = redisClient();

client.on('error',(err)=>{
    console.log(err);
})
client.on('connect',()=>{
    console.log('Connected to Redis');
})
client.on('end',()=>{
    console.log('redis connection ended');
})
client.on('SIGQUIT',()=>{
    client.quit();
})
export default client;
