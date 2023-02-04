// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.21.8
// source: props.proto

package __

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// HabitTrackerClient is the client API for HabitTracker service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type HabitTrackerClient interface {
	RegisterHProps(ctx context.Context, in *HProps, opts ...grpc.CallOption) (*Empty, error)
	RegisterSProps(ctx context.Context, in *SProps, opts ...grpc.CallOption) (*Empty, error)
}

type habitTrackerClient struct {
	cc grpc.ClientConnInterface
}

func NewHabitTrackerClient(cc grpc.ClientConnInterface) HabitTrackerClient {
	return &habitTrackerClient{cc}
}

func (c *habitTrackerClient) RegisterHProps(ctx context.Context, in *HProps, opts ...grpc.CallOption) (*Empty, error) {
	out := new(Empty)
	err := c.cc.Invoke(ctx, "/habitTracker.HabitTracker/RegisterHProps", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *habitTrackerClient) RegisterSProps(ctx context.Context, in *SProps, opts ...grpc.CallOption) (*Empty, error) {
	out := new(Empty)
	err := c.cc.Invoke(ctx, "/habitTracker.HabitTracker/RegisterSProps", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// HabitTrackerServer is the server API for HabitTracker service.
// All implementations must embed UnimplementedHabitTrackerServer
// for forward compatibility
type HabitTrackerServer interface {
	RegisterHProps(context.Context, *HProps) (*Empty, error)
	RegisterSProps(context.Context, *SProps) (*Empty, error)
	mustEmbedUnimplementedHabitTrackerServer()
}

// UnimplementedHabitTrackerServer must be embedded to have forward compatible implementations.
type UnimplementedHabitTrackerServer struct {
}

func (UnimplementedHabitTrackerServer) RegisterHProps(context.Context, *HProps) (*Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method RegisterHProps not implemented")
}
func (UnimplementedHabitTrackerServer) RegisterSProps(context.Context, *SProps) (*Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method RegisterSProps not implemented")
}
func (UnimplementedHabitTrackerServer) mustEmbedUnimplementedHabitTrackerServer() {}

// UnsafeHabitTrackerServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to HabitTrackerServer will
// result in compilation errors.
type UnsafeHabitTrackerServer interface {
	mustEmbedUnimplementedHabitTrackerServer()
}

func RegisterHabitTrackerServer(s grpc.ServiceRegistrar, srv HabitTrackerServer) {
	s.RegisterService(&HabitTracker_ServiceDesc, srv)
}

func _HabitTracker_RegisterHProps_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(HProps)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(HabitTrackerServer).RegisterHProps(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/habitTracker.HabitTracker/RegisterHProps",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(HabitTrackerServer).RegisterHProps(ctx, req.(*HProps))
	}
	return interceptor(ctx, in, info, handler)
}

func _HabitTracker_RegisterSProps_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SProps)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(HabitTrackerServer).RegisterSProps(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/habitTracker.HabitTracker/RegisterSProps",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(HabitTrackerServer).RegisterSProps(ctx, req.(*SProps))
	}
	return interceptor(ctx, in, info, handler)
}

// HabitTracker_ServiceDesc is the grpc.ServiceDesc for HabitTracker service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var HabitTracker_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "habitTracker.HabitTracker",
	HandlerType: (*HabitTrackerServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "RegisterHProps",
			Handler:    _HabitTracker_RegisterHProps_Handler,
		},
		{
			MethodName: "RegisterSProps",
			Handler:    _HabitTracker_RegisterSProps_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "props.proto",
}