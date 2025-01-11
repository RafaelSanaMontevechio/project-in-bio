import NextAuth from 'next-auth';

import Google from 'next-auth/providers/google';
import { FirestoreAdapter } from '@auth/firebase-adapter';

import { firebaseCert } from './firebase';

const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: FirestoreAdapter({
    credential: firebaseCert,
  }),
  providers: [Google],
  events: {},
  callbacks: {},
});
