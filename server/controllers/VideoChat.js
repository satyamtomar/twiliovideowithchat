const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const ChatGrant = AccessToken.ChatGrant;
const accountSid =process.env.twilioAccountSid;
const authToken = process.env.authToken;
const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

// const { Config } = require("../config");
const Joi = require("@hapi/joi");
// const APP_CONSTANTS = require("../appConstants");
import responseMessages from "../resources/response.json";
const Boom = require("boom");
import universalFunctions from "../utils/universalFunctions";

module.exports = {
  
  getToken: async (req, res) => {
    try {
      const schema = Joi.object({
        roomName: Joi.string().required(),
        identity:Joi.string().required(),
        // convoId:Joi.string().allow(''),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
        // return 400 if the request has an empty body or no roomName
        // console.log("twilioconfig",twilioConfig);
        const identity = req.body.identity;
        const room = req.body.roomName;
        let videoGrant, chatGrant;
          videoGrant = new VideoGrant({ room });
           chatGrant = new ChatGrant({
            serviceSid: process.env.serviceSid,
    })
    let sid,participantId,convoId;
    // await  client.conversations.conversations(req.body.convoId)
    //   .fetch()
    //   .then(conversation =>{ console.log(conversation);sid= conversation.sid})
    //   .catch(error => {console.log(error);});
const convo=await client.conversations.conversations.list();
console.log(convo,'convo')
convo.forEach(con => {
    if (con.uniqueName === room)
          sid=con.sid;
})
    if(!sid){
   await client.conversations.v1.conversations.create({friendlyName: req.body.roomName,uniqueName:req.body.roomName})
                    .then(conversation =>{ console.log(conversation.sid);sid=conversation.sid;})
                    .catch(error => {console.log(error,'error')});
     if(!sid)
    {
        throw Boom.badRequest('dont know the reason yet');
    }
    }
    
    
    convoId=sid;
    console.log(convoId);
    await   client.conversations.conversations(convoId)
            .participants
            .create({identity: req.body.identity})
            .then(participant => {console.log(participant.sid);participantId= participant.sid;})
            .catch(error => {console.log(error);});
         
            
    

        const token = new AccessToken(
            process.env.twilioAccountSid,
            process.env.twilioApiKey,
            process.env.twilioApiSecret,
          );
        token.addGrant(videoGrant);
        token.addGrant(chatGrant);
        token.identity = identity;
        
if(!token){
    throw Boom.badRequest("token not found")
}
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Room successfully joined",
          data:{token:token.toJwt(),convoId:convoId}
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },

};
