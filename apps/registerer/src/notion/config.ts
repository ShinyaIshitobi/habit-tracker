import { Client } from '@notionhq/client'
import dotenv from 'dotenv'

dotenv.config()

export const notion = new Client({ auth: process.env.NOTION_TOKEN })
export const sDbId = process.env.NOTION_S_DB_ID as string
export const hDbId = process.env.NOTION_H_DB_ID as string
