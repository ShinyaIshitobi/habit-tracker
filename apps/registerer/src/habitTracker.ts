import * as grpc from 'grpc'
import * as props_pb from './proto/props_pb'
import * as props_grpc_pb from './proto/props_grpc_pb'
import { notion, sDbId, hDbId } from './notion/config'
import { assert } from 'console'

export class HabitTracker implements props_grpc_pb.IHabitTrackerServer {
  async registerSProps(call: grpc.ServerUnaryCall<props_pb.SProps>, callback: grpc.sendUnaryData<props_pb.Empty>) {
    const sprops = call.request.toObject()

    const properties = {
      'Date': { date: { start: sprops.date } },
      '自炊': { checkbox: sprops.cooking },
      'リングフィット': { checkbox: sprops.ringfit },
      '瞑想': { checkbox: sprops.meditation },
      'テックブログ': { checkbox: sprops.techblog },
      'Bed by 12': { checkbox: sprops.bedby12 },
      'wake up by 8': { checkbox: sprops.wakeupby8 },
    }

    await updateDatabase(sDbId, properties, sprops.date)

    callback(null, new props_pb.Empty())
  }
  async registerHProps(call: grpc.ServerUnaryCall<props_pb.HProps>, callback: grpc.sendUnaryData<props_pb.Empty>) {
    const hprops = call.request.toObject()

    const properties = {
      'Date': { date: { start: hprops.date } },
      '自炊': { checkbox: hprops.cooking },
      '瞑想': { checkbox: hprops.meditation },
      'Bed by 12': { checkbox: hprops.bedby12 },
      '筋トレ15分': { checkbox: hprops.training },
    }

    await updateDatabase(hDbId, properties, hprops.date)
    callback(null, new props_pb.Empty())
  }
}

/**
 * Update the database
 *
 * @param {string} dbId notion database id
 * @param {Record<string, Record<'checkbox', boolean> | Record<'date', Record<'start', string>>>} properties properties to update
 * @param {string} date date to update
 */
const updateDatabase = async (
  dbId: string,
  properties: Record<string, Record<'checkbox', boolean> | Record<'date', Record<'start', string>>>,
  date: string,
) => {
  console.log('new request comes\n')
  console.log(properties)

  await notion.databases
    .query({
      database_id: dbId,
      filter: { property: 'Date', date: { equals: date } },
    })
    .then(async (res) => {
      assert(res.results.length == 1)

      await notion.pages.update({
        page_id: res.results[0].id,
        properties: properties,
      })
    })
}
