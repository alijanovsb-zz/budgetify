import User from "../models/userModel.js";

const jwtCallback = (jwt_payload, done) => {
  const user = User.findOne({ email: jwt_payload.email });

  if (user) {
    return done(null, user);
  }
  return done(null, false);
};

export default jwtCallback;
