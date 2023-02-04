// GENERATED CODE -- DO NOT EDIT!

'use strict'
var grpc = require('grpc')
var props_pb = require('./props_pb.js')

function serialize_habitTracker_Empty(arg) {
  if (!(arg instanceof props_pb.Empty)) {
    throw new Error('Expected argument of type habitTracker.Empty')
  }
  return Buffer.from(arg.serializeBinary())
}

function deserialize_habitTracker_Empty(buffer_arg) {
  return props_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg))
}

function serialize_habitTracker_HProps(arg) {
  if (!(arg instanceof props_pb.HProps)) {
    throw new Error('Expected argument of type habitTracker.HProps')
  }
  return Buffer.from(arg.serializeBinary())
}

function deserialize_habitTracker_HProps(buffer_arg) {
  return props_pb.HProps.deserializeBinary(new Uint8Array(buffer_arg))
}

function serialize_habitTracker_SProps(arg) {
  if (!(arg instanceof props_pb.SProps)) {
    throw new Error('Expected argument of type habitTracker.SProps')
  }
  return Buffer.from(arg.serializeBinary())
}

function deserialize_habitTracker_SProps(buffer_arg) {
  return props_pb.SProps.deserializeBinary(new Uint8Array(buffer_arg))
}

var HabitTrackerService = (exports.HabitTrackerService = {
  registerHProps: {
    path: '/habitTracker.HabitTracker/RegisterHProps',
    requestStream: false,
    responseStream: false,
    requestType: props_pb.HProps,
    responseType: props_pb.Empty,
    requestSerialize: serialize_habitTracker_HProps,
    requestDeserialize: deserialize_habitTracker_HProps,
    responseSerialize: serialize_habitTracker_Empty,
    responseDeserialize: deserialize_habitTracker_Empty,
  },
  registerSProps: {
    path: '/habitTracker.HabitTracker/RegisterSProps',
    requestStream: false,
    responseStream: false,
    requestType: props_pb.SProps,
    responseType: props_pb.Empty,
    requestSerialize: serialize_habitTracker_SProps,
    requestDeserialize: deserialize_habitTracker_SProps,
    responseSerialize: serialize_habitTracker_Empty,
    responseDeserialize: deserialize_habitTracker_Empty,
  },
})

exports.HabitTrackerClient = grpc.makeGenericClientConstructor(HabitTrackerService)
