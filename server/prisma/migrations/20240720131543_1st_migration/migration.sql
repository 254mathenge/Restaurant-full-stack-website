-- CreateTable
CREATE TABLE "users_table" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "Role" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "users_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meals_table" (
    "mealId" TEXT NOT NULL,
    "imageUrl" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "meals_table_pkey" PRIMARY KEY ("mealId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_table_emailAddress_key" ON "users_table"("emailAddress");
