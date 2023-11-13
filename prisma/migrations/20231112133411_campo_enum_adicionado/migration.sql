-- CreateEnum
CREATE TYPE "SituacaoEnum" AS ENUM ('ATIVO', 'INATIVO', 'EXCLUIDO');

-- AlterTable
ALTER TABLE "cadastrarCliente" ADD COLUMN     "situacao" "SituacaoEnum" NOT NULL DEFAULT 'ATIVO';

-- AlterTable
ALTER TABLE "procedimento" ADD COLUMN     "situacao" "SituacaoEnum" NOT NULL DEFAULT 'ATIVO';

-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "situacao" "SituacaoEnum" NOT NULL DEFAULT 'ATIVO';
