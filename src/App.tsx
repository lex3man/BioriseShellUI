// import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import "./App.css";
import Settings from "./components/settings";
import { BleDevice, startScan } from '@mnlphlp/plugin-blec';

function App() {
  const [_devs, setDevs] = useState<BleDevice[]>([]);
  useEffect(() => {
    const scanDevices = async () => {
      await startScan(((devs) => setDevs(devs)), 5000);
    }

    scanDevices();
  }, [])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <h1 className="text-4xl font-bold">Biorise</h1>
        <Settings />
      </div>
    </main>
  );
}

export default App;
