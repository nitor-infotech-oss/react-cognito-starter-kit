/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import './NotFound.css';

export default function NotFound() {
  return (
    <body>
      <div id="notfound">
        <div class="notfound">
          <h2>We are sorry, Page not found!</h2>
          <p>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>
        </div>
      </div>
    </body>
  );
}
