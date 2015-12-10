var config = {}

config.db = {};
config.mqtt = {};


config.db.host = process.env.DB_HOST || 'localhost';
config.db.port = process.env.DB_PORT || 27017;
config.db.database = process.env.DB_NAME || 'hackathon';

config.mqtt.host = process.env.MQTT_HOST || 'broker.demo.xively.com';
config.mqtt.port = process.env.MQTT_PORT || 1883;
config.mqtt.username = process.env.MQTT_USERNAME || 'a8b1e92c-9477-4e1f-abaf-5f38d79a5d3b';
config.mqtt.password = process.env.MQTT_PASSWORD || 'VoWbTg0tQPErQGsmqbo0TrmqYFtBKn8LQE0gd+UinIw=';
config.mqtt.topic = process.env.MQTT_TOPIC || 'xi/blue/v1/902d2b13-1db8-412a-98ed-b457335be6f2/d/72158116-145f-4717-8d4b-53a537681ec2/button';
config.mqtt.responseTopic = process.env.MQTT_RESPONSE_TOPIC || 'xi/blue/v1/902d2b13-1db8-412a-98ed-b457335be6f2/d/72158116-145f-4717-8d4b-53a537681ec2/status';

module.exports = config;