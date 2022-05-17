const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

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
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
        // return 400 if the request has an empty body or no roomName
        console.log("twilioconfig",twilioConfig);
        const identity = req.body.identity;
        const room = req.body.roomName;
        let videoGrant;
        if (typeof room !== 'undefined') {
          videoGrant = new VideoGrant({ room });
        } else {
          videoGrant = new VideoGrant();
        }
        const token = new AccessToken(
            process.env.twilioAccountSid,
            process.env.twilioApiKey,
            process.env.twilioApiSecret,
          );
        token.addGrant(videoGrant);
        token.identity = identity;
        
        // const token = videoToken(identity, room, twilioConfig);
        // sendTokenResponse(token, res);
if(!token){
    throw Boom.badRequest("token not found")
}
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Room successfully joined",
          data:token.toJwt(),
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },

};
