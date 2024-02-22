import { Cycle } from './reducer.ts'

export const enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export interface AddNewCycleAction {
  type: ActionTypes.ADD_NEW_CYCLE
  payload: {
    newCycle: Cycle
  }
}

export interface InterruptCycleAction {
  type: ActionTypes.INTERRUPT_CURRENT_CYCLE
}

export interface MarkCycleAsFinishedAction {
  type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED
}

export type CyclesAction =
  | AddNewCycleAction
  | InterruptCycleAction
  | MarkCycleAsFinishedAction

export const addNewCycleAction = (newCycle: Cycle): AddNewCycleAction => {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export const markCurrentCycleFinishedAction = (): MarkCycleAsFinishedAction => {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
  }
}

export const interruptCurrentCycleAction = (): InterruptCycleAction => {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}
