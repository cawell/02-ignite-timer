import { ActionTypes } from './actions.ts'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activateCycleId: string | null
}

interface NewCyclePayload {
  newCycle: Cycle
}

interface Action<T = string, P = NonNullable<unknown>> {
  type: T
  payload: P
}

type AddNewCycleAction = Action<'ADD_NEW_CYCLE', NewCyclePayload>
type InterruptCurrentCycleAction = Action<'INTERRUPT_CURRENT_CYCLE'>
type MarkCurrentCycleAsFinishedAction = Action<'MARK_CURRENT_CYCLE_AS_FINISHED'>

type CycleActionTypes =
  | AddNewCycleAction
  | InterruptCurrentCycleAction
  | MarkCurrentCycleAsFinishedAction

export const cyclesReducer = (state: CyclesState, action: CycleActionTypes) => {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activateCycleId: action.payload.newCycle.id,
      }
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activateCycleId) {
            return { ...cycle, finishDate: new Date() }
          } else {
            return cycle
          }
        }),
        activateCycleId: null,
      }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activateCycleId) {
            return { ...cycle, finishDate: new Date() }
          } else {
            return cycle
          }
        }),
        activateCycleId: null,
      }
    default:
      return state
  }
}
