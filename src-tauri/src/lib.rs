use serde::Serialize;

// Result<T, E> becomes a resolved/rejected Promise on the TypeScript side.
#[tauri::command]
fn greet(name: &str) -> Result<String, String> {
    let name = name.trim();
    if name.is_empty() {
        return Err("请输入你的名字。".to_string());
    }
    Ok(format!("你好，{name}！欢迎开始 TallyRep 的开发。"))
}

#[derive(Serialize)]
#[serde(rename_all = "lowercase")]
enum ExerciseCategory {
    Strength,
    Cardio,
}

#[derive(Serialize)]
struct Exercise {
    id: String,
    name: String,
    category: ExerciseCategory,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, list_exercises])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn list_exercises() -> Vec<Exercise> {
    vec![
        Exercise {
            id: String::from("barbell-bench-press"),
            name: String::from("杠铃卧推"),
            category: ExerciseCategory::Strength,
        },
        Exercise {
            id: String::from("barbell-squat"),
            name: String::from("杠铃深蹲"),
            category: ExerciseCategory::Strength,
        },
        Exercise {
            id: String::from("running"),
            name: String::from("跑步"),
            category: ExerciseCategory::Cardio,
        },
    ]
}
