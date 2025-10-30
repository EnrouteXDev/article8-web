'use client'

import { useLocalStorage } from 'usehooks-ts'

export function useLastViewedPhoto() {
  return useLocalStorage<string | null>('lastViewedPhoto', null)
}
