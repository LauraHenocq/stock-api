/* eslint-disable @typescript-eslint/no-explicit-any */
import { when } from 'jest-when';
import { v4 as uuidv4 } from 'uuid';

import { FAKE_ID } from './constants';

jest.mock('uuid');

beforeEach(() => {
  when(uuidv4).mockReturnValue(FAKE_ID);
});

afterEach(() => {
  jest.resetAllMocks();
});
