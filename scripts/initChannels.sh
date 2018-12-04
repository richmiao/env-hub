curl -X POST /chaincodes \
  -h "Content-Type: applicaiton/json" \
  -d '{}'

echo create channel
curl -s -X POST \
  http://localhost:4000/channels \
  -H "content-type: application/json" \
  -d '{
	"channelName":"confighubchannel",
	"channelConfigPath":"../artifacts/channel/confighubchannel.tx"
}'