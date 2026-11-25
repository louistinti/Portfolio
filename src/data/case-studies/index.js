// Aggregates every case study into the `caseStudies` map keyed by slug.
// Key order is preserved from the original single-file version.
import { parisSaclay } from './paris-saclay.js'
import { charentaise } from './charentaise.js'
import { garanties } from './garanties.js'
import { seuil } from './seuil.js'
import { candidateList } from './candidate-list.js'
import { renault } from './renault.js'
import { learningLeagues } from './learning-leagues.js'
import { concepts } from './concepts.js'

export const caseStudies = {
  'paris-saclay': parisSaclay,
  'charentaise': charentaise,
  'garanties': garanties,
  'seuil': seuil,
  'candidate-list': candidateList,
  'renault': renault,
  'learning-leagues': learningLeagues,
  'concepts': concepts,
}
