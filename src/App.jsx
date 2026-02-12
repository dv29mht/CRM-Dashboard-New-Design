import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <div className="font-sans antialiased text-slate-800">
      <TopBar />
      <Sidebar />
      <main className="ml-[220px] mt-[70px] transition-all duration-200">
        <Dashboard />
      </main>
    </div>
  );
}
