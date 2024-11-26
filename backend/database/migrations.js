import Connect from "./Database.js";

async function executeQuery(sql) {
    const conn = await Connect();
    await conn.query(sql);
}

async function createMedico() {
    const sql = `CREATE TABLE IF NOT EXISTS medico (
        id INT NOT NULL AUTO_INCREMENT,
        nome VARCHAR(45) NOT NULL,
        cpf VARCHAR(45) NULL,
        crm VARCHAR(20) NOT NULL,
        rqe VARCHAR(20) NULL,
        email VARCHAR(75) NOT NULL,
        senha VARCHAR(255) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE INDEX crm_UNIQUE (crm ASC),
        UNIQUE INDEX email_UNIQUE (email ASC)
    ) ENGINE = InnoDB;`;
    await executeQuery(sql);
}

async function createFuncionario() {
    const sql = `CREATE TABLE IF NOT EXISTS funcionario (
        id INT NOT NULL AUTO_INCREMENT,
        nome VARCHAR(70) NOT NULL,
        funcao INT NOT NULL COMMENT '"recepcionista", "administrador", "diretor"',
        email VARCHAR(75) NOT NULL,
        senha VARCHAR(255) NOT NULL,
        avatar VARCHAR(100) NULL,
        PRIMARY KEY (id)
    ) ENGINE = InnoDB;`;
    await executeQuery(sql);
}

async function createSala() {
    const sql = `CREATE TABLE IF NOT EXISTS sala (
        id INT NOT NULL AUTO_INCREMENT,
        nome VARCHAR(70) NULL,
        PRIMARY KEY (id)
    ) ENGINE = InnoDB;`;
    await executeQuery(sql);
}

async function createDiasSemana() {
    const sql = `CREATE TABLE IF NOT EXISTS dias_semana (
        id INT NOT NULL AUTO_INCREMENT,
        segunda JSON NULL,
        terca JSON NULL,
        quarta JSON NULL,
        quinta JSON NULL,
        sexta JSON NULL,
        PRIMARY KEY (id)
    ) ENGINE = InnoDB;`;
    await executeQuery(sql);
}

async function createTipoConsulta() {
    const sql = `CREATE TABLE IF NOT EXISTS tipo_consulta (
        id INT NOT NULL AUTO_INCREMENT,
        sala_id INT NOT NULL,
        dias_semana_id INT NOT NULL,
        descricao VARCHAR(70) NOT NULL,
        duracao FLOAT NOT NULL,
        PRIMARY KEY (id, sala_id, dias_semana_id),
        INDEX fk_tipo_consulta_dias_semana_idx (dias_semana_id ASC),
        INDEX fk_tipo_consulta_sala1_idx (sala_id ASC),
        CONSTRAINT fk_tipo_consulta_dias_semana FOREIGN KEY (dias_semana_id) REFERENCES dias_semana (id),
        CONSTRAINT fk_tipo_consulta_sala1 FOREIGN KEY (sala_id) REFERENCES sala (id)
    ) ENGINE = InnoDB;`;
    await executeQuery(sql);
}

async function createMedicoHasTipoConsulta() {
    const sql = `CREATE TABLE IF NOT EXISTS medico_has_tipo_consulta (
        medico_id INT NOT NULL,
        tipo_consulta_id INT NOT NULL,
        PRIMARY KEY (medico_id, tipo_consulta_id),
        INDEX fk_medico_has_tipo_consulta_tipo_consulta1_idx (tipo_consulta_id ASC),
        INDEX fk_medico_has_tipo_consulta_medico1_idx (medico_id ASC),
        CONSTRAINT fk_medico_has_tipo_consulta_medico1 FOREIGN KEY (medico_id) REFERENCES medico (id),
        CONSTRAINT fk_medico_has_tipo_consulta_tipo_consulta1 FOREIGN KEY (tipo_consulta_id) REFERENCES tipo_consulta (id)
    ) ENGINE = InnoDB;`;
    await executeQuery(sql);
}

async function createPaciente() {
    const sql = `CREATE TABLE IF NOT EXISTS paciente (
        id INT NOT NULL AUTO_INCREMENT,
        nome VARCHAR(45) NOT NULL,
        email VARCHAR(75) NOT NULL,
        cpf VARCHAR(45) NOT NULL,
        n_plano_saude VARCHAR(45) NULL,
        sexo VARCHAR(45) NOT NULL,
        data_nascimento DATE NOT NULL,
        endereco VARCHAR(45) NULL,
        telefone VARCHAR(45) NULL,
        PRIMARY KEY (id),
        UNIQUE INDEX cpf_UNIQUE (cpf ASC),
        UNIQUE INDEX email_UNIQUE (email ASC)
    ) ENGINE = InnoDB;`;
    await executeQuery(sql);
}

async function createAgendamento() {
    const sql = `CREATE TABLE IF NOT EXISTS agendamento (
        id INT NOT NULL AUTO_INCREMENT,
        paciente_id INT NOT NULL,
        tipo_consulta_id INT NOT NULL,
        status INT NOT NULL COMMENT '0: cancelada, 1: ativa',
        retorno INT NOT NULL COMMENT '0: não, 1: sim',
        motivo_consulta VARCHAR(255) NOT NULL,
        data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        data_agendamento TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        funcionario_id INT NULL,
        medico_id INT NULL,
        PRIMARY KEY (id, paciente_id, tipo_consulta_id),
        INDEX fk_consulta_paciente1_idx (paciente_id ASC),
        INDEX fk_consulta_tipo_consulta1_idx (tipo_consulta_id ASC),
        INDEX funcionario_idx (funcionario_id ASC),
        INDEX medico_idx (medico_id ASC),
        CONSTRAINT fk_consulta_paciente1 FOREIGN KEY (paciente_id) REFERENCES paciente (id),
        CONSTRAINT fk_consulta_tipo_consulta1 FOREIGN KEY (tipo_consulta_id) REFERENCES tipo_consulta (id),
        CONSTRAINT funcionario FOREIGN KEY (funcionario_id) REFERENCES funcionario (id),
        CONSTRAINT medico FOREIGN KEY (medico_id) REFERENCES medico (id)
    ) ENGINE = InnoDB;`;
    await executeQuery(sql);
}

async function createCancelamento() {
    const sql = `CREATE TABLE IF NOT EXISTS cancelamento (
        id INT NOT NULL AUTO_INCREMENT,
        agendamento_id INT NOT NULL,
        funcionario_id INT NOT NULL,
        data TIMESTAMP NOT NULL,
        motivo VARCHAR(45) NULL,
        PRIMARY KEY (id, agendamento_id, funcionario_id),
        INDEX fk_cancelamento_consulta1_idx (agendamento_id ASC),
        INDEX fk_cancelamento_funcionario1_idx (funcionario_id ASC),
        CONSTRAINT fk_cancelamento_consulta1 FOREIGN KEY (agendamento_id) REFERENCES agendamento (id),
        CONSTRAINT fk_cancelamento_funcionario1 FOREIGN KEY (funcionario_id) REFERENCES funcionario (id)
    ) ENGINE = InnoDB;`;
    await executeQuery(sql);
}

async function run() {
    await createPaciente();
    await createMedico();
    await createFuncionario();
    await createSala();
    await createDiasSemana();
    await createTipoConsulta();
    await createMedicoHasTipoConsulta();
    await createAgendamento();
    await createCancelamento();
}

run().catch(err => console.error(err));
