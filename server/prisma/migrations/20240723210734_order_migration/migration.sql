-- CreateTable
CREATE TABLE "orders_table" (
    "orderId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "orders_table_pkey" PRIMARY KEY ("orderId")
);

-- AddForeignKey
ALTER TABLE "orders_table" ADD CONSTRAINT "orders_table_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "users_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
