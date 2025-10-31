use android_bluetooth_serial::{get_bonded_devices, BluetoothDevice, BluetoothSocket};
use std::{error::Error, io::Write};
use tauri::{async_runtime::Mutex, State};

use crate::AppState;

#[tauri::command]
pub async fn get_devices() -> Vec<String> {
    let devices = get_bonded_devices().unwrap().into_iter();
    devices
        .map(|dev| {
            let name = dev.get_name().unwrap();
            let address = dev.get_address().unwrap();
            format!("{name}: {address}")
        })
        .collect()
}

#[tauri::command]
pub async fn set_device(state: State<'_, Mutex<AppState>>, dev_name: String) -> Result<(), ()> {
    let mut state = state.lock().await;
    state.bt_device_name = Some(dev_name);
    Ok(())
}

#[tauri::command]
pub async fn get_device(state: State<'_, Mutex<AppState>>) -> Result<String, ()> {
    let state = state.lock().await;
    if let Some(dev_name) = &state.bt_device_name {
        let devices = get_bonded_devices().unwrap().into_iter();
        for dev in devices {
            if dev.get_name().unwrap() == *dev_name {
                return Ok(format!(
                    "{}::{}",
                    &dev_name,
                    &dev.get_address().unwrap().to_string()
                ));
            }
        }
    };
    Ok("".to_string())
}

#[tauri::command]
pub async fn drive_action(i: i32) -> String {
    match try_connect(i).await {
        Ok(s) => s,
        Err(e) => format!("Error: {}", e),
    }
}

async fn try_connect(port: i32) -> Result<String, Box<dyn Error>> {
    let address = "4F:26:4B:F3:EE:89";
    let uuid = "00001101-0000-1000-8000-00805f9b34fb";
    let devices: Vec<BluetoothDevice> = get_bonded_devices()?;
    for device in devices {
        if device.get_address().unwrap() == address.to_string() {
            let mut socket: BluetoothSocket = device.build_rfcomm_socket(uuid, true)?;
            socket.connect()?;
            socket.write(&format!("{port} force").as_bytes())?;

            return Ok(format!("Sent {} to {}", port, device.get_name()?));
        }
    }
    Ok(format!("Error: Device not found"))
}
