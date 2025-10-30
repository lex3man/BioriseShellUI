import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { BluetoothIcon, Bot } from "lucide-react";
import Bluetooth from "./settings/bluetooth";
import { SettingsProvider } from "@/ctx/context-provider";

const Settings = () => {
  return (
    <SettingsProvider>
      <Drawer>
        <DrawerTrigger><Button variant="outline">Настройки</Button></DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Настроки</DrawerTitle>
          </DrawerHeader>
          <Tabs defaultValue="bluetooth" className="w-full m-auto flex flex-col justify-center">
            <TabsList className="flex m-auto justify-center">
              <TabsTrigger value="bluetooth"><BluetoothIcon />Bluetooth</TabsTrigger>
              <TabsTrigger value="telegram-bot"><Bot />Telegram bot</TabsTrigger>
            </TabsList>
            <TabsContent value="bluetooth" className="p-10">
              <Bluetooth />
            </TabsContent>
            <TabsContent value="telegram-bot" className="p-10">

            </TabsContent>
          </Tabs>
          <DrawerFooter className="m-auto w-1/6 p-10">
            <Button variant="outline">Применить</Button>
            <DrawerClose>
              <Button variant="outline">Отмена</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </SettingsProvider>
  )
};

export default Settings;

