export async function deleteGoals() {
  const response = await fetch('http://localhost:3333/delete-goals', {
    method: 'DELETE',
  })

  return response
}
