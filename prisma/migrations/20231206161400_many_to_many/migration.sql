-- DropForeignKey
ALTER TABLE "agendarClientes" DROP CONSTRAINT "agendarClientes_procedimentoId_fkey";

-- CreateTable
CREATE TABLE "_agendarClientesToprocedimentos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_agendarClientesToprocedimentos_AB_unique" ON "_agendarClientesToprocedimentos"("A", "B");

-- CreateIndex
CREATE INDEX "_agendarClientesToprocedimentos_B_index" ON "_agendarClientesToprocedimentos"("B");

-- AddForeignKey
ALTER TABLE "_agendarClientesToprocedimentos" ADD CONSTRAINT "_agendarClientesToprocedimentos_A_fkey" FOREIGN KEY ("A") REFERENCES "agendarClientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_agendarClientesToprocedimentos" ADD CONSTRAINT "_agendarClientesToprocedimentos_B_fkey" FOREIGN KEY ("B") REFERENCES "procedimentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
