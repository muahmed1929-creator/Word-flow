import { History, FileText, Search, Filter, Download } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function HistoryPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();

  const { data: historyItems } = await supabase
    .from('history')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Content History</h1>
          <p className="text-gray-500 mt-2">View and manage your previously generated content.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search history..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Content Title</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Keywords</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Words</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Generated</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {historyItems && historyItems.length > 0 ? historyItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                        <FileText size={18} />
                      </div>
                      <span className="font-semibold text-primary truncate max-w-[200px]">{item.keywords || 'Untitled'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {item.keywords?.split(',').map((tag: string) => (
                        <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.words_count} words</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors" title="Download">
                        <Download size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors" title="View">
                        <History size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="p-20 text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <History size={40} className="text-gray-200" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-400">No History Found</h3>
                    <p className="text-gray-400">You haven't generated any content yet.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-gray-50/50 border-t flex justify-between items-center">
          <p className="text-sm text-gray-500">Showing {historyItems?.length || 0} results</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-bold text-gray-400 bg-white border rounded-lg cursor-not-allowed">Previous</button>
            <button className="px-4 py-2 text-sm font-bold text-primary bg-white border border-primary rounded-lg hover:bg-primary hover:text-white transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
