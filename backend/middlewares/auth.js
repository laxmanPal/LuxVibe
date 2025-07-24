import jwt from "jsonwebtoken";

export const verifyAccessToken = (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({
        message: "Access token missing",
        error: true,
        success: false,
      });
    }


    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

    if (!decoded) {
        return res.status(400).json({
            message : "Unauthorized Access"
        })
    }

    req.userId = decoded.id; 
    req.isAdmin = decoded.isAdmin;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).json({
      message: "Invalid or expired token",
      error: true,
      success: false,
    });
  }
};
