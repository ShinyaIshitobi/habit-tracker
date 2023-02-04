import * as grpc from 'grpc'
import * as props_grpc_pb from './proto/props_grpc_pb'
import { HabitTracker } from './habitTracker'

const main = () => {
  const server = new grpc.Server()
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
  server.addService(props_grpc_pb.HabitTrackerService, new HabitTracker())
  server.start()
}

main()
