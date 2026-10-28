import { invoke, isTauri } from "@tauri-apps/api/core";
import type { Exercise } from "../types/exercise";
import {exercises as demoExercises} from "../data/exercises"

export async function listExercises(): Promise<Exercise[]> {
    if (isTauri()) {
        return invoke<Exercise[]>("list_exercises")

    }

    return demoExercises.map((exercise)=>({...exercise}))

}
