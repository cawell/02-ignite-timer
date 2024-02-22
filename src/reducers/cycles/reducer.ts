import { ActionTypes } from './actions.ts'
import { produce } from 'immer'

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
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activateCycleId: action.payload.newCycle.id,
      // }

      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activateCycleId = action.payload.newCycle.id
      })
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activateCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activateCycleId = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activateCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activateCycleId = null
        draft.cycles[currentCycleIndex].finishDate = new Date()
      })
    }
    default:
      return state
  }
}
