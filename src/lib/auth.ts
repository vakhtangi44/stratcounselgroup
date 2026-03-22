import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { db } from './db'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const admin = await db.adminUser.findUnique({
          where: { email: credentials.email as string },
        })

        if (!admin) return null

        const valid = await bcrypt.compare(
          credentials.password as string,
          admin.passwordHash
        )

        if (!valid) return null

        await db.adminUser.update({
          where: { id: admin.id },
          data: { lastLoginAt: new Date() },
        })

        return { id: String(admin.id), email: admin.email }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth
    },
  },
})
