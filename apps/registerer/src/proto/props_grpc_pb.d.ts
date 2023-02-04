// package: habitTracker
// file: props.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as props_pb from "./props_pb";

interface IHabitTrackerService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    registerHProps: IHabitTrackerService_IRegisterHProps;
    registerSProps: IHabitTrackerService_IRegisterSProps;
}

interface IHabitTrackerService_IRegisterHProps extends grpc.MethodDefinition<props_pb.HProps, props_pb.Empty> {
    path: "/habitTracker.HabitTracker/RegisterHProps";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<props_pb.HProps>;
    requestDeserialize: grpc.deserialize<props_pb.HProps>;
    responseSerialize: grpc.serialize<props_pb.Empty>;
    responseDeserialize: grpc.deserialize<props_pb.Empty>;
}
interface IHabitTrackerService_IRegisterSProps extends grpc.MethodDefinition<props_pb.SProps, props_pb.Empty> {
    path: "/habitTracker.HabitTracker/RegisterSProps";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<props_pb.SProps>;
    requestDeserialize: grpc.deserialize<props_pb.SProps>;
    responseSerialize: grpc.serialize<props_pb.Empty>;
    responseDeserialize: grpc.deserialize<props_pb.Empty>;
}

export const HabitTrackerService: IHabitTrackerService;

export interface IHabitTrackerServer {
    registerHProps: grpc.handleUnaryCall<props_pb.HProps, props_pb.Empty>;
    registerSProps: grpc.handleUnaryCall<props_pb.SProps, props_pb.Empty>;
}

export interface IHabitTrackerClient {
    registerHProps(request: props_pb.HProps, callback: (error: grpc.ServiceError | null, response: props_pb.Empty) => void): grpc.ClientUnaryCall;
    registerHProps(request: props_pb.HProps, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: props_pb.Empty) => void): grpc.ClientUnaryCall;
    registerHProps(request: props_pb.HProps, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: props_pb.Empty) => void): grpc.ClientUnaryCall;
    registerSProps(request: props_pb.SProps, callback: (error: grpc.ServiceError | null, response: props_pb.Empty) => void): grpc.ClientUnaryCall;
    registerSProps(request: props_pb.SProps, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: props_pb.Empty) => void): grpc.ClientUnaryCall;
    registerSProps(request: props_pb.SProps, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: props_pb.Empty) => void): grpc.ClientUnaryCall;
}

export class HabitTrackerClient extends grpc.Client implements IHabitTrackerClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public registerHProps(request: props_pb.HProps, callback: (error: grpc.ServiceError | null, response: props_pb.Empty) => void): grpc.ClientUnaryCall;
    public registerHProps(request: props_pb.HProps, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: props_pb.Empty) => void): grpc.ClientUnaryCall;
    public registerHProps(request: props_pb.HProps, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: props_pb.Empty) => void): grpc.ClientUnaryCall;
    public registerSProps(request: props_pb.SProps, callback: (error: grpc.ServiceError | null, response: props_pb.Empty) => void): grpc.ClientUnaryCall;
    public registerSProps(request: props_pb.SProps, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: props_pb.Empty) => void): grpc.ClientUnaryCall;
    public registerSProps(request: props_pb.SProps, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: props_pb.Empty) => void): grpc.ClientUnaryCall;
}
