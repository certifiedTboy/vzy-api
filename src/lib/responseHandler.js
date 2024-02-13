const express = require("express");
const httpData = require("./constants/index");

class ResponseHandler {
  static send(
    res,
    statusCode,
    data,
    message = httpData.responseMessage.SUCCESS
  ) {
    return res.status(statusCode).json({ message: message, data });
  }

  static auth(
    res,
    jwtTokenOptions,
    data,
    message = httpData.responseMessage.SUCCESS
  ) {
    res
      .cookie(
        "refreshToken",
        data.userSession.userSession.refreshToken,
        jwtTokenOptions
      )
      .json({
        message: message,
        userData: data.userData,
        accessToken: data.userSession.accessToken,
      });
  }

  static clearCookie(
    res,
    jwtTokenOptions,
    data,
    message = httpData.responseMessage.SUCCESS
  ) {
    res.clearCookie("refreshToken", data, jwtTokenOptions).json({
      message: message,
    });
  }

  static ok(res, data, message = httpData.responseMessage.OK) {
    return ResponseHandler.send(
      res,
      httpData.httpStatusCode.SUCCESS,
      data,
      message
    );
  }

  static created(res, data, message = httpData.responseMessage.CREATED) {
    return ResponseHandler.send(
      res,
      httpData.httpStatusCode.CREATED,
      data,
      message
    );
  }

  static authenticated(
    res,
    data,
    jwtTokenOptions,
    message = httpData.responseMessage.OK
  ) {
    return ResponseHandler.auth(res, jwtTokenOptions, data, message);
  }
}

module.exports = ResponseHandler;
