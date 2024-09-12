import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { deleteAllGoals } from '../services/delete-all-goals'

export const deleteAllGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.delete('/delete-goals', async () => {
    await deleteAllGoals()
  })
}
