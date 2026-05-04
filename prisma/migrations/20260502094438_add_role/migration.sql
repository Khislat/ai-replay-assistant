-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "memberNick" TEXT NOT NULL,
    "memberPhone" TEXT NOT NULL,
    "memberPassword" TEXT NOT NULL,
    "refreshToken" TEXT,
    "role" "MemberRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_memberPhone_key" ON "Member"("memberPhone");
