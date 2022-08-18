-- DropForeignKey
ALTER TABLE "Home" DROP CONSTRAINT "Home_userId_fkey";

-- AddForeignKey
ALTER TABLE "Home" ADD CONSTRAINT "Home_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
