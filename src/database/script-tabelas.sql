CREATE DATABASE nexusEnergy;

USE nexusEnergy;

CREATE TABLE Matriz (
        idMatriz INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(200),
        cnpj VARCHAR(25),
        ativoTotal DECIMAL(12,2)
);

CREATE TABLE Filial (
        idFilial INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(200),
        cidade VARCHAR(50),
        uf CHAR(2),
        submercado VARCHAR(25),
        fkMatriz INT,
        FOREIGN KEY (fkMatriz) REFERENCES Matriz(idMatriz)
);

CREATE TABLE ConsumoDados (
        idConsumo INT PRIMARY KEY AUTO_INCREMENT,
        dataReferencia CHAR(6),
        consumoEnergia DECIMAL(8,2),
        emissaoCO2 DECIMAL(8,2),
        qtdArvores INT,
        fkFilial INT,
        FOREIGN KEY (fkFilial) REFERENCES Filial(idFilial)
);

CREATE TABLE Usuario(
        idUsuario INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(45),
        email VARCHAR(45),
        senha VARCHAR(16),
        cargo VARCHAR(25),
        fkFilial INT,
        FOREIGN KEY (fkFilial) REFERENCES Filial(idFilial) 
);

CREATE TABLE Insights(
        idInsights INT PRIMARY KEY AUTO_INCREMENT,
		titulo VARCHAR(45),
        descricao VARCHAR(1000),
        dataEnvio DATETIME,
        fkFilial INT,
        FOREIGN KEY (fkFilial) REFERENCES Filial(idFilial) 
);

CREATE TABLE historicoIA(
        idHistoricoIA INT PRIMARY KEY AUTO_INCREMENT,
		pergunta VARCHAR(200),
        resposta VARCHAR(1000),
        dataResposta DATETIME
);