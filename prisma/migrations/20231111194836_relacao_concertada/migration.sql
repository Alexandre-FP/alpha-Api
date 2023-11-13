/*
  Warnings:

  - You are about to drop the column `cadastrarClienteId` on the `procedimento` table. All the data in the column will be lost.
  - Added the required column `procedimentoId` to the `cadastrarCliente` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "procedimento" DROP CONSTRAINT "procedimento_cadastrarClienteId_fkey";

-- AlterTable
ALTER TABLE "cadastrarCliente" ADD COLUMN     "procedimentoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "procedimento" DROP COLUMN "cadastrarClienteId";

-- AddForeignKey
ALTER TABLE "cadastrarCliente" ADD CONSTRAINT "cadastrarCliente_procedimentoId_fkey" FOREIGN KEY ("procedimentoId") REFERENCES "procedimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
