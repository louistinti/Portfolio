import { useEffect, useLayoutEffect } from 'react'

// useLayoutEffect dans le navigateur, useEffect au pré-rendu (Node) : évite
// l'avertissement React « useLayoutEffect does nothing on the server ».
// Aucun des deux ne s'exécute au pré-rendu, le comportement est identique.
export const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
