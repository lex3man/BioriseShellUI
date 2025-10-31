mod ipc;

use std::sync::Mutex;
use tauri::Manager;

pub struct AppState {
    pub bt_device_name: Option<String>,
    pub bot_active: bool,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_blec::init())
        .setup(|app| {
            app.manage(Mutex::new(AppState {
                bt_device_name: None,
                bot_active: false,
            }));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            ipc::bluetooth::get_devices,
            ipc::bluetooth::get_device,
            ipc::bluetooth::set_device,
            ipc::bluetooth::drive_action
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
