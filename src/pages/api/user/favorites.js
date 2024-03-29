import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  // Check if user is authenticated
  const session = await getSession({ req });

  if (!session) {
    // console.error("Unauthorized");

    return res.status(401).json({ message: "Unauthorized." });
  }

  // Get the user's favorite homes
  if (req.method === "GET") {
    try {
      const { favoriteHomes } = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
          favoriteHomes: true,
        },
      });

      res.status(200).json(favoriteHomes);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  // HTTP method not supported!
  else {
    res.setHeader("Allow", ["GET"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
