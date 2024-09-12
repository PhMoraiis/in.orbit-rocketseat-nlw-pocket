import { db } from "../db"
import { goalCompletions, goals } from "../db/schema"

export async function deleteAllGoals() {
  await db.delete(goalCompletions).execute()
  await db.delete(goals).execute()

  return {
    success: true,
    message: 'All goals deleted',
  }
}
