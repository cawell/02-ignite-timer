import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer.ts'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleFinishedAction,
} from '../reducers/cycles/actions.ts'
import { differenceInSeconds } from 'date-fns'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activateCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
  const [cyclesState, dispatchCycles] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activateCycleId: null,
    },
    (initialState) => {
      const storageStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )

      if (storageStateAsJSON) {
        return JSON.parse(storageStateAsJSON)
      }

      return initialState
    },
  )

  const { cycles, activateCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activateCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }
  const markCurrentCycleAsFinished = () => {
    dispatchCycles(markCurrentCycleFinishedAction())
  }

  const createNewCycle = (data: CreateCycleData) => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatchCycles(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  const interruptCurrentCycle = () => {
    dispatchCycles(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activateCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
