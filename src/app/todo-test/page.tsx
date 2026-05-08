import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Todo List (Supabase Test)</h1>
      <ul className="space-y-2">
        {todos?.map((todo: any) => (
          <li key={todo.id} className="p-3 bg-white border rounded-lg shadow-sm">
            {todo.name}
          </li>
        ))}
        {(!todos || todos.length === 0) && (
          <p className="text-gray-500">No todos found or table doesn't exist yet.</p>
        )}
      </ul>
    </div>
  )
}
