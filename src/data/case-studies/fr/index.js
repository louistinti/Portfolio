// Assemble les études de cas FR dans la map `caseStudies`, mêmes clés (slugs)
// que la version EN, obligatoirement : le routing s'appuie dessus.
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
