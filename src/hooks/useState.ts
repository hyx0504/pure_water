import { ref, type UnwrapRef, type Ref } from 'vue'
/**
 * 封装一层ref,为了语义化
 */
export function useRefState<T = unknown>(
  initialValue: T,
): [Ref, (val: UnwrapRef<T>) => void] {
  const state = ref<T>(initialValue)
  function setState(val: UnwrapRef<T>): void {
    state.value = val
  }
  return [state, setState]
}
