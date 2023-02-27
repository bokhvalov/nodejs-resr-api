const { loginController } = require("../controllers/usersController");
const jwt = require("jsonwebtoken");
const { User } = require("../db/userModel");
const bcrypt = require("bcryptjs");

describe("User Login", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("Should return User and token", async () => {
    process.env.SECRET_JWT = "SomeSecretWords";
    const requestBody = {
      email: "test@google.com",
      password: "testtest",
    };
    const user = {
      _id: {
        $oid: "63fa259fd13dbfbacfe99325",
      },
      password: bcrypt.hashSync(requestBody.password, 8),
      email: requestBody.email,
      subscription: "starter",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2ZhMjU5ZmQxM2RiZmJhY2ZlOTkzMjUiLCJpYXQiOjE2NzczMzgwMzF9.YdjW3grEDPy8f2k-X8GWOnK9IvL8TNMQvUSp-z665Ek",
      avatarURL: "/avatars/avatar-63fa259fd13dbfbacfe99325.png",
      __v: 0,
    };

    jest.spyOn(User, "findOne").mockImplementationOnce(async () => {
      return user;
    });
    jest.spyOn(User, "findOneAndUpdate").mockImplementationOnce(async () => {
      return user;
    });

    const mReq = { body: requestBody };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await loginController(mReq, mRes);
    console.log(mRes.json);
    expect(mRes.status).toHaveBeenCalledWith(200);
    expect(mRes.json).toHaveBeenCalledWith({
      token, ///how to get token from response and verify?
      //expect(jwt.verify(mRes.token, process.env.SECRET_JWT).userId).toEqual(user._id);
      user: {
        email: requestBody.email,
        subscription: user.subscription,
      },
    });
  });
});
