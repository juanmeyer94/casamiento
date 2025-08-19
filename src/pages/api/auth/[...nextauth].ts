import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        // Usuarios predeterminados
        const validUsers = [
          {
            id: "1",
            username: process.env.ADM_ACCOUNT,
            password: process.env.ADM_PASSWORD,
            name: "Administradores",
            role: "admin",
          },
        ];

        const user = validUsers.find(
          (u) => u.username === credentials?.username
            && u.password === credentials?.password,
        );

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: `${user.username}@admin.local`,
            role: "admin",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // eslint-disable-next-line no-param-reassign
        token.role = "admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        // eslint-disable-next-line no-param-reassign
        session.user = {
          ...session.user,
          role: token.role as string,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
