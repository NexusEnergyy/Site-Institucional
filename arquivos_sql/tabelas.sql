CREATE DATABASE nexusEnergy;

USE nexusEnergy;

CREATE TABLE Matriz (
    idMatriz INT PRIMARY KEY AUTO_INCREMENT,
    CNPJ CHAR(18),
    nome VARCHAR(45),
    ativoTotal INT
);

CREATE TABLE Filial (
    idFilial INT PRIMARY KEY AUTO_INCREMENT,
    nome varchar(255),
    cidade VARCHAR(45),
    uf CHAR(2),
    submercado VARCHAR(45),
    fkMatriz INT,
    FOREIGN KEY (fkMatriz)
    REFERENCES Matriz(idMatriz)
);

CREATE TABLE Cargo (
    idCargo INT PRIMARY KEY,
    titulo VARCHAR(45),
    descricao VARCHAR(45)
);

CREATE TABLE Usuario (
    CPF CHAR(14) PRIMARY KEY,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(18),
    fkFilial INT,
    fkCargo INT,
    FOREIGN KEY (fkFilial)
		REFERENCES Filial(idFilial),
	FOREIGN KEY (fkCargo)
        REFERENCES Cargo(idCargo)
);

CREATE TABLE ConsumoDados (
    idDados INT PRIMARY KEY AUTO_INCREMENT,
    dataReferencia CHAR(6),
    consumoEnergia DECIMAL(8,2),
    emissaoCO2 DECIMAL(8,2),
    qtdArvores INT,
    fkFilial INT,
    FOREIGN KEY (fkFilial)
		REFERENCES Filial(idFilial)
);

CREATE TABLE Insights (
	idInsight INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(45),
    descricao VARCHAR(1000),
    dataEnvio DATETIME,
    fkFilial INT,
    FOREIGN KEY (fkFilial)
		REFERENCES Filial(idFilial)
);

CREATE TABLE HistoricoIA (
    idHistorico INT PRIMARY KEY AUTO_INCREMENT,
    pergunta VARCHAR(1000),
    resposta VARCHAR(1000),
    dataResposta DATETIME,
    fkFilial INT,
    FOREIGN KEY (fkFilial)
		REFERENCES Filial(idFilial)
);
