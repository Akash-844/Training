import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import "./App.css";
const App = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-900 transition-all duration-500">
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
        </div>
      </div>
    </div>
  );
};

export default App;
