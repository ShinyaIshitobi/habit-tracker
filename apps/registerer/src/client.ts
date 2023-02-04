import * as grpc from 'grpc'
import * as props_grpc_pb from './proto/props_grpc_pb'
import * as props_pb from './proto/props_pb'

const client = new props_grpc_pb.HabitTrackerClient('localhost:50051', grpc.credentials.createInsecure())

const sprops = new props_pb.SProps()
sprops.setDate('2023-02-01')
sprops.setCooking(true)
sprops.setRingfit(true)

// client.registerSProps(sprops, (err, res) => {
//   if (err) {
//     console.error(err)
//   } else {
//     console.log(res)
//   }
// })

const hprops = new props_pb.HProps()
hprops.setDate('2023-02-01')
hprops.setCooking(true)

client.registerHProps(hprops, (err, res) => {
  if (err) {
    console.error(err)
  } else {
    console.log(res)
  }
})
