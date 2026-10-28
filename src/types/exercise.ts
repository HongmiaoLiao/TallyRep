export type ExerciseCategory = "strength" | "cardio"

export interface Exercise {
    id: string
    name: string
    category: ExerciseCategory
}
