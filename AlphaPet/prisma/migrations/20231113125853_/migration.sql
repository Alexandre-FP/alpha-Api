/*
  Warnings:

  - You are about to drop the `cadastrarCliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `procedimento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cadastrarCliente" DROP CONSTRAINT "cadastrarCliente_procedimentoId_fkey";

-- DropForeignKey
ALTER TABLE "cadastrarCliente" DROP CONSTRAINT "cadastrarCliente_usuarioId_fkey";

-- DropTable
DROP TABLE "cadastrarCliente";

-- DropTable
DROP TABLE "procedimento";

-- DropTable
DROP TABLE "usuario";

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "situacao" "SituacaoEnum" NOT NULL DEFAULT 'ATIVO',

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agendarClientes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "nomeCachorro" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "horarioMarcado" TEXT NOT NULL DEFAULT '',
    "valor" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "situacao" "SituacaoEnum" NOT NULL DEFAULT 'ATIVO',
    "usuarioId" INTEGER NOT NULL,
    "procedimentoId" INTEGER NOT NULL,

    CONSTRAINT "agendarClientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedimentos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "situacao" "SituacaoEnum" NOT NULL DEFAULT 'ATIVO',

    CONSTRAINT "procedimentos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "agendarClientes" ADD CONSTRAINT "agendarClientes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendarClientes" ADD CONSTRAINT "agendarClientes_procedimentoId_fkey" FOREIGN KEY ("procedimentoId") REFERENCES "procedimentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
