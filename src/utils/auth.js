import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Backend API call to Express for authentication
        const res = await fetch(
          `https://smmbackend-tgnc.onrender.com/api/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );

        const user = await res.json();

        if (!res.ok || !user.token) {
          throw new Error(user.message || "Invalid credentials");
        }

        return {
          ...user,
          Id: user._id,
          token: user.token,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.role = user.role;
        token.id = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken; // Add token to session
      session.user.role = token.role;
      session.user._id = token.id;
      return session;
    },
  },
  pages: {
    signIn: "/login", // Custom login page
  },
};
