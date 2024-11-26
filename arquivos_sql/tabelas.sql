CREATE DATABASE nexusEnergy;
USE nexusEnergy;


CREATE TABLE Matriz (
	idMatriz INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    CNPJ CHAR(18),
    ativoTotal INT
);


CREATE TABLE Filial (
	idFilial INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200),
    cidade VARCHAR(45),
    UF CHAR(2),
    submercado VARCHAR(45),
    fkPorte INT,
    FOREIGN KEY (fkPorte)
		REFERENCES Parametros(idParametro),
    fkMatriz INT,
    FOREIGN KEY (fkMatriz)
		REFERENCES Matriz(idMatriz)
);

CREATE TABLE Cargo (
	idCargo INT PRIMARY KEY,
    titulo VARCHAR(45),
    descricao VARCHAR(200)
);

INSERT INTO Cargo VALUES
	(0,'Root', 'Usuário raiz da aplicação, de uso com responsabilidade da nexus'),
    (1,'Admin', 'Usuário entregue para os reponsáveis de gerenciamento do sistema e sua equipe'),
    (2,'Funcionário', 'Usuário responsável pela análise das dashboards');

CREATE TABLE Usuario (
	CPF CHAR(14) PRIMARY KEY,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(120),
    numTelefone VARCHAR(11),
    fkFilial INT,
    fkCargo INT,
    FOREIGN KEY (fkFilial)
		REFERENCES Filial(idFilial),
	FOREIGN KEY (fkCargo)
        REFERENCES Cargo(idCargo)
);


INSERT INTO Usuario VALUES
	('13187293867','Diogo Polastrine','diogo.silva@nexuseng.com','3716d5937ebfe1c6f527c6ba560519820bb7d89f76fd3f5d1dc1609517e83ac3',null, null, 0),
    ('81238123813','Carolina Timóteo','carol.camargo@nexuseng.com','3716d5937ebfe1c6f527c6ba560519820bb7d89f76fd3f5d1dc1609517e83ac3',null, null, 0),
    ('10192929292','Ryan Torres','ryan.torres@nexuseng.com','3716d5937ebfe1c6f527c6ba560519820bb7d89f76fd3f5d1dc1609517e83ac3',null, null, 0),
    ('21293939393','Alexandre Frizzon','ale.frizon@nexuseng.com','3716d5937ebfe1c6f527c6ba560519820bb7d89f76fd3f5d1dc1609517e83ac3',null, null, 0),
    ('50994914990','Pedro Paulo','pedro.paulo@nexuseng.com','3716d5937ebfe1c6f527c6ba560519820bb7d89f76fd3f5d1dc1609517e83ac3',null, null, 0),
    ('43122344517','Alisson Ferro','alisson.ferro@nexuseng.com','3716d5937ebfe1c6f527c6ba560519820bb7d89f76fd3f5d1dc1609517e83ac3',null, null, 0);
    
CREATE TABLE ConsumoDados (
	idDados INT PRIMARY KEY AUTO_INCREMENT,
    dataReferencia DATE,
    consumoEnergia DECIMAL(8,2),
    emissaoCO2 DECIMAL(8,2),
    qtdArvores INT,
    fkFilial INT,
    FOREIGN KEY (fkFilial)
		REFERENCES Filial(idFilial)
);

CREATE TABLE DadosManipulados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dataReferencia DATE,
    consumoPrevisto DOUBLE,
    consumoHorario JSON
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
    dataResposta DATETIME
);

CREATE TABLE Parametros (
	idParametro INT PRIMARY KEY AUTO_INCREMENT,
    porte CHAR(5),
    ativoMin DECIMAL(12,2),
    ativoMax DECIMAL(12,2)
);

INSERT INTO Parametros VALUES
	(default,"Baixo",0,2000000.00),
    (default,"Médio",2000000.01,30000000.00),
    (default,"Alto",30000000.01,NULL);
    




SHOW TABLES;

SELECT * FROM ConsumoDados;
SELECT * FROM Filial;	
SELECT * FROM Matriz;
SELECT * FROM Usuario;
SELECT * FROM Cargo;
SELECT * FROM Insights;
SELECT * FROM HistoricoIA;