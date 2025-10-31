import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import CellsAction from "./cells-action";
import { invoke } from "@tauri-apps/api/core";

type Device = {
  name: string;
  address: string;
};

const Bluetooth = () => {
  const [open, setOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const getActiveDevice = async () => {
      const dev = await invoke<string>("get_device");
      if (dev === "") return;
      setSelectedDevice({ name: dev.split("::")[0], address: dev.split("::")[1] });
    }

    const getDevices = async () => {
      const devices = await invoke<string[]>("get_devices");
      let devs: Device[] = [];
      devices.forEach((dev: string) => {
        devs.push({ name: dev.split(":")[0], address: dev.split(": ")[1] });
      });
      return devs;
    }

    getDevices().then(
      (devs) => { if (devs.length > 0) setDevices(devs) }
    );
    getActiveDevice();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center space-x-4">
        <p className="text-muted-foreground text-sm">Устройство: </p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[150px] justify-start">
              {selectedDevice ? <>{selectedDevice.name}</> : <>+ Выбрать</>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" side="right" align="start">
            <Command>
              <CommandInput placeholder="Change status..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {devices.map((device) => (
                    <CommandItem
                      key={device.address}
                      value={device.name}
                      onSelect={(value) => {
                        setSelectedDevice(
                          devices.find((priority) => priority.name === value) ||
                          null
                        )
                        invoke("set_device", { dev_name: value }).then(
                          () => { setOpen(false) }
                        )
                      }}
                    >
                      {device.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center space-x-4">
        <p className="text-muted-foreground text-sm">MAC-адрес: {selectedDevice?.address}</p>
      </div>
      <div className="flex flex-col items-center space-x-4">
        <CellsAction />
      </div>
    </div>
  )
}

export default Bluetooth;

