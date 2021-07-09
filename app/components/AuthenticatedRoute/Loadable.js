/**
 *
 * Asynchronously loads the component for AuthenticatedRoute
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
