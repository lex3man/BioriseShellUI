import React, { useContext } from "react";

type SettingsProps = {
  children: React.ReactNode;
  defaultBtDeviceAddress?: string;
  storegeKey?: string;
};

type SettingsContextState = {
  btDeviceAddress: string;
  setBtDeviceAddress: (address: string) => void;
};

const initialState: SettingsContextState = {
  btDeviceAddress: "",
  setBtDeviceAddress: () => null,
};

const SettingsContext = React.createContext<SettingsContextState>(initialState);

export function SettingsProvider({
  children,
  defaultBtDeviceAddress = "",
  ...props
}: SettingsProps) {
  const [btDeviceAddress, setBtDeviceAddress] = React.useState<string>(
    () => localStorage.getItem("btDeviceAddress") || defaultBtDeviceAddress
  );

  const value = {
    btDeviceAddress,
    setBtDeviceAddress: (address: string) => {
      localStorage.setItem("btDeviceAddress", address);
      setBtDeviceAddress(address);
    },
  }

  return (
    <SettingsContext.Provider {...props} value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context
}
