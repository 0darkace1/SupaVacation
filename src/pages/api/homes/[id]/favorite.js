import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  // Check if user is authenticated
  const session = await getSession({ req });

  if (!session) {
    // console.error("Unauthorized");

    return res.status(401).json({ message: "Unauthorized." });
  }

  // Retrieve home ID from request
  const { id } = req.query;

  //Add home to favorite
  if (req.method === "PUT") {
    try {
      const user = await prisma.user.update({
        where: { email: session.user.email },
        data: {
          favoriteHomes: {
            connect: {
              id,
            },
          },
        },
      });

      console.log("added to fav", user);
      res.status(200).json(user);
    } catch (e) {
      console.log("Error: " + e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  // Remove home from favorite
  else if (req.method === "DELETE") {
    try {
      const user = await prisma.user.update({
        where: { email: session.user.email },
        data: {
          favoriteHomes: {
            disconnect: {
              id,
            },
          },
        },
      });

      res.status(200).json(user.favoriteHomes);
    } catch (e) {
      console.log("Error: " + e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  // HTTP method not supported!
  else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
