-- CreateEnum
CREATE TYPE "Nationality" AS ENUM ('THAI', 'NONTHAI');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Skin" AS ENUM ('WHITE', 'WHITEYELLOW', 'WHITERED', 'BLACK', 'BLACKYELLOW', 'BLACKRED', 'NORNAL');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('UNFOUNED', 'FOUNDED');

-- CreateEnum
CREATE TYPE "Province" AS ENUM ('BANGKOK', 'KRABI', 'KANCHANABURI', 'KALASIN', 'KAMPHAENGPHET', 'KHONKAEN', 'CHANTHABURI', 'CHACHOENGSAO', 'CHONBURI', 'CHAINAT', 'CHAIYAPHUM', 'CHUMPHON', 'CHIANGRAI', 'CHIANGMAI', 'TRANG', 'TRAT', 'TAK', 'NAKHONNAYOK', 'NAKHONPATHOM', 'NAKHONPHANOM', 'NAKHONRATCHASIMA', 'NAKHONSITHAMMARAT', 'NAKHONSAWAN', 'NONTHABURI', 'NARATHIWAT', 'NAN', 'BUENGKAN', 'BURIRAM', 'PATHUMTHANI', 'PRACHUAPKHIRIKHAN', 'PRACHINBURI', 'PATTANI', 'PHRANAKHONSIAYUTTHAYA', 'PHAYAO', 'PHANGNGA', 'PHATTHALUNG', 'PHICHIT', 'PHITSANULOK', 'PHETCHABURI', 'PHETCHABUN', 'PHRAE', 'PHUKET', 'MAHASARAKHAM', 'MUKDAHAN', 'MAEHONGSON', 'YASOTHON', 'YALA', 'ROIET', 'RANONG', 'RAYONG', 'RATCHABURI', 'LOPBURI', 'LAMPANG', 'LAMPHUN', 'LOEI', 'SISAKET', 'SAKONNAKHON', 'SONGKHLA', 'SATUN', 'SAMUTPRAKAN', 'SAMUTSONGKHRAM', 'SAMUTSAKHON', 'SAKAEO', 'SARABURI', 'SINGBURI', 'SUKHOTHAI', 'SUPHANBURI', 'SURATTHANI', 'SURIN', 'NONGKHAI', 'NONGBUALAMPHU', 'ANGTHONG', 'AMNATCHAROEN', 'UDONTHANI', 'UTTARADIT', 'UTHAITHANI', 'UBONRATCHATHANI');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "province" "Province" NOT NULL,
    "postcode" TEXT NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isArchive" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "img" TEXT,
    "nationality" "Nationality" NOT NULL,
    "ageLastSeen" INTEGER NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "skin" "Skin" NOT NULL,
    "remark" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'UNFOUNED',
    "province" "Province" NOT NULL,
    "place" TEXT NOT NULL,
    "missingDatetime" TIMESTAMP(3) NOT NULL,
    "missingDetail" TEXT NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "comment_id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "foundPlace" TEXT NOT NULL,
    "foundDatetime" TIMESTAMP(3) NOT NULL,
    "foundDetail" TEXT NOT NULL,
    "img" TEXT,
    "isArchive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("comment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
