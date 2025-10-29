use android_bluetooth_serial::{get_bonded_devices, BluetoothDevice, BluetoothSocket};
use std::{error::Error, io::Write};

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
