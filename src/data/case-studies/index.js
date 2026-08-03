// Aggregates every case study into the `caseStudies` map keyed by slug.
// Key order is preserved from the original single-file version.
import { parisSaclay } from './paris-saclay.js'
import { charentaise } from './charentaise.js'
import { garence } from './garence.js'
import { candidateList } from './candidate-list.js'
import { renault } from './renault.js'
import { learningLeagues } from './learning-leagues.js'
import { concepts } from './concepts.js'

export const caseStudies = {
  'paris-saclay': parisSaclay,
  'charentaise': charentaise,
  'garence': garence,
  'candidate-list': candidateList,
  'renault': renault,
  'learning-leagues': learningLeagues,
  'concepts': concepts,
}
